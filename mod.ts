export * from "./decrator.ts";
import { data } from "./decrator.ts";

interface TestDefined {
  desc: string;
  fn: () => void;
  skip?: boolean;
  skipReason?: string;
  params?: Array<any>;
}

// deno-lint-ignore no-explicit-any
export default function (fn: any) {
  const instance = new fn();
  const suite = data()[fn.name];
  const { hook, ...tests } = suite;

  if (hook == undefined) {
    Object.values<TestDefined>(tests).forEach((x) => {
      if (x.params) {
        x.params.map((param) =>
          Deno.test({
            name: x.desc,
            fn: x.fn.bind(instance,param),
            ignore: x.skip,
          })
        )
      } else {
        Deno.test({
          name: x.desc,
          fn: x.fn.bind(instance),
          ignore: x.skip,
        })
      }
    });
    return;
  }

  Deno.test(fn.name, async (t) => {
    if (hook.before) hook.before.apply(instance);

    for (const x of Object.values<TestDefined>(tests)) {
      if (hook["before.each"]) hook["before.each"].apply(instance);
      
      if (x.params) {
        await Promise.all(
          x.params.map(
            async (param) =>
              await t.step({
                name: x.desc,
                fn: x.fn.bind(instance, param),
                ignore: x.skip,
              })
          )
        )
      } else {
        await t.step({ name: x.desc, fn: x.fn.bind(instance), ignore: x.skip })
      }

      if (hook["after.each"]) hook["after.each"].apply(instance);
    }

    if (hook.after) hook.after.apply(instance);
  });
}
