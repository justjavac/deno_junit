export * from "./decrator.ts";
import { data } from "./decrator.ts";

interface TestDefined {
  desc: string;
  fn: () => void;
}

// deno-lint-ignore no-explicit-any
export default function (fn: any) {
  const instance = new fn();
  const suite = data()[fn.name];
  const { hook, ...tests } = suite;

  if (hook == undefined) {
    Object.values<TestDefined>(tests).forEach((x) => {
      Deno.test(x.desc, x.fn.bind(instance));
    });
    return;
  }

  Deno.test(fn.name, async (t) => {
    if (hook.before) hook.before.apply(instance);

    for (const x of Object.values<TestDefined>(tests)) {
      if (hook?.["before.each"]) hook?.["before.each"].apply(instance);
      await t.step(x.desc, x.fn.bind(instance));
      if (hook?.["after.each"]) hook?.["after.each"].apply(instance);
    }

    if (hook.after) hook.after.apply(instance);
  });
}
