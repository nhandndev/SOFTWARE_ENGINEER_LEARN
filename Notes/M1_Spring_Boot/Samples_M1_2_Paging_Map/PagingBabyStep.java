import java.util.List;

public class PagingBabyStep {
    public static void main(String[] args) {
        List<String> items = List.of("A", "B", "C", "D", "E");

        show(items, 0, 2);
        show(items, 1, 2);
        show(items, 2, 2);
        show(items, 3, 2);
    }

    static void show(List<String> items, int page, int size) {
        int totalItems = items.size();

        int from = page * size;
        List<String> content;
        int to;
        if (from >= totalItems) {
            to = from;
            content = List.of();
        } else {
            to = from + size;
            if (to > totalItems) {
                to = totalItems;
            }
            content = items.subList(from, to);
        }

        int totalPages = (int) Math.ceil((double) totalItems / size);

        System.out.println("items      = " + items);
        System.out.println("page       = " + page);
        System.out.println("size       = " + size);
        System.out.println("from       = " + from);
        System.out.println("to         = " + to);
        System.out.println("content    = " + content);
        System.out.println("totalItems = " + totalItems);
        System.out.println("totalPages = " + totalPages);
        System.out.println("----------------------");
    }
}
