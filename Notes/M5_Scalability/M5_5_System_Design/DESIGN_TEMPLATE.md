# Shopcore scale design · Template để người học điền

- Status: Proposed
- Ngày / người viết:
- Không tự xem template này là deliverable đã nộp/merge.

## Facts

Source/config nào đã xem? Đã chạy workload nào, ở môi trường nào? Nếu chưa đo, ghi chưa đo.

## Requirements And Assumptions

Routes, peak RPS, payload, read/write ratio, freshness, latency/errors mục tiêu, availability và ngân sách. Tách yêu cầu thật khỏi số giả định.

## Current And Proposed Flow

Vẽ current/proposed. Chú giải client/LB/CDN/app/cache/primary/replica, từng mũi tên, state location và read/write routing. Thành phần chưa tồn tại phải đánh dấu proposed/optional.

## Bottleneck Evidence

| Giả thuyết | Evidence nguồn/thời gian | Chưa biết | Phép kiểm tiếp theo |
|---|---|---|---|
| Điền một bottleneck, không tự coi là fact | | | |

## Options And Decision

Ít nhất giữ nguyên/tối ưu hiện tại và một lựa chọn mở rộng có lý do. Nêu latency/throughput/correctness/security/cost; không thêm replica chỉ vì sơ đồ cần có.

## Failure And Freshness

A chết, cache miss/lỗi, replica lag, primary lỗi; user vừa ghi đọc lại ở đâu; private responses được bảo vệ thế nào; tổng DB connection budget.

## Validation And Rollback

Baseline/workload, metric/unit/time window, warm/cold, expected improvement, correctness tests, rollback/revisit triggers. Nếu chưa chạy, ghi kế hoạch, không ghi PASS.
