import java.util.List;

public class SimplePagingDemo {
    public static void main(String[] args) {
        List<String> products = List.of("P1", "P2", "P3", "P4", "P5");

        printPage(products, 0, 2);
        printPage(products, 1, 2);
        printPage(products, 2, 2);
        printPage(products, 3, 2);
    }

    static void printPage(List<String> products, int page, int size) {
        int totalElements = products.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int fromIndex = page * size;

        List<String> content;
        if (fromIndex >= totalElements) {
            content = List.of();
        } else {
            int toIndex = Math.min(fromIndex + size, totalElements);
            content = products.subList(fromIndex, toIndex);
        }

        System.out.println("page=" + page);
        System.out.println("size=" + size);
        System.out.println("content=" + content);
        System.out.println("totalElements=" + totalElements);
        System.out.println("totalPages=" + totalPages);
        System.out.println();
    }
}
