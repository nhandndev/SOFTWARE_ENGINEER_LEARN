# Lesson plan M1-6 - Testing va Clean Code toi thieu

## Lesson 01 - JUnit 5, test mindset va clean test naming

Trong tam:

- Test de lam gi.
- Unit test la gi.
- Arrange - Act - Assert.
- Given - When - Then.
- JUnit 5: `@Test`, assertions, exception test.
- Test naming ro nghia.

Ket qua:

- Viet duoc test cho class Java thuan.
- Biet test behavior thay vi test implementation.

## Lesson 02 - Mockito cho Service layer

Trong tam:

- Mock Repository.
- Stub return value.
- Verify interaction.
- ArgumentCaptor.
- Test business error bang `assertThrows`.

Ket qua:

- Test duoc Service ma khong can database.

## Lesson 03 - Spring Boot slice test

Trong tam:

- `@WebMvcTest` cho Controller.
- `@DataJpaTest` cho Repository.
- Khi nao dung slice test thay vi full context.

Ket qua:

- Test Controller request/response/status JSON.
- Test Repository query/paging voi database test.

## Lesson 04 - Integration test va clean code toi thieu

Trong tam:

- `@SpringBootTest`.
- Test happy path end-to-end o muc co ban.
- Naming, method length, comment, duplication.

Ket qua:

- Biet luc nao can integration test.
- Code va test de doc hon, it phu thuoc hon.
