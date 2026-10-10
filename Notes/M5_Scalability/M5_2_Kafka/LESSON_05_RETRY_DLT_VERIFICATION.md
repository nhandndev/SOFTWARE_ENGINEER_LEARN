# Lesson 05 · Lỗi thì retry ở đâu, DLQ có phải thành công không?

> Mục tiêu: có một policy lỗi đọc được bằng timeline, biết kiểm poison message và không nhầm record được chuyển DLT với notification đã hoàn thành.

## Tài liệu / video

- [Spring Kafka handling exceptions](https://docs.spring.io/spring-kafka/reference/kafka/annotation-error-handling.html): DefaultErrorHandler, recovery và DLT.
- [ErrorHandlingDeserializer](https://docs.spring.io/spring-kafka/api/org/springframework/kafka/support/serializer/ErrorHandlingDeserializer.html): wrapper decode error.
- [DelegatingByTypeSerializer](https://docs.spring.io/spring-kafka/api/org/springframework/kafka/support/serializer/DelegatingByTypeSerializer.html): object và raw bytes dùng serializer khác nhau.
- [Non-blocking retries](https://docs.spring.io/spring-kafka/reference/retrytopic.html): chỉ đọc trade-off ordering, không triển khai ở module này.
- [Kafka monitoring](https://kafka.apache.org/41/operations/monitoring/): nhận diện lag và failures.
- Video: tìm `Spring Kafka DefaultErrorHandler DeadLetterPublishingRecoverer`, `Kafka poison pill deserialization DLQ retry`.

## 1. Ba lớp lỗi, ba cách nghĩ

| Lỗi | Xảy ra trước/sau listener? | Policy mẫu |
|---|---|---|
| JSON hỏng, sai kiểu không deserialize được | Trước business listener | Wrapper đưa lỗi vào error handler; thường không retry lỗi không thể tự sửa |
| JSON map được nhưng event thiếu ID/sai version | Trong Service validate | InvalidEventException: không retry, recover sang DLT |
| DB tạm mất kết nối | Trong Service transaction | Retry hữu hạn có backoff; quá hạn thì DLT để điều tra |

Không phải mọi AppException đều retry: “unknown version” không tự hết sau 1 giây. Ngược lại, database unavailable không nên thành công với empty result. Lỗi producer send nằm phía producer, không được consumer error handler chữa giúp.

`@RestControllerAdvice` chỉ có thể map lỗi phát sinh trong HTTP request tương ứng. Kafka listener có error handler riêng. Nếu listener gọi Service dùng AppException hiện có, cần classification theo ý nghĩa lỗi tại Kafka boundary, không trả ResponseEntity trong listener.

## 2. Retry hữu hạn, số lần rõ ràng

Mẫu record listener dùng `FixedBackOff(1000L, 2L)`:

```text
lần xử lý đầu thất bại
-> đợi khoảng 1 giây, retry 1
-> lại lỗi, đợi khoảng 1 giây, retry 2
-> vẫn lỗi, recover sang DLT
```

Tổng tối đa **3 lần gọi business listener** cho lỗi retryable trong chu kỳ này, không phải 2. Fatal decode/InvalidEventException bỏ qua retries theo classification. Thời gian thực còn gồm poll/scheduling/business; không hứa DLT xuất hiện đúng 2.000 ms.

Blocking retry có thể giữ partition/consumer bận, làm record sau chờ. Đây là trade-off có chủ đích ở bài nhỏ. Retry topics không blocking có thể làm event sau vượt event trước; không đổi cơ chế retry mà quên ordering.

## 3. DLT / DLQ là nơi giữ record lỗi

DLQ là tên khái niệm; trong Kafka thường dùng một dead-letter topic (DLT). Mẫu đặt **explicit** `order-placed-json-v1-dlt`, không phụ thuộc suffix mặc định thay đổi giữa version/tutorial.

DLT lưu payload gốc và metadata lỗi như topic/partition/offset, exception, group. Nó không có nghĩa notification đã gửi và không phải thùng rác bỏ đó. Cần người/job có trách nhiệm: điều tra, sửa dữ liệu/code, replay có audit và giữ eventId khi replay cùng sự việc.

DLT có thể có dữ liệu nhạy cảm hoặc stack trace; áp ACL, retention, kiểm soát log/replay. Không public broker plaintext lab ra Internet. Khi reset/replay, phải xem group/effect identity và dedup, không tạo ID mới chỉ để vượt bảng processed_events.

## 4. Cấu hình đủ cho business failure lẫn JSON hỏng

Giữ YAML consumer + listener Lesson 02. Tạo source topic và DLT, mỗi topic 3 partition, replication 1 cho một broker lab. Resolver chọn cùng partition nên DLT phải có đủ partition tương ứng. Production cần replication/min ISR/ACL riêng, không copy replication 1 thành cấu hình HA.

Class này **thay producer factory/template mặc định bằng một cặp explicit**, không thêm nhiều template mơ hồ. Factory dùng serializer theo runtime type: event → JSON, raw `byte[]` → bytes nguyên trạng. Giữ `KafkaTemplate<String,Object>` mà publisher Lesson 02 đã inject.

<!-- verify: com/shopcore/events/KafkaFailureConfiguration.java -->
```java
package com.shopcore.events;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.ByteArraySerializer;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.kafka.support.serializer.DelegatingByTypeSerializer;
import org.springframework.kafka.support.serializer.JacksonJsonSerializer;
import org.springframework.util.backoff.FixedBackOff;

@Configuration(proxyBeanMethods = false)
public class KafkaFailureConfiguration {
    @Bean
    public DefaultKafkaProducerFactory<String, Object> producerFactory(
            @Value("${spring.kafka.bootstrap-servers}") String bootstrap) {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrap);
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        Map<Class<?>, Serializer<?>> serializers = new LinkedHashMap<>();
        serializers.put(byte[].class, new ByteArraySerializer());
        serializers.put(OrderPlacedEvent.class,
                new JacksonJsonSerializer<OrderPlacedEvent>().noTypeInfo());
        return new DefaultKafkaProducerFactory<>(props, new StringSerializer(),
                new DelegatingByTypeSerializer(serializers));
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate(
            DefaultKafkaProducerFactory<String, Object> producerFactory) {
        return new KafkaTemplate<>(producerFactory);
    }

    @Bean
    public DefaultErrorHandler kafkaErrorHandler(KafkaTemplate<String, Object> template) {
        var recoverer = new DeadLetterPublishingRecoverer(template,
                (record, ex) -> new TopicPartition(
                        OrderEventPublisher.TOPIC + "-dlt", record.partition()));
        recoverer.setFailIfSendResultIsError(true);
        var handler = new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 2L));
        handler.addNotRetryableExceptions(InvalidEventException.class);
        return handler;
    }
}
```

Đọc code theo trách nhiệm:

1. Factory trên chỉ đủ plaintext lab; vì tự build props nên **không tự mang toàn bộ YAML producer/SSL/SASL khác vào**. Khi tích hợp production phải merge KafkaProperties và kiểm secrets/TLS/ACL/timeouts, không dùng mẫu tối thiểu này như config production.
2. Template được quản lý cùng factory bean, Spring đóng producer khi context đóng. Một template rõ generic thay cho hai bean cạnh tranh injection.
3. Recoverer chọn DLT explicit và cùng partition. `setFailIfSendResultIsError(true)` yêu cầu lỗi publish recovery được báo ra, không im lặng coi là đã recover.
4. Handler retry đúng lỗi retryable rồi recover; InvalidEventException bỏ retry. Decode exception vốn thuộc nhóm fatal mặc định của handler.
5. Boot gắn bean CommonErrorHandler vào factory listener mặc định. Nếu tự tạo listener factory khác, phải gắn handler cho factory đó; khai bean rồi không dùng factory tương ứng thì policy không chạy.

Vì JSON hỏng có thể chưa tạo event object, recoverer nhận lại raw bytes. Dùng riêng JSON serializer cho `byte[]` sẽ có thể biến bytes thành JSON/base64 thay vì giữ payload gốc; mẫu trên xử lý riêng. Key vẫn là string theo contract; lỗi key binary/custom serializer ngoài scope mẫu.

## 5. Checkpoint sau recovery không phải business success

Với record mode và handler recovery thành công, container có thể checkpoint vượt record đã được recover để tiếp tục. Record lỗi vẫn chưa tạo notification. Business outcome lúc này là **quarantined**, cần theo dõi ngoài lag của source.

Nếu DLT send lỗi, recovery phải fail để không coi đã cất record an toàn. Vẫn có window DLT send xong nhưng offset source chưa commit: restart có thể tạo DLT duplicate. DLT publish + source commit không atomic trong mẫu non-transactional; replay/DLT processor phải chịu trùng.

Không dùng infinite retry tùy tiện: poison message có thể chặn luồng mãi. Không “fix” bằng catch mọi exception rồi return; cách đó chỉ giấu lỗi và vượt checkpoint.

## 6. Bộ kiểm chứng theo feature nhỏ

| Kịch bản | Cần nhìn gì? |
|---|---|
| Publish hợp lệ | Future success, key/orderId, partition/offset, JSON fields đúng |
| Consumer tắt rồi bật | Record còn retention được xử lý bởi group, không yêu cầu producer đợi |
| Gửi cùng eventId hai lần | Một notification và một processed marker trong DB |
| Hai worker cùng event | Unique constraint và transaction giữ một effect |
| Notification insert lỗi | Không để processed marker thành công một mình; retry còn làm được |
| JSON hỏng | DLT có raw bytes/metadata, business không được gọi |
| Contract sai version | Không retry vô ích, DLT; notification không có |
| DB lỗi retryable kéo dài | Số attempt hữu hạn rồi DLT; không trả thành công giả |
| Recovery send lỗi | Không checkpoint như đã recover an toàn |
| Restart sau DB commit trước offset commit | Redelivery không tạo thêm effect |

Test trực tiếp method chỉ chứng minh method. Test broker + container mới chứng minh adapter/retry/checkpoint. Test DB thật mới chứng minh SQL/transaction/race, không dùng Map rồi suy unique SQL đúng. Không bắt bạn tự dựng cả bộ để thi lý thuyết; nhưng mọi lời tuyên bố “đã chạy đúng” phải có bằng chứng đúng tầng.

## 7. Quan sát vận hành và liên hệ AI

Ghi eventId/orderId/topic/partition/offset/correlationId, số retries, DLT rate và độ tuổi record. Hạn chế payload/PII trong log; metrics không dùng eventId làm label vì cardinality cao. Lag thấp nhưng DLT tăng vẫn là lỗi business. Một instance “running” không chứng minh đã nhận assignment hoặc xử lý đúng.

Với AI worker: job có thể tốn tiền, timeout không chắc provider chưa xử lý. Idempotency job/output và trạng thái retry phải rõ; Kafka không tự giảm duplicate billing ở API ngoài. Không cần Kafka cho mọi pipeline AI; chọn theo replay, throughput, independent consumers và chi phí vận hành.

## 8. Chốt module và giới hạn

Bạn cần giải thích được: **record được lưu ở đâu, group resume ở đâu, effect commit ở đâu, trùng được chặn ở đâu và lỗi được giữ ở đâu**. Không cần thuộc mọi API Kafka hoặc học Streams/EOS production.

Đạt từng đề là đạt kiến thức lesson. Tạo sẵn mẫu/AI QA không tự hoàn thành capstone hoặc deliverable; code thực tế của bạn vẫn có thể hoãn theo cách học hiện tại.

[Làm đề Lesson 05](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson5-lan1.md).
