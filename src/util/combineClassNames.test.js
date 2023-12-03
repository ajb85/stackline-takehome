import { combineClassNames } from "./combineClassNames";

it("Combines X strings together with a space", () => {
  const strings = ["hello", "world", "how", "are", "you"];
  const results = combineClassNames(...strings);
  expect(results).toBe("hello world how are you");
});

it("Filters falsey values", () => {
  const strings = [
    "hello",
    "world",
    0,
    false,
    "how",
    undefined,
    "are",
    null,
    "you",
    "",
  ];
  const results = combineClassNames(...strings);
  expect(results).toBe("hello world how are you");
});
