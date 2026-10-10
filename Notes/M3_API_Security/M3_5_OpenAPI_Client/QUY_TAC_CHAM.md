# Quy tắc chấm M3-5

1. Mỗi lesson 8 câu ×5 =40đ; normalize /40×100. Đạt từ 34/40, không làm tròn lên. Ngưỡng chung ≥85 đạt,55–84 ôn,<55 học lại.
2. Chấm ý nghĩa và bằng chứng theo rubric trong đáp án. Không trừ lỗi gõ/import/tên operator nếu mô tả đúng cơ chế. Cách khác an toàn được tính khi nêu giả định.
3. Không suy ra đã hiểu chỉ vì biết gọi `.retrieve()`; phải phân biệt lỗi upstream, local contract, timeout và retry side effect.
4. Retry mọi lỗi, timeout=remote chưa thực hiện, OpenAPI=Security enforcement, annotation=validation runtime là lỗi bản chất; trừ đúng phần rubric, không áp điều kiện đánh trượt bí mật.
5. Đề tư duy không yêu cầu full app hoặc thuộc JUnit. Được tra tài liệu; chỉ tính những ý đã viết, không tự bù ý theo kinh nghiệm dự án.
6. Khi chấm phải có snapshot nhận xét từng câu: làm được gì, thiếu gì, đáp án đầy đủ và cách sửa. Không ghi đè mất lịch sử.
7. Điểm lesson không tự chứng minh deliverable đã chạy và không tự chuyển module đạt.
