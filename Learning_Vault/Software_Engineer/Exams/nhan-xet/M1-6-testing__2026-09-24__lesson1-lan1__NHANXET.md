# Nhan xet M1-6 Lesson 01 - lan cham tam (2026-09-28)

De: `Exams/de-kiem-tra/M1-6-testing__2026-09-24__lesson1-lan1.md`.

## 1. Diem va pham vi

- Da lam cau 1-3: **7/16 diem tho = 44% tren phan da lam**.
- Cau 4-7 chua tra loi: **chua cham**. Tong diem de la 40; chua co diem toan bai/thang 100 chinh thuc.
- Trang thai module: **dang hoc**, chua ket luan dat/truot Lesson 01 hay M1-6.
- Nhom test mindset: 4/5 (80%, can bo sung). Nhom unit/integration: 2/5 (40%, can hoc lai). Nhom Arrange-Act-Assert: 1/6 (17%, can hoc lai).

## 2. Cham tung cau

| Cau | Diem | Ban da noi dung gi | Con thieu/sai |
|---|---:|---|---|
| 1 | 4/5 | Dung khi noi coverage khong phai muc dich chinh, test kiem chung output/logic va bao ve khi refactor; biet mock dependency khi tach unit. | Chua noi ro coverage cao van co the bo sot rule; test la vi du ghi lai business rule va phat hien regression. Mock chi la cong cu, khong phai dieu kien de test co y nghia. |
| 2 | 2/5 | Phan biet duoc unit la pham vi nho, integration gom nhieu buoc/thanh phan. | Integration can noi ro cac thanh phan chay chung (vi du service + repository + DB); chua tra loi vi sao khong dung `@SpringBootTest` cho moi test: khoi dong full context, cham va kho khoanh vung loi. |
| 3 | 1/6 | Hieu `Arrange` co nghia la chuan bi/cho truoc du lieu. | Ban dat `goi service.create` vao Arrange, `kiem tra response` vao Act, va input/Category vao Assert. Ba buoc dang bi dao vi tri. |
| 4-7 | Chua cham | Chua co cau tra loi. | Lam tiep khi san sang; khong tinh 0 o lan cham tam nay. |

## 3. Sua bai theo y nghia

**Cau 1:** Coverage cho biet phan code nao da duoc chay qua, khong tu chung minh ta da kiem tra dung business rule. Test tot kiem chung output/exception mong doi, bao ve hanh vi khi refactor, phat hien regression va ghi lai rule bang vi du.

**Cau 2:** Unit test kiem tra mot don vi nho voi dependency duoc tach/thay the neu can. Integration test kiem tra nhieu thanh phan phoi hop that. `@SpringBootTest` nap Spring context rong; dung cho tat ca test se cham va khi loi kho biet loi nam o don vi nao.

**Cau 3:**

```text
Arrange: Tao request co SKU/gia hop le; chuan bi Category ton tai,
         SKU chua trung, repository/mock va ProductService.
Act:     Goi productService.create(request), luu ket qua tra ve.
Assert:  Kiem tra response co dung SKU/gia/Category; neu can, kiem tra save.
```

Meo nho: **Arrange = chuan bi; Act = lam; Assert = doi chieu ket qua.**

## 4. Hoc lai va hanh dong tiep theo

- Muc dich test/coverage -> `LESSON_01_JUNIT5_TEST_MINDSET.md` muc 1 -> 10 phut -> tu neu mot case coverage cao nhung van sot bug.
- Unit/integration -> cung file muc 2-3 -> 15 phut -> phan loai mot ProductService test va mot test service + database.
- Arrange-Act-Assert -> cung file muc 5, 10 -> 20 phut -> viet lai cau 3 theo 3 nhan chuan bi/goi/kiem tra.
- Sau do lam cau 4-7. Khi hoan tat, cham lai toan bo 40 diem va moi quy doi thang 100 de xet nguong 85%.

Khong doi checklist `01_LO_TRINH.md` trong lan cham tam nay.
