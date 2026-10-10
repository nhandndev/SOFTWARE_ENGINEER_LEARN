# ADR-XXXX · [Một quyết định cụ thể]

> Template chưa điền, không phải quyết định Accepted. Khi thực sự nộp, đặt trong shopcore/docs theo quy trình của bạn, không tạo project mới.

- Ngày: [YYYY-MM-DD]
- Status: Proposed
- Owner/reviewer: [Ai chịu trách nhiệm/ai review]
- Thay thế/liên quan: [ADR nào, nếu có]

## Context

[Vấn đề cụ thể và constraint. Tách fact có bằng chứng khỏi assumption chưa đo. Nêu scope, workload/team và phần chưa biết.]

## Options

| Phương án | Lợi ích trong context | Chi phí/rủi ro | Bằng chứng cần thêm |
|---|---|---|---|
| Giữ monolith hiện tại | [Điền] | [Điền] | [Điền] |
| Hướng modular monolith | [Điền] | [Điền] | [Điền] |
| Tách một capability | [Điền] | [Điền] | [Điền] |

## Decision

[Chọn gì ngay bây giờ và vì sao theo tiêu chí. Boundary/ownership nào cần giữ. Những gì cố ý không làm.]

## Consequences

[Ít nhất một lợi ích và một mặt trái. Rủi ro/coupling còn lại, mitigation tương xứng. Không nói “không có nhược điểm”.]

## Revisit Triggers

[Tín hiệu đo được, nơi lấy số liệu, ai review. Đừng ghi số bịa như đã đo; ngưỡng đề xuất là trigger điều tra, không tự tách service.]

## Validation And Limits

[Cách kiểm decision đáp ứng mục tiêu; điều kiện thành công, migration/rollback khi liên quan. Ghi rõ phần chưa implement/chưa benchmark/chưa phê duyệt.]
