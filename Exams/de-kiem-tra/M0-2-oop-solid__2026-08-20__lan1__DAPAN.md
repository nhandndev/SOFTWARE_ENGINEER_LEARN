# Dap an - De kiem tra nhanh M0-2 - OOP SOLID & Patterns

**Topic:** `M0-2-oop-solid`  
**Che do:** `NHANH`  
**Tong diem tho:** 43 diem  
**Normalize:** `(diem tho / 43) x 100`

---

## Phan A - Ly thuyet

### Cau 1 - 3 diem

- 1d: Encapsulation la che giau state ben trong object.
- 1d: Chi cho thay doi state qua method co kiem soat/validate invariant.
- 1d: Getter/setter thuan tuy van co the cho sua bua, vi du set price am/name rong.

### Cau 2 - 3 diem

- 1d: Composition over inheritance = uu tien "has-a" thay vi "is-a" khi tai su dung hanh vi.
- 1d: Nen dung composition khi hanh vi co the thay doi/thay the, quan he is-a khong that su ro.
- 1d: Neu duoc loi ich: giam coupling voi class cha, de thay implementation, tranh class con phinh to.

### Cau 3 - 3 diem

- 1d: SRP = mot class co mot ly do chinh de thay doi.
- 1d: OCP = mo de mo rong, dong voi sua doi code cu.
- 1d: Dau hieu vi pham hop ly: class om validate/save/email/log; if/else theo type phinh ra khi them case moi.

### Cau 4 - 3 diem

- 1d: LSP = class con thay duoc class cha ma khong pha ky vong client.
- 1d: ISP = interface nho, dung nhu cau client, khong bat implement method khong dung.
- 1d: `UnsupportedOperationException` trong method ke thua cho thay class con khong that su thay the duoc class cha/abstraction qua rong.

### Cau 5 - 3 diem

- 1d: DIP = module cap cao phu thuoc abstraction, khong phu thuoc implementation cu the.
- 1d: Constructor injection qua interface giam coupling voi class cu the.
- 1d: De test hon vi co the inject fake/mock implementation.

### Cau 6 - 3 diem

- 0.6d: Singleton = dam bao mot instance/dung chung instance.
- 0.6d: Factory = tao object, che giau logic khoi tao/chon implementation.
- 0.6d: Builder = tao object nhieu field/optional field de doc va tranh constructor dai.
- 0.6d: Strategy = dong goi nhieu thuat toan/hanh vi co the thay the.
- 0.6d: Observer = publish event cho nhieu listener/observer khi su kien xay ra.

---

## Phan B - Tinh huong

### Cau 7 - 5 diem

- 1d: Chi ra field public lam lo state, code ngoai sua truc tiep.
- 1d: Chi ra invariant bi pha: price am, name rong.
- 1d: De xuat private fields.
- 1d: De xuat method co y nghia domain va validate, vi du `rename`, `changePrice`.
- 1d: Noi duoc khong nen setter bua/setter phai co validate.

### Cau 8 - 5 diem

- 2d: Nhan dien nguy co vi pham OCP vi them discount moi phai sua if/else trong class cu.
- 1d: Co the vi pham SRP neu calculator vua chon type vua tinh tung loai.
- 1d: De xuat Strategy (`DiscountPolicy`) hoac Factory + Strategy.
- 1d: Giai thich them loai moi bang implementation moi thay vi sua if/else lon.

### Cau 9 - 5 diem

- 2d: Nhan dien SRP violation/OrderService om qua nhieu trach nhiem phu.
- 1d: Gui email/audit/stock la side effects co the tach thanh listener/service rieng.
- 1d: De xuat Observer/event/listener pattern.
- 1d: Giai thich khi action phu tang, them listener moi khong lam OrderService phinh to.

---

## Phan C - Code mini

### Cau 10 - 10 diem

Dap an tham khao:

```java
public class Product {
    private final Long id;
    private final String name;
    private final int price;

    private Product(Builder builder) {
        if (builder.name == null || builder.name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (builder.price < 0) {
            throw new IllegalArgumentException("Price must be >= 0");
        }
        this.id = builder.id;
        this.name = builder.name;
        this.price = builder.price;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private int price;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder price(int price) {
            this.price = price;
            return this;
        }

        public Product build() {
            return new Product(this);
        }
    }
}
```

Cham diem:

- 1.5d: Field che giau hop ly, khong public.
- 1d: Constructor chinh private va nhan Builder.
- 1d: Co static `builder()`.
- 1.5d: Co nested static `Builder` voi field can thiet.
- 2d: Builder methods `id/name/price` gan field va return `this`.
- 1d: `build()` tao `Product`.
- 1d: Validate name null/blank.
- 1d: Validate price >= 0.

