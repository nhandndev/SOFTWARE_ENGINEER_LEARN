# Nhan xet - M2-1 Lesson 05: Index va EXPLAIN ANALYZE

> Cham lai ngay 2026-10-05. Da cham du 8 cau theo y nghia va rubric cua de. Diem truoc do: 24/30, sau khi sua cau 1-6: 28/30.

## 1. Diem tong

**35/40 = 87,5/100: dat Lesson 05.** Day la diem lesson, chua phai diem kiem tra module M2-1. Module van dang hoc; deliverable `shopcore` va bai tong ket chua duoc xac nhan hoan thanh.

| Nhom kien thuc | Cau | Diem | Nhan xet |
|---|---|---:|---|
| Chon index, selectivity, composite | 1-2 | 11/11 | Chon index dung va khong khang dinh planner luon dung A |
| Covering index, Index Only Scan | 3 | 4/5 | Da nhan ra MVCC/visibility; can noi chinh xac hon ve visibility map |
| Doc EXPLAIN ANALYZE | 4 | 6/6 | Doc dung plan, so lieu va gioi han ket luan |
| Planner chon Seq Scan | 5 | 4/4 | Dung ban chat |
| Chi phi va quyet dinh giu index | 6 | 3/4 | Da them EXPLAIN ANALYZE; thieu chi phi luu tru |
| Phan biet EXPLAIN/ANALYZE | 7 | 4,5/5 | Dung co che chay that va rui ro UPDATE; thieu y nghia BUFFERS |
| Thiet ke phep do index | 8 | 2,5/5 | Co do truoc/sau va lap lai; thieu du lieu dai dien va dieu kien so sanh |

## 2. Tung cau

| Cau | Danh gia | Diem | Ban da lam duoc | Thieu / can sua |
|---|---|---:|---|---|
| 1 | Dung y chinh | 5/5 | Chon B-tree tren `category_id`; hieu tap ket qua nho co the huong loi, tap lon co the dung Seq Scan | Seq Scan doc tuan tu bang mot luot, khong phai quet ca bang 10.000 lan. Nen noi ro: co index khong bao dam planner dung no |
| 2 | Dung | 6/6 | Chon A, noi dung vai tro ba key, B lech mau query; da sua thanh A la ung vien phu hop | Khong con loi chinh |
| 3 | Gan du | 4/5 | `name` la payload; index du cot; da giai thich heap fetch co lien quan MVCC va khong dam bao nhanh hon | PostgreSQL khong can "thay ca gia tri cu va moi" cho moi lan doc. Index-only scan can xac minh dong co visible voi snapshot; neu page chua duoc danh dau all-visible trong visibility map thi can kiem tra heap |
| 4 | Dung | 6/6 | Phan biet hai plan, estimated/actual rows, cost; doc dung 3.900 ms va 0.320 ms, ket luan chi trong lan do nay | Khong con loi chinh |
| 5 | Dung | 4/4 | Hieu vi sao bang nho hoac tra ve da so dong thi Seq Scan van hop ly | Khong co loi chinh |
| 6 | Gan du | 3/4 | Biet chi phi INSERT/UPDATE, rui ro tao index vo ich, chon theo query; da them EXPLAIN ANALYZE de do | Chua neu moi index chiem disk/RAM cache; nen noi ro so sanh truoc-sau cung query tren du lieu dai dien |
| 7 | Gan du | 4,5/5 | `EXPLAIN` chi cho plan/uoc luong; `EXPLAIN ANALYZE` chay that; cost khong phai ms; actual/Execution Time dung; UPDATE co tac dung that | Chua noi `BUFFERS` bao cao block `hit/read` va cac chi so buffer/I/O, khong phai thoi gian hay so dong |
| 8 | Thieu nhieu dieu kien | 2,5/5 | Co baseline `EXPLAIN (ANALYZE, BUFFERS)`, ghi actual rows/time/buffers, thu index va chay nhieu lan | Chua chon du lieu dai dien, chua noi giu nguyen SQL/tham so/du lieu, chua ghi scan type + estimated rows sau index; quyet dinh giu index chua can chi phi ghi/dung luong |

## 3. Sua ban chat nhung cho thieu

- **Cau 1:** Seq Scan doc cac dong cua bang theo thu tu, roi kiem tra `category_id = 42` tren tung dong. 10.000 dong khong co nghia la 10.000 lan quet toan bang. Index la mot lua chon cho planner, khong phai lenh bat buoc.
- **Cau 3:** Ban da cham dung van de MVCC. Noi chinh xac hon: PostgreSQL can biet row version co hien thi voi transaction dang doc hay khong. Neu heap page duoc danh dau *all-visible*, co the khong can ghe heap; neu chua, index-only scan co the phai `Heap Fetches` de xac nhan. Khong phai moi UPDATE deu buoc moi lan doc thay ca ban cu va moi. Index co INCLUDE lon hon, nen van co chi phi.
- **Cau 6:** Moi index chiem disk va co the chiem cache, dong thoi can cap nhat khi ghi. `EXPLAIN ANALYZE` la dung huong; de quyet dinh giu index, nen do cung query truoc/sau voi du lieu dai dien, roi can nhac loi doc voi chi phi ghi/luu tru.
- **Cau 7:** `BUFFERS` bo sung thong tin cac block da tim thay trong cache (`hit`), can doc vao (`read`) va mot so thong tin I/O khac. Cac chi so nay giup giai thich *vi sao* mot lan do nhanh/cham; khong the thay the `Execution Time`.
- **Cau 8:** Phep do tot can co mot query that va du lieu dai dien; luu plan truoc, tao index ung vien, luu plan sau, so sanh cung SQL/tham so/du lieu va lap lai vai lan. Xem scan type, estimated/actual rows, time va buffers. Khong giu index chi vi no duoc dung: can can nhac loi ich voi dung luong va chi phi ghi; neu loi ich nho/khong on dinh thi xem lai.

## 4. On lai va buoc tiep

- `Index Only Scan` / MVCC / visibility map -> [README hoc lai](../../Notes/M2_Database/README_HOC_LAI_LESSON_05_INDEX_EXPLAIN.md) -> 15 phut -> tu giai thich tai sao `Heap Fetches` co the > 0.
- Doc plan va thoi gian -> da sua dung cau 4; duy tri cach ket luan gioi han trong lan do.
- Trade-off cua index va cach do -> [README hoc lai](../../Notes/M2_Database/README_HOC_LAI_LESSON_05_INDEX_EXPLAIN.md) -> 15 phut -> tu viet lai 5 buoc kiem chung cho query Product voi du lieu dai dien, cung dieu kien truoc/sau.
- Lesson 05 dat nguong 85. De ket luan module M2-1, can hoan thanh bai tong ket module va deliverable `shopcore` theo [lo trinh](../../01_LO_TRINH.md); chua tick checklist.
