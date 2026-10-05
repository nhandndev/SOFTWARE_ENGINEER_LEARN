# Quy trình học AWS kèm từ vựng

File này là hướng dẫn cho AI mỗi khi người học yêu cầu một bài AWS. Mục tiêu là hiểu bản chất dịch vụ AWS **và** đọc được thuật ngữ tiếng Anh liên quan, không chỉ học thuộc tên dịch vụ.

## Khi bắt đầu bài học

1. Hỏi lại chỉ khi chủ đề chưa rõ. Nếu người học đã nêu chủ đề, bắt đầu dạy ngay.
2. Đọc [Từ Vựng](Learn_Word/Tu_Vung.md) trước để biết những từ đã lưu.
3. Kiểm tra thông tin dễ thay đổi (giá, giới hạn, tính năng, khuyến nghị, chính sách) bằng tài liệu AWS chính thức trước khi giảng; dẫn link trực tiếp gần nội dung tương ứng. Không bịa giá hoặc mặc định mọi Region đều giống nhau.
4. Liên hệ ví dụ với Backend Java hoặc AI Engineering khi phù hợp với chủ đề, nhưng không ép ví dụ nếu làm bài khó hiểu hơn.

## Cách giảng

Mỗi bài nên có các phần sau, vừa đủ cho chủ đề:

1. **Vấn đề:** Dịch vụ/khái niệm này giải quyết chuyện gì?
2. **Bản chất và luồng hoạt động:** Thành phần nào làm gì, dữ liệu/luồng request đi qua đâu? Dùng sơ đồ ASCII hoặc Mermaid nếu thực sự giúp hiểu.
3. **Ví dụ cụ thể:** Một tình huống nhỏ, giải thích từng bước. Nói rõ phần nào do AWS quản lý, phần nào người dùng phải quản lý.
4. **Khi dùng / khi không dùng:** So sánh ngắn với phương án dễ nhầm.
5. **Rủi ro thực tế:** Quyền truy cập, chi phí, giới hạn hoặc lỗi thường gặp nếu liên quan.
6. **Tự kiểm tra:** 2-3 câu hỏi để người học tự giải thích lại bằng lời của mình; không ép viết code khi bài chỉ học concept.

Dùng tiếng Việt đơn giản. Thuật ngữ AWS/tiếng Anh quan trọng giữ nguyên và giải nghĩa ở lần xuất hiện đầu tiên. Phân biệt rõ ví dụ minh họa với hành vi AWS thực tế.

## Cách học và lưu từ vựng

- Chọn khoảng 5-12 từ/cụm từ thực sự xuất hiện trong bài học. Ưu tiên thuật ngữ AWS và từ làm người học khó hiểu tài liệu tiếng Anh; không nhồi từ thông dụng không liên quan.
- Trong bài học, cho bảng `English | Nghĩa tiếng Việt | Ví dụ/ngữ cảnh ngắn` và 1-2 câu luyện nhớ từ.
- So khớp với từ trong [Từ Vựng](Learn_Word/Tu_Vung.md), không phân biệt chữ hoa/chữ thường. Xem các biến thể như số ít/số nhiều hoặc `provision`/`provisioning` trước khi quyết định có thật sự là từ mới.
- **Chỉ thêm từ chưa có** vào cuối file `AWS/Learn_Word/Tu_Vung.md`, dưới mục `## Từ mới theo bài học`. Nếu mục này chưa tồn tại thì tạo một lần. Giữ nguyên toàn bộ nội dung cũ; không tự sửa nghĩa cũ hoặc xóa từ trùng đã có từ trước.
- Mỗi lần thêm, ghi ngày/chủ đề của bài và một bảng `English | Tiếng Việt | Ví dụ/ngữ cảnh`. Nếu bài không có từ mới thì không sửa file.
- Cuối bài, báo ngắn: đã thêm những từ nào, từ nào đã có sẵn và file được cập nhật.

Người học đã cho phép trước việc **bổ sung từ mới vào đúng file này khi học AWS**. Quyền này không áp dụng cho việc tự sửa các ghi chú khác trong vault.

## Khi không thể ghi file

Trong ChatGPT thường, AI có thể không có quyền đọc/ghi folder local. Khi đó hãy đưa bảng từ mới trong câu trả lời và nói rõ **chưa lưu vào vault**; không tuyên bố đã cập nhật file. Người học có thể chuyển sang một AI có quyền truy cập workspace hoặc cung cấp file để cập nhật.

## Câu gọi nhanh

> Dạy tôi AWS về [chủ đề] theo `AWS/README_HOC_AWS_KEM_TU_VUNG.md`. Đọc `AWS/Learn_Word/Tu_Vung.md` trước, giảng dễ hiểu và thêm từ mới chưa có vào file đó. Cuối bài nói rõ bạn đã lưu được hay chưa.
