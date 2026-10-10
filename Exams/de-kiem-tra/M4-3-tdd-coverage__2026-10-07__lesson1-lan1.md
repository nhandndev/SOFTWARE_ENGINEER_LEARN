# M4-3 · Lesson01 TDD · Lần1

PHONG_VAN theo lesson: 8×5=40đ, đạt34/40, khoảng35–45 phút. Chấm lập luận, không thuộc JUnit syntax. Rule: subtotal null/âm bị IllegalArgumentException; 0≤subtotal<500000 phí30000; subtotal≥500000 phí0 VND. Không gọi provider/DB.

## Câu 1 - Có test chưa chắc là TDD

Bạn viết xong toàn feature rồi mới viết test, tất cả xanh. Có đủ bằng chứng gọi là Red → Green → Refactor không? Viết test sau còn có ích gì, và cần quan sát thêm gì để chứng minh vòng test-first?

**Trả lời:**

## Câu 2 - Red nào đúng?

Test500000 assert phí0, stub trả30000 nên assertion fail. Lần khác test không compile vì import sai. Phân biệt hai failure; phải sửa gì ở mỗi trường hợp, có được đổi expected thành30000 cho xanh không?

**Trả lời:**

## Câu 3 - Biên của rule

Cho subtotal499999,500000,500001 và0: fee tương ứng là gì? Nếu code dùng `>500000` thay `>=500000`, case nào trong bốn case phát hiện? Vì sao cần test đúng ngưỡng?

**Trả lời:**

## Câu 4 - Test xanh nhưng phí sai

Test chỉ gọi fee(250000), assertNotNull. Implementation bị đổi thành luôn trả1. Test còn pass không? Sửa oracle/assertion cho input này và thêm một case miễn phí; vì sao không copy công thức production vào expected?

**Trả lời:**

## Câu 5 - BigDecimal và scale

Actual fee=`new BigDecimal("0.00")`, expected=`BigDecimal.ZERO`. Contract chỉ so giá trị tiền, không quy định scale. Vì sao assertEquals có thể fail? Nêu phép so phù hợp và phân biệt lỗi test với lỗi nghiệp vụ.

**Trả lời:**

## Câu 6 - Refactor hay đổi rule?

A tách500000/30000 thành constants, không đổi kết quả. B đổi ngưỡng600000. Cái nào refactor thuần? Mỗi thay đổi cần kiểm/cập nhật gì và vì sao vẫn chạy lại toàn suite?

**Trả lời:**

## Câu 7 - Assert lỗi có đủ chặt?

Contract null/âm phải IllegalArgumentException. Test hiện chỉ catch Exception rồi coi là pass, hoặc dùng assertThrows(Exception.class). Nếu xóa guard null làm NullPointerException, có phát hiện đúng sai contract không? Nêu assertion/action và hai input cần kiểm.

**Trả lời:**

## Câu 8 - Kế hoạch TDD nhỏ

Nêu5–6 bước từ stub đến feature: test/Red đúng lý do, Green nhỏ, thêm case chống hard-code, refactor và regression. Giải thích một test500000 xanh với `return0` chưa đủ và bằng chứng nào cần lưu nếu nói đã thực hành TDD.

**Trả lời:**
