# deno_junit

Use JUnit 5 Decorator in Deno.

JUnit code:

```java
class MyFirstJUnitJupiterTests {

    private final Calculator calculator = new Calculator();

    @Test
    void addition() {
        assertEquals(2, calculator.add(1, 1));
    }
}
```

Use JUnit Decorator in Deno:

```ts
class MyFirstJUnitJupiterTests {
  private calculator = new Calculator();

  @Test
  addition() {
    assert.is(2, this.calculator.add(1, 1));
  }
}
```

## TODO

- [x] @Test
- [ ] @ParameterizedTest
- [ ] @RepeatedTest
- [ ] @TestFactory
- [ ] @TestTemplate
- [ ] @TestClassOrder
- [ ] @TestMethodOrder
- [ ] @TestInstance
- [x] @DisplayName
- [ ] @DisplayNameGeneration
- [x] @BeforeEach
- [x] @AfterEach
- [x] @BeforeAll
- [ ] @AfterAll
- [ ] @Nested
- [ ] @Tag
- [x] @Disabled
- [ ] @Timeout
- [ ] @ExtendWith
- [ ] @RegisterExtension
- [ ] @TempDir

## License

[deno_junit](https://github.com/justjavac/deno_junit) is released under the MIT
License. See the bundled [LICENSE](./LICENSE) file for details.
