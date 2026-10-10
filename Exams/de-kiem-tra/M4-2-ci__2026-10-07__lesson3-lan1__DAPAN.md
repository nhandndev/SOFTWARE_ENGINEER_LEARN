# Bài giải M4-2 · Lesson 03

40đ; đạt 34/40. Cách thiết kế khác an toàn vẫn được công nhận; không bắt thuộc nguyên workflow.

| Câu | Rubric /5 |
|---|---|
| 1 | Needs là success gate/order (1); if là event/ref gate (1); ba trường hợp đúng (2); không vượt gate bằng always (1) |
| 2 | PR Maven chưa Docker build (1); build push false (1); không login/write (1); Dockerfile thật phải có (1); không phóng đại coverage (1) |
| 3 | Runner riêng checkout lại (1); needs không truyền JAR (1); multi-stage rebuild (1); mutable inputs không byte identity (1); artifact handoff/digest nếu cần (1) |
| 4 | Registry lowercase (1); tag truy commit (1); tag vẫn mutable/digest nội dung (1); publish chưa deploy (1); không tự public (1) |
| 5 | Quyền tối thiểu tách job (1); token do GitHub cấp, không cần PAT/AWS key mẫu (1); kiểm package/repo access/org policy (2); không token trong image/args (1) |
| 6 | name khác id (1); GITHUB_OUTPUT chia sẻ output step (1); Bash lowercase vs GitHub expression (1); defaults run không uses (1); đổi paths rõ (1) |
| 7 | Path context dùng workspace checked out (1); default Git context có thể bỏ sửa file trước build (1); .m2 runner riêng (1); cache mount không mặc định persist qua GHA layers (1); cache không release (1) |
| 8 | Run/event/SHA/tag/digest evidence (1); mutable inputs có thể đổi digest (1); concurrency không FIFO/đủ mọi commit (1); PR cancel policy không main cancel mặc định mẫu (1); push fail chưa publish (1) |

## Câu 1

Needs đợi verify thành công; if chỉ cho event push với ref main. PR pass vẫn không publish; main fail không publish; main pass mới đủ điều kiện chạy publish, còn build/login/push có thể fail sau đó. Always trên publish có thể làm vượt ý định success gate, không dùng để đưa bản fail lên registry.

**Ôn:** lesson 3 mục 1, 4. Đủ điều kiện chạy khác chắc chắn publish thành công.

## Câu 2

Maven PR chưa kiểm Dockerfile. Có thể thêm job phụ thuộc verify để Docker build với push false, permissions read-only, không login/secrets registry. Mẫu chưa có job này nên phải nêu giới hạn. Khi thực hành, phải có Dockerfile thật trong context, không lấy file Markdown làm Dockerfile tự động.

**Ôn:** mục 1–3. Không bắt viết YAML đầy đủ.

## Câu 3

Publish trên runner riêng cần checkout source của event lại. Needs không copy JAR. Multi-stage build lại từ source; cùng commit chưa đảm bảo byte identity khi dependency/base tag hoặc tooling mutable. Nếu yêu cầu promote đúng binary, dùng artifact handoff của JAR đã kiểm và kiểm digest/quy trình build, không tuyên bố mẫu đã làm vậy.

**Ôn:** mục 4. Không cần triển khai supply-chain framework nâng cao.

## Câu 4

Registry repository name cần lowercase; owner được chuẩn hóa. SHA tag nối image với source commit nhưng có thể bị ghi đè, nhất là rerun cùng commit; digest nhận diện nội dung cụ thể. GHCR push là publication, không tự chạy container hay deploy AWS. Private package cần quyền pull, repo public không tự làm package public.

**Ôn:** mục 4, 6. Tag theo SHA hữu ích dù không immutable enforcement.

## Câu 5

Verify chỉ đọc source; publish main mới cần ghi package. GITHUB_TOKEN được GitHub cấp theo job/policy, mẫu không cần PAT/AWS key. Denied kiểm tên/owner package, repo access của package đã có, org policy và token permission; không tăng write-all mù. Không đưa token registry vào image/Dockerfile args để app dùng, không log token.

**Ôn:** mục 2, 5. “Login thành công chắc push được” chưa đủ.

## Câu 6

Name là hiển thị, id là khóa để tham chiếu steps.id.outputs. Ghi đúng GITHUB_OUTPUT tạo output bước sau sử dụng. Bash `${VAR,,}` lowercase env trong shell; GitHub `${{...}}` resolve expression theo context. Defaults working-directory chỉ run, không sửa with.context/file của action; đổi input paths rõ theo layout.

**Ôn:** mục 4, 7. Không trừ lỗi nhớ tên biến khi ý nghĩa đúng.

## Câu 7

Path context ./shopcore lấy workspace sau checkout/steps sửa; default Git context của action có thể dùng snapshot Git và bỏ thay đổi file trước build. Cache Maven runner không tự vào builder. GHA export build layers không mặc định giữ mọi state của RUN cache mount qua builders/runs; cần cơ chế riêng nếu tối ưu sâu. Cache mất có thể rebuild, không là release artifact.

**Ôn:** mục 4. Không yêu cầu thuộc implementation cache backend.

## Câu 8

Ghi run URL/ID, event/ref/SHA, verify result, image tag và digest publication. Rerun cùng commit có thể khác input mutable nên khác digest. Concurrency group không hứa FIFO/chạy đủ mọi pending commit; mẫu chủ động cancel run PR cũ, không cancel running main theo expression. Build pass push denied chỉ là build pass, chưa publish thành công.

**Ôn:** mục 6. Không ghi “latest xanh là đủ”.
