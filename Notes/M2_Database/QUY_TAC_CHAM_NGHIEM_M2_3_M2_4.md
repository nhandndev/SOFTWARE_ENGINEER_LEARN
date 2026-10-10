# Quy tắc chấm nghiêm M2-3 và M2-4

Áp dụng cho 7 đề lesson Flyway/N+1/HikariCP và file `__DAPAN.md` tương ứng. Đây là hướng dẫn chấm, **không phải kết quả chấm bài**. Không đổi điểm, tiến độ hoặc ngưỡng roadmap chỉ vì tài liệu đã được viết.

## 1. Nghiêm về bản chất, công bằng về diễn đạt

- Mỗi câu 5đ, mỗi đề 40đ. Điểm = điểm thô / 40 × 100; đạt từ **34/40 = 85%**. Không làm tròn 33,75/40 thành đạt. Giữ ngưỡng chung: ≥85 đạt; 55–<85 cần ôn; <55 học lại.
- Bảng rubric trong từng đáp án là nguồn chia điểm chính. Phần bài giải bên dưới giải thích rubric, không tạo thêm yêu cầu ngầm.
- Chỉ cho điểm ý **đã viết hoặc suy ra trực tiếp, không mơ hồ**. Không tự bổ sung kiến thức thay người học vì biết họ từng làm project.
- Câu hỏi có nhiều vế: đúng kết luận nhưng thiếu lý do, điều kiện, bước xử lý hoặc phép kiểm thì chỉ nhận điểm vế đã đáp ứng.
- Không cho đủ điểm vì nhắc đúng từ khóa: “DTO”, “repair”, “transaction”, “p95” phải được dùng đúng tác dụng trong tình huống.
- Chấp nhận lời/SQL/code tương đương. Không trừ chính tả, imports, tên package khi đề không kiểm các phần đó. Nhưng sai `INNER`/`LEFT`, sai filter, sai thứ tự migration, sai đơn vị hoặc field làm đổi kết quả là lỗi kiến thức, không phải lỗi gõ.
- Không bắt thêm API/framework internals, tool benchmark hoặc triển khai CI ngoài câu hỏi để đạt điểm tối đa.

## 2. Cách chia điểm khi chỉ đúng một phần

1. Tách từng tiêu chí trong rubric và trích câu trả lời làm bằng chứng.
2. Với tiêu chí 1đ: đúng và đủ nhận 1; đúng một phần nhưng còn thiếu điều kiện quan trọng nhận 0,5; sai/không trả lời nhận 0.
3. Với tiêu chí nhiều điểm: chia theo các ý độc lập đã nêu. Ví dụ “A chạy V3/V10 (2đ)” có thể chia mỗi file đúng thứ tự 1đ. Không cho 2đ nếu chỉ viết “chạy file còn thiếu”.
4. Khi cần phân nhỏ hơn, dùng bước 0,25đ và ghi rõ phần đúng/thiếu. Không dùng điểm lẻ để nâng tổng lên ngưỡng đạt.
5. Cùng một ý không tính hai lần. Lỗi một chỗ không bị phạt thêm bằng điểm âm hay trừ ngoài rubric.
6. Nếu trả lời tự mâu thuẫn về một tiêu chí mà không chốt/sửa rõ, tiêu chí đó 0đ. Ví dụ vừa nói “repair chỉ sửa history” vừa kết luận “repair thêm cột” thì không được điểm hiểu tác dụng repair.

## 3. Lỗi bản chất cần ghi rõ

Các ví dụ: sửa migration đã phát hành rồi repair để coi như schema đã đổi; coi baseline là kiểm toàn schema; coi timeout mượn connection là timeout query; bỏ mất Product nhưng gọi đó là tối ưu thành công; coi DTO/OSIV/readOnly tự giải quyết N+1.

Cho 0 ở **tiêu chí liên quan**, vẫn chấm phần độc lập đúng. Không tự đặt luật “sai một câu trượt cả lesson”, không thay ngưỡng 85. Nếu tổng vẫn đạt nhưng có lỗi quan trọng, ghi rõ đạt theo điểm và chỉ ra lỗi cần sửa; không tick kiến thức chưa được chứng minh.

## 4. Bài giải mẫu không phải bài văn phải học thuộc

Đáp án mẫu trình bày đủ vế để tự đối chiếu. Ví dụ minh họa thêm không tự biến thành điều kiện nhận điểm. Một câu trả lời ngắn nhưng chứng minh đủ rubric vẫn nhận 5/5; trả lời dài mà sai cơ chế vẫn bị trừ.

## 5. Khi người học nộp bài

Tuân thủ `03_PROMPT_CHAM_DE.md`: snapshot nhận xét, điểm từng câu, phần làm được, phần sai/thiếu, đáp án chữa và chỗ đọc lại. Với câu thiếu điểm, phải chỉ cụ thể **thiếu ý nào, mất bao nhiêu điểm**, không chỉ ghi “chưa sâu”. Tài liệu này không sửa quy tắc cập nhật `01_LO_TRINH.md`/`05_TIEN_DO.md`.
