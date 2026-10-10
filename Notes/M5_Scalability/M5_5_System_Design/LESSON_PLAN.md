# Kế hoạch phủ kiến thức · M5-5

Roadmap 12h / 4 buổi. Mỗi lesson 3h gồm đọc, vẽ/tính, đề và ôn; không kéo thành interview M7-2.

| Roadmap | Lesson | Câu |
|---|---|---|
| Vertical/horizontal | L1 mục 1–3, 5–6 | L1 C1–3/C5–7 |
| Load balancer | L1 mục 4–5 | L1 C4/C5/C8 |
| CDN | L2 mục 1, 3–6 | L2 C1/C3–7 |
| Cache client/CDN/app/DB | L2 mục 2–7 | L2 C2–8 |
| Read replica | L3 mục 1–6 | L3 C1–8 |
| Bottleneck shopcore | L4 mục 1–7 | L4 C1–8 |

## Review từng lesson

- L1: nêu workload trước sizing; mean/in-flight không bằng p95/thread/connections; LB chọn một target; Map local không shared; pool budget nhân số instance; ALB fail-open caveat.
- L2: mọi arrow hit/miss/304 được giải thích; scope cache rõ; HTTP directives không bị hiểu ngược; privacy/cache key trước TTL; nguồn fill/đa tầng có thể stale; hit ratio chỉ cho traffic đã nêu.
- L3: async là giả định mô hình, không universal; read-after-write/primary/constraint; @Transactional readOnly không auto route; replica≠backup≠HA≠write scaling; nói rõ Multi-AZ DB instance topology.
- L4: topology Proposed/optional, không giả current; bảng số liệu ghi giả lập; measurement→hypothesis→change→validation; failure/security/cost và rollback; AI quota không do JVM replicas tự tăng.

Mỗi câu chỉ đánh giá nội dung lesson tương ứng. Correctness/freshness/failure là điều kiện của các lựa chọn roadmap, không bài triển khai distributed systems mới. Không có benchmark/capacity thực được tự bịa vào deliverable.
