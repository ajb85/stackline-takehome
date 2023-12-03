const fs = require("fs");
const path = require("path");

if (process.argv.length !== 3) {
  console.error("Usage: npm run genComponent NAME");
  process.exit(1);
}

const componentName = process.argv[2];
const componentDir = path.join(
  __dirname,
  "..",
  "src",
  "components",
  componentName
);

if (fs.existsSync(componentDir)) {
  console.error(`Component ${componentName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(componentDir);

const componentCode = `
import { ${componentName}Props } from "./types";

export function ${componentName}(props: ${componentName}Props) {
  return <div>Hello World</div>;
}
`;

fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentCode
);

const testCode = `
import { render, screen } from "@testing-library/react";
import { ${componentName} } from "./${componentName}";
import { ${componentName}Props } from "./types";

it("renders", () => {
  const props: ${componentName}Props = {};
  render(<${componentName} {...props} />);
});
`;

fs.writeFileSync(
  path.join(componentDir, `${componentName}.test.tsx`),
  testCode
);

fs.writeFileSync(path.join(componentDir, "util.ts"), "export {}");

const typesCode = `
export type ${componentName}Props = {};
`;

fs.writeFileSync(path.join(componentDir, "types.ts"), typesCode);

console.log(`Component ${componentName} generated successfully.`);
