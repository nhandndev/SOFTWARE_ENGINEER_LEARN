# M4-3 · Lesson03 JaCoCo · Lần1

PHONG_VAN theo lesson8×5=40đ, đạt34/40, khoảng40–50 phút. Policy gate bài này: LINE COVEREDRATIO≥0.70, BUNDLE một Maven module, không excludes production classes. Được tra XML/flag; chấm cơ chế.

## Câu 1 - 70 của cái gì?

Report A covered21/missed9 lines; B covered20/missed10 lines. Tính coverage và pass/fail theo policy. Vì sao phải ghi cả LINE và BUNDLE thay vì chỉ nói70%?

**Trả lời:**

## Câu 2 - Line100 mà vẫn sai

Một if viết trên một dòng, chỉ nhánh true được đi qua; line có thể100 trong khi branch chưa đủ. Giải thích line/branch khác nhau. Test gọi method nhưng không assert phí, code trả sai vẫn pass: coverage cao có chứng minh business đúng không? Nêu một assertion/case nên thêm.

**Trả lời:**

## Câu 3 - Tổng đạt, Service0

Bundle giả định có700 covered/300 missed lines; một Service quan trọng0%. Bundle có đạt gate không, có đảm bảo mỗi class70 không? Nêu review/test cần làm thêm, không đổi scope để giấu Service.

**Trả lời:**

## Câu 4 - Agent, report và check

Kể luồng từ clean verify qua prepare-agent, test JVM, exec, report, check và exit code. Nếu chỉ chạy mvn test, hoặc POM chỉ có report mà không check, có đảm bảo fail khi coverage60% không? Vì sao?

**Trả lời:**

## Câu 5 - JVM argLine mất agent

JaCoCo prepare-agent đã thiết lập jacocoArgLine nhưng Surefire argLine chỉ có -Xmx512m; hoặc forkCount=0. Tests có thể pass mà không thu data như dự định không? Nêu nguyên nhân, cách ghép agent args đúng và cách kiểm sau sửa, không cần thuộc XML.

**Trả lời:**

## Câu 6 - Không có exec mà xanh

Trên run clean, log report/check báo skip vì thiếu execution data, Maven exit0. Có phải đã check0% và đạt70 không? Nêu những chỗ cần debug và một kiểm CI bổ sung để không cho missing-data đi qua.

**Trả lời:**

## Câu 7 - Exclude để đẹp số

Dev exclude toàn Service khỏi report để HTML vượt70 nhưng check vẫn đo phạm vi khác. Chỉ ra vấn đề đo lường/che rủi ro, policy excludes và cách sửa hữu ích để đạt gate đúng, không chỉ chỉnh report cho xanh.

**Trả lời:**

## Câu 8 - IDE và report khác run

IDE xanh, HTML cũ80%, CI clean verify fail. Bạn cần đọc những file/log nào để biết tests chạy, agent data, metric/scope và check của đúng run? Vì sao không lấy HTML cũ/cache exec làm bằng chứng cho commit mới?

**Trả lời:**
