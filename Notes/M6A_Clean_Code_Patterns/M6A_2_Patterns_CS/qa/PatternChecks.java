package learning.patterns;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

public final class PatternChecks {
    private static int checks;

    private static void check(boolean condition, String label) {
        checks++;
        if (!condition) throw new AssertionError(label);
    }

    private static void error(Class<? extends Throwable> type, String message, Runnable action) {
        try {
            action.run();
        } catch (Throwable failure) {
            check(type.isInstance(failure), "exception type: " + failure);
            check(message.equals(failure.getMessage()), "exception message: " + failure);
            return;
        }
        throw new AssertionError("Expected " + type.getSimpleName() + ": " + message);
    }

    private static void sameFailure(RuntimeException expected, Runnable action) {
        try {
            action.run();
        } catch (RuntimeException actual) {
            check(actual == expected, "same failure must propagate");
            return;
        }
        throw new AssertionError("Expected original failure");
    }

    private static void builder() {
        var builder = BuilderExample.ExportRequest.builder().destination("report");
        var first = builder.build();
        check(first.getLimit() == 100, "builder default");
        check(first.getDestination().equals("report"), "builder destination");
        var second = builder.limit(20).build();
        check(first != second, "builder creates distinct requests");
        check(first.getLimit() == 100, "builder reuse preserves first object");
        check(second.getLimit() == 20, "builder updated value");
        for (int limit : new int[]{1, 1000}) {
            check(BuilderExample.ExportRequest.builder().destination("x").limit(limit)
                    .build().getLimit() == limit, "valid builder boundary " + limit);
        }
        for (int limit : new int[]{0, -1, 1001}) {
            error(IllegalArgumentException.class, "limit must be 1..1000",
                    () -> BuilderExample.ExportRequest.builder().destination("x").limit(limit).build());
        }
        error(IllegalArgumentException.class, "destination is required",
                () -> BuilderExample.ExportRequest.builder().limit(0).build());
        error(IllegalArgumentException.class, "destination is required",
                () -> BuilderExample.ExportRequest.builder().destination("  ").build());
        check(BuilderExample.ExportRequest.builder().destination(" x ").build()
                .getDestination().equals(" x "), "do not silently trim");
    }

    private static void factories() {
        check(FactoryExample.simpleFactory("CSV") instanceof FactoryExample.CsvExporter,
                "simple CSV type");
        check(FactoryExample.simpleFactory("JSON") instanceof FactoryExample.JsonExporter,
                "simple JSON type");
        check(FactoryExample.simpleFactory("CSV").export("Book").equals("CSV:Book"),
                "simple CSV output");
        check(FactoryExample.simpleFactory("JSON").export("Book").equals("JSON:Book"),
                "simple JSON output");
        check(new FactoryExample.CsvJob().run("Book").equals("CSV:Book"), "CSV job dispatch");
        check(new FactoryExample.JsonJob().run("Book").equals("JSON:Book"), "JSON job dispatch");
        error(IllegalArgumentException.class, "format is required", () -> FactoryExample.simpleFactory(null));
        error(IllegalArgumentException.class, "unsupported format", () -> FactoryExample.simpleFactory("XML"));
        AtomicInteger creates = new AtomicInteger();
        var job = new FactoryExample.ExportJob() {
            protected FactoryExample.Exporter createExporter() {
                creates.incrementAndGet();
                return new FactoryExample.CsvExporter();
            }
        };
        error(NullPointerException.class, "name is required", () -> job.run(null));
        check(creates.get() == 0, "invalid input before factory");
        job.run("x");
        job.run("x");
        check(creates.get() == 2, "sample creates once per valid job run");

        var a = new CreationFamilyExample.PackageClient(new CreationFamilyExample.PartnerAFactory());
        var b = new CreationFamilyExample.PackageClient(new CreationFamilyExample.PartnerBFactory());
        check(a.prepare("Book").equals("A-sign(A:Book)"), "family A output");
        check(b.prepare("Book").equals("B-sign(B:Book)"), "family B output");
        List<String> events = new ArrayList<>();
        var factory = new CreationFamilyExample.PartnerFactory() {
            public CreationFamilyExample.Encoder createEncoder() {
                events.add("create encoder");
                return value -> { events.add("encode " + value); return "E:" + value; };
            }
            public CreationFamilyExample.Signer createSigner() {
                events.add("create signer");
                return value -> { events.add("sign " + value); return "S:" + value; };
            }
        };
        var client = new CreationFamilyExample.PackageClient(factory);
        check(events.equals(List.of("create encoder", "create signer")), "constructor factory order");
        check(client.prepare("x").equals("S:E:x"), "family pipeline data");
        check(events.equals(List.of("create encoder", "create signer", "encode x", "sign E:x")),
                "family prepare order");
        error(NullPointerException.class, "value is required", () -> client.prepare(null));
        check(events.size() == 4, "null input before family operations");
        error(NullPointerException.class, "factory is required",
                () -> new CreationFamilyExample.PackageClient(null));
    }

    private static void copyingAndScope() {
        List<String> originalColumns = new ArrayList<>(List.of("id", "name"));
        var base = new CreationFamilyExample.ReportTemplate("basic", originalColumns);
        originalColumns.add("external");
        check(base.getColumns().equals(List.of("id", "name")), "copy input list");
        var detail = base.copy("detail");
        check(detail != base, "prototype new identity");
        check(detail.getName().equals("detail"), "prototype new name");
        detail.addColumn("price");
        check(base.getColumns().equals(List.of("id", "name")), "prototype source preserved");
        check(detail.getColumns().equals(List.of("id", "name", "price")), "prototype copy changed");
        List<String> snapshot = detail.getColumns();
        detail.addColumn("stock");
        check(snapshot.equals(List.of("id", "name", "price")), "getter snapshot stable");
        boolean unmodifiable = false;
        try { snapshot.add("invalid"); } catch (UnsupportedOperationException expected) { unmodifiable = true; }
        check(unmodifiable, "getter not mutable");
        check(CreationFamilyExample.FormatCatalog.getInstance()
                == CreationFamilyExample.FormatCatalog.getInstance(), "singleton identity in sample scope");
        check(CreationFamilyExample.FormatCatalog.getInstance().getLabel().equals("demo-formats"),
                "stateless catalog label");
    }

    private static void adapter() {
        for (int cents : new int[]{1, 1250, 0}) {
            AtomicInteger calls = new AtomicInteger();
            var adapter = new IntegrationExample.CentsAdapter(postal -> {
                calls.incrementAndGet();
                check(postal.equals("00100"), "postal code preserved");
                return cents;
            });
            String expected = switch (cents) { case 0 -> "0.00"; case 1 -> "0.01"; default -> "12.50"; };
            check(adapter.quote("00100").equals(new BigDecimal(expected)), "adapter amount/scale " + cents);
            check(calls.get() == 1, "one vendor call");
        }
        AtomicInteger calls = new AtomicInteger();
        var adapter = new IntegrationExample.CentsAdapter(postal -> { calls.incrementAndGet(); return 100; });
        error(IllegalArgumentException.class, "postalCode is required", () -> adapter.quote(null));
        error(IllegalArgumentException.class, "postalCode is required", () -> adapter.quote(" "));
        check(calls.get() == 0, "invalid postal makes no vendor call");
        error(IllegalStateException.class, "negative vendor fee",
                () -> new IntegrationExample.CentsAdapter(postal -> -1).quote("x"));
        RuntimeException failure = new RuntimeException("vendor failed");
        sameFailure(failure, () -> new IntegrationExample.CentsAdapter(postal -> { throw failure; }).quote("x"));
        error(NullPointerException.class, "client is required", () -> new IntegrationExample.CentsAdapter(null));
    }

    private static void facade() {
        List<String> events = new ArrayList<>();
        var facade = new IntegrationExample.ReportFacade(
                id -> { events.add("load " + id); return "Book"; },
                name -> { events.add("render " + name); return "report:" + name; },
                payload -> events.add("store " + payload));
        check(facade.generate(10).equals("report:Book"), "facade output");
        check(events.equals(List.of("load 10", "render Book", "store report:Book")), "facade success order/data");
        events.clear();
        error(IllegalArgumentException.class, "productId must be positive", () -> facade.generate(0));
        check(events.isEmpty(), "facade invalid id makes no calls");
        for (int stage = 0; stage < 3; stage++) {
            int failAt = stage;
            events.clear();
            RuntimeException failure = new RuntimeException("stage " + stage);
            var failing = new IntegrationExample.ReportFacade(
                    id -> { events.add("load"); if (failAt == 0) throw failure; return "Book"; },
                    name -> { events.add("render"); if (failAt == 1) throw failure; return "report"; },
                    payload -> { events.add("store"); if (failAt == 2) throw failure; });
            sameFailure(failure, () -> failing.generate(10));
            check(events.equals(List.of("load", "render", "store").subList(0, stage + 1)),
                    "facade stops downstream after failure " + stage);
        }
    }

    private static void wrappersAndTree() {
        var plain = new CompositionExample.PlainText("Book");
        check(new CompositionExample.BracketText(new CompositionExample.PrefixText(plain, "sale:"))
                .read().equals("[sale:Book]"), "bracket outside prefix");
        check(new CompositionExample.PrefixText(new CompositionExample.BracketText(plain), "sale:")
                .read().equals("sale:[Book]"), "prefix outside bracket");
        RuntimeException failure = new RuntimeException("read failed");
        sameFailure(failure, () -> new CompositionExample.BracketText(() -> { throw failure; }).read());
        sameFailure(failure, () -> new CompositionExample.PrefixText(() -> { throw failure; }, "x").read());

        AtomicBoolean allowed = new AtomicBoolean(false);
        AtomicInteger reads = new AtomicInteger();
        AtomicInteger checksOfPermission = new AtomicInteger();
        var proxy = new CompositionExample.GuardedText(
                () -> { reads.incrementAndGet(); return "secret"; },
                () -> { checksOfPermission.incrementAndGet(); return allowed.get(); });
        error(SecurityException.class, "access denied", proxy::read);
        check(reads.get() == 0, "deny before target");
        allowed.set(true);
        check(proxy.read().equals("secret"), "allow delegates output");
        check(reads.get() == 1, "one allowed target call");
        allowed.set(false);
        error(SecurityException.class, "access denied", proxy::read);
        check(reads.get() == 1 && checksOfPermission.get() == 3, "permission checked each read");
        sameFailure(failure, () -> new CompositionExample.GuardedText(() -> { throw failure; }, () -> true).read());

        var book = new CompositionExample.Leaf("Book");
        var nested = new CompositionExample.Group(List.of(new CompositionExample.Leaf("Pen"),
                new CompositionExample.Leaf("Keyboard")));
        check(book.count() == 1, "leaf count");
        check(new CompositionExample.Group(List.of(book, nested)).count() == 3, "nested composite");
        check(new CompositionExample.Group(List.of()).count() == 0, "empty composite");
        check(new CompositionExample.Group(List.of(book, book)).count() == 2, "duplicate occurrence");
        List<CompositionExample.Node> inputs = new ArrayList<>(List.of(book));
        var group = new CompositionExample.Group(inputs);
        inputs.add(nested);
        check(group.count() == 1, "group snapshots children");
        boolean overflow = false;
        try {
            new CompositionExample.Group(List.of(() -> Long.MAX_VALUE, book)).count();
        } catch (ArithmeticException expected) { overflow = true; }
        check(overflow, "composite overflow explicit");
    }

    public static void main(String[] args) {
        builder();
        factories();
        copyingAndScope();
        adapter();
        facade();
        wrappersAndTree();
        System.out.println("PASS " + checks + " assertions; literal pure Java samples only");
    }
}
