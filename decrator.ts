// https://github.com/i5ting/ts-junit/blob/7229bd060fa348705bcbf8af0b09fffa9605d085/src/decrator.ts
// Copyright i5ting. All rights reserved. MIT license.
// Copyright 2022 justjavac. All rights reserved. MIT license.

// deno-lint-ignore-file no-explicit-any
let cache: Record<string, any> = {};

/** @alpha */
export function emptydata() {
  cache = {};
  return cache;
}

/** @alpha */
export function data() {
  return cache;
}

/** @alpha */
export function BeforeAll(
  target: any,
  propertyName: string,
  _descriptor: TypedPropertyDescriptor<any>,
) {
  const className = target.constructor.name;
  if (!cache[className]) cache[className] = {};
  if (!cache[className]["hook"]) cache[className]["hook"] = {};

  cache[className]["hook"]["before"] = target[propertyName];
}

/** @alpha */
export function BeforeEach(
  target: any,
  propertyName: string,
  _descriptor: TypedPropertyDescriptor<any>,
) {
  const className = target.constructor.name;
  if (!cache[className]) cache[className] = {};
  if (!cache[className]["hook"]) cache[className]["hook"] = {};

  cache[className]["hook"]["before.each"] = target[propertyName];
}

/** @alpha */
export function AfterEach(
  target: any,
  propertyName: string,
  _descriptor: TypedPropertyDescriptor<any>,
) {
  const className = target.constructor.name;
  if (!cache[className]) cache[className] = {};
  if (!cache[className]["hook"]) cache[className]["hook"] = {};

  cache[className]["hook"]["after.each"] = target[propertyName];
}

/** @alpha */
export function AfterAll(
  target: any,
  propertyName: string,
  _descriptor: TypedPropertyDescriptor<any>,
) {
  const className = target.constructor.name;
  if (!cache[className]) cache[className] = {};
  if (!cache[className]["hook"]) cache[className]["hook"] = {};

  cache[className]["hook"]["after"] = target[propertyName];
}

/** @alpha */
export function Test(
  target: any,
  propertyName: string,
  _descriptor: TypedPropertyDescriptor<any>,
) {
  const className = target.constructor.name;
  if (!cache[className]) cache[className] = {};
  if (!cache[className][propertyName]) cache[className][propertyName] = {};

  if (cache[className][propertyName]["desc"] == null) {
    cache[className][propertyName]["desc"] = propertyName;
  }
  cache[className][propertyName]["fn"] = target[propertyName];
}

/**
 * Creates a test case DisplayName.
 * Can be used on entity property or on entity.
 * Can create suite name when used on entity.
 *
 * @alpha
 */
export function DisplayName(
  message: string,
): ClassDecorator & PropertyDecorator {
  return function (
    clsOrObject: any,
    propertyName?: string | symbol,
  ) {
    const target = propertyName
      ? clsOrObject.constructor
      : (clsOrObject as CallableFunction);
    const className = target.name;
    if (!cache[className]) cache[className] = {};

    if (propertyName) {
      if (!cache[className][propertyName]) {
        cache[className][propertyName] = {
          desc: message,
        };
      }
    } else {
      console.debug(`when @DisplayName with class: ${message}`);
    }
  };
}

/**
 * Creates a test case DisplayName.
 * Can be used on entity property or on entity.
 * Can create suite name when used on entity.
 *
 * @alpha
 */
export function Disabled(message: string): ClassDecorator & PropertyDecorator {
  return function (
    clsOrObject: any,
    propertyName?: string | symbol,
  ) {
    const target = propertyName
      ? clsOrObject.constructor
      : (clsOrObject as CallableFunction);
    const className = target.name;
    if (!cache[className]) cache[className] = {};

    if (propertyName) {
      if (!cache[className][propertyName]) {
        cache[className][propertyName] = {};
      }

      cache[className][propertyName]["skip"] = true;
      cache[className][propertyName]["skipReason"] = message;
    } else {
      cache[className]["skipClaas"] = true;
      cache[className]["skipClaasReason"] = message;
    }
  };
}
