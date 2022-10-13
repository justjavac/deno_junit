import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { User } from "https://deno.land/std@0.159.0/testing/bdd_examples/user.ts";
import DenoTest, { AfterEach, BeforeEach, DisplayName, Test } from "./mod.ts";

@DenoTest
export class UserTest {
  @Test
  @DisplayName("users initially empty")
  userEmpty() {
    assertEquals(User.users.size, 0);
  }

  @Test
  @DisplayName("constructor")
  init() {
    try {
      const user = new User("Kyle");
      assertEquals(user.name, "Kyle");
      assertStrictEquals(User.users.get("Kyle"), user);
    } finally {
      User.users.clear();
    }
  }
}

@DenoTest
export class UserAgeTest {
  private user!: User;

  @BeforeEach
  init() {
    this.user = new User("Kyle");
  }

  @AfterEach
  shutDoen() {
    User.users.clear();
  }

  @Test
  getAge() {
    assertThrows(() => this.user.getAge(), Error, "Age unknown");
    this.user.age = 18;
    assertEquals(this.user.getAge(), 18);
  }

  @Test
  setAge() {
    this.user.setAge(18);
    assertEquals(this.user.getAge(), 18);
  }
}
