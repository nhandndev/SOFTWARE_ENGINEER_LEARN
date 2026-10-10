# M4-3 · Lesson04 CI & Meaningful Tests · Lần1

PHONG_VAN theo lesson8×5=40đ, đạt34/40, khoảng40–50 phút. Gate: clean verify, JaCoCo LINE bundle≥0.70, fail nếu thiếu exec/XML mới; publish cần verify success và push main. Không cần chạy GitHub thật để trả lời.

## Câu 1 - Test pass nhưng coverage60

RunA assertions pass, data thật LINE60%; RunB assertions fail, coverage80%; RunC tests pass, LINE75%, artifact mới có đủ. Verify và publish eligibility của từng run thế nào nếu đều là push main? Vì sao cần thử caseA để chứng minh coverage gate?

**Trả lời:**

## Câu 2 - Skip hoặc thiếu data

Dev thêm -DskipTests, hoặc mất agent khiến report/check skip không data và Maven exit0. Trên output clean, kiểm file exec/XML không rỗng giúp gì? Có đủ chỉ kiểm file mà bỏ threshold check không? Vì sao không reuse report cũ?

**Trả lời:**

## Câu 3 - Zero tests và IT naming

File ProductRepositoryIT chưa có Failsafe/includes phù hợp; mvn verify không tự chạy nó. Nêu cách phát hiện zero-test và cấu hình/lifecycle cần khi chọn IT suite. Vì sao chỉ gọi integration-test chưa đủ xác nhận Failsafe result?

**Trả lời:**

## Câu 4 - Giữ report sau failure

Verify fail, bạn muốn upload reports để debug. Dùng always với upload có biến verify xanh không? Có nên continue-on-error cho verify hoặc cache target/jacoco.exec không? Nêu paths theo repo chứa shopcore, khác working-directory của run ra sao.

**Trả lời:**

## Câu 5 - Publish chạy độc lập

Job publish không needs verify; PR cũng có thể push image. Badge vẫn xanh ở một commit cũ. Chỉ ra ba vấn đề và cách nối event/needs/đúng SHA để không lấy badge làm gate. Push image đã là deploy AWS chưa?

**Trả lời:**

## Câu 6 - Tests để đẹp coverage

Suite assertNotNull(fee), nhiều getter tests và exclude Service để đạt70. Thay fee30000 thành1 vẫn xanh. Đánh giá, nêu assertion/case hữu ích và một fault-check thủ công nhỏ; có bắt buộc cài PIT ở module này không?

**Trả lời:**

## Câu 7 - Hôm xanh mai đỏ

Test dùng now/random/provider thật và DB dùng chung, rerun tới xanh. Nêu nguyên nhân flaky, cách kiểm soát từng nhóm dependency, vì sao sleep/rerun không đủ. Coverage Java có đo chất lượng output model AI không?

**Trả lời:**

## Câu 8 - Bằng chứng đã làm feature TDD

Bạn chỉ đọc lesson, đề đạt và có HTML70%. Có đủ nói đã hoàn thành deliverable không? Nêu gói bằng chứng contract/test-first/refactor, code/assertions, metric/scope và CI positive/negative cần có; giữ trạng thái thế nào nếu chưa làm thực tế?

**Trả lời:**
