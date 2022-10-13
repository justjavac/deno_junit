export * from "./decrator.ts";
import { data } from "./decrator.ts";

interface TestDefined {
  desc: string;
  fn: () => void;
  skip?: boolean;
  skipReason?: string;
}

// deno-lint-ignore no-explicit-any
export default function (fn: any) {
  const instance = new fn();
  const suite = data()[fn.name];
  const { hook, ...tests } = suite;

  if (hook == undefined) {
    Object.values<TestDefined>(tests).forEach((x) => {
      Deno.test({
        name: x.desc,
        fn: x.fn.bind(instance),
        ignore: x.skip,
      });
    });
    return;
  }

  Deno.test(fn.name, async (t) => {
    if (hook.before) hook.before.apply(instance);

    for (const x of Object.values<TestDefined>(tests)) {
      if (hook["before.each"]) hook["before.each"].apply(instance);
      await t.step({ name: x.desc, fn: x.fn.bind(instance), ignore: x.skip });
      if (hook["after.each"]) hook["after.each"].apply(instance);
    }

    if (hook.after) hook.after.apply(instance);
  });
}
