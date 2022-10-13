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

  if (hook?.["before"]) hook?.["before"].apply(instance);

  Object.values<TestDefined>(tests).forEach((x) => {
    if (hook?.["before.each"]) hook?.["before.each"].apply(instance);
    Deno.test(x.desc, x.fn.bind(instance));
    if (hook?.["after.each"]) hook?.["after.each"].apply(instance);
  });

  if (hook?.["after"]) hook?.["after"].apply(instance);
}
