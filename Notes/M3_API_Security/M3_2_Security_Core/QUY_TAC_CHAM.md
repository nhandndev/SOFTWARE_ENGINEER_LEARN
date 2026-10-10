# M3-2 — Chấm nghiêm theo bằng chứng

- Mỗi bài40đ, normalize /40×100; đạt từ34/40, không làm tròn để nâng đạt. Ngưỡng chung ≥85 đạt, 55–<85 ôn, <55 học lại.
- Rubric từng câu là nguồn chia điểm. Ý đã viết/suy ra trực tiếp rõ mới có điểm, không nương vì người học từng code project.
- Tiêu chí1đ: đủ1, đúng một phần0,5, sai/thiếu0. Tiêu chí nhiều điểm chia theo các vế, dùng bước0,25 nếu cần và giải thích phần mất. Không trừ điểm âm/ngoài rubric hoặc tính một lỗi hai lần.
- Đúng status nhưng lý do sai không nhận điểm lý do. Không cho đủ điểm chỉ nhắc “filter”, “BCrypt”, “stateless”. Nếu ý tự mâu thuẫn chưa sửa rõ, tiêu chí đó0.
- Nghiêm với: password Base64 là mã hóa; encode lại rồi equals hash; UDS tự xác thực password; ROLE_ADMIN gán từ request; permitAll bỏ mọi filter; stateless tự miễn CSRF; CORS thay authorization; mọi403 do thiếu role.
- Chấp nhận lời/code tương đương; không trừ lỗi chính tả/imports, không bắt thuộc tên lớp nếu giải thích đúng vai trò và đề không kiểm tên. Sai prefix, thứ tự rule, status, condition có hiệu ứng khác là lỗi kiến thức.
- Không kiểm JWT/OAuth2/custom token filter/ACL/CSRF token SPA implementation chưa dạy. Không yêu cầu dự án chạy thật để đủ điểm phần tư duy.
- Khi chấm thật, theo03_PROMPT_CHAM_DE.md: snapshot, điểm từng câu, phần đúng/thiếu, chữa và chỉ mục học lại; không tự tick phần chưa có bằng chứng. Không có điểm người học trong file này.
