# QA M5-5 · 2026-10-07

## Task 1 · Scope

4 lesson/12h khớp roadmap: scaling, LB/CDN, replica, caching layers, bottleneck. Không đổi thành full M7-2 interview hoặc AWS deployment. Lesson, đề, giải và rubric đủ từng bài. Tất cả workload/sizing bảng A/B ghi giả lập; source observation không giả làm measurement. Template Proposed không thay bài nộp.

## Task 2 · Lesson 01 và đề 01

Rà workload/user/RPS, mean-in-flight và bandwidth; không lẫn p95/thread/connection. Scaling có headroom/failure/shared dependency caveat. LB chọn một target và không autoscale/sửa SQL; ALB all-unhealthy fail-open theo docs. State Map/local upload/JWT/sticky session được phân biệt. C1–8 lần lượt kiểm workload, units, scale, flow, state, pool, sizing, health policy, không hỏi ngoài bài.

## Task 3 · Lesson 02 và đề 02

Rà cache hit/miss/revalidation/304 từng arrow; DB page cache không thành result cache. HTTP directives không nhầm no-cache/no-store/private; privacy/key trước TTL; đa tầng/source stale không bị hứa bound giả; hit ratio chỉ trên traffic ảnh. C1–8 phủ flow/layers/privacy/headers/TTL/versioned URL/ratio/fallback. Không bắt cache implementation mới.

## Task 4 · Lesson 03 và đề 03

Rà commit/replay timeline, async giả định, read-after-write/cache bypass, invariant/constraint primary và readOnly annotation không auto-route. Replica≠backup≠HA≠write scale, Multi-AZ topology nêu cụ thể. C1–8 phủ timeline/routing/annotation/writes/backup/standby/cost/promotion. Không yêu cầu tuning standby hay DR thực.

## Task 5 · Lesson 04 và đề 04

Rà topology Proposed, optional paths và arrows; case A/B là evidence giả lập để đặt hypothesis chứ không kết luận source. Baseline/control/correctness/rollback có đủ; retries/idempotency/provider quota không bị hiểu thành scale miễn phí. C1–8 phủ diagram, hai bottlenecks, phép so, fact/assumption, failures, retry, AI transfer. Chấp nhận nhiều quyết định có điều kiện.

## Task 6 · Tự động, giới hạn và bảo toàn

Checker chung hai module xác minh 9 lesson, 72 câu, 72 rubric và link/fence/resources; sáu fault probes kiểm khả năng bắt sai rubric, link, fence, số câu, tài liệu/video và thiếu ý hỏi. Khi rà đề đã sửa các ý hỏi dẫn sẵn kết luận thành câu hỏi trung lập; rubric vẫn nêu rõ chuẩn đáp án từng điểm, không chuyển lời giải vào đề.

System Design là tài liệu tư duy: không có runtime deployment hoặc benchmark để claim. Mermaid được rà luồng và cú pháp văn bản; chưa kiểm render trực tiếp trong Obsidian. Script cấu trúc không chứng minh topology tối ưu/security production.

Kết quả cuối checker cả nguồn và Vault: **39 Markdown files, 9 lessons, 72 câu, 72 rubric, 74 local links, 0 lỗi**, sáu checker fault probes đạt. Snapshot xác nhận **28 files được bảo vệ không đổi** (roadmap/AGENTS/source/POM), tiến độ chỉ khác đúng hai nhãn tài liệu M5-5/M6A-1; trạng thái/điểm/ngày/log giữ nguyên.

Đồng bộ chọn lọc **42 files** của hai bộ bài/đề/QA/index/progress sang Vault Documents, kiểm SHA-256 giống nguồn. Bản cũ khác được giữ trong `Software_Engineer/.sync-backups/m55-m6a1-1791392218076` dưới Vault. Không đụng AWS/AI notes, không thay cơ chế auto-sync/LaunchAgent hoặc giả định agent đã hoạt động.
