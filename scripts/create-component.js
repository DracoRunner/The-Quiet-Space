const fs = require("node:fs");
const path = require("node:path");

function pascalCase(name) {
  return name
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: create-component.js ComponentName [--style]");
    process.exit(1);
  }

  const nameArg = args[0];
  const hasStyle = args.includes("--style");

  // If the user passed a path like "src/components/MyComp" use it.
  // Otherwise default to creating the component folder in the current working directory.
  const normalized = nameArg.replace(/\\/g, "/");
  const parts = normalized.split("/").filter(Boolean);
  const rawName = parts[parts.length - 1];
  const compName = pascalCase(rawName);

  // If user provided a path (one or more segments), use its dirname; otherwise use cwd
  const targetBase =
    parts.length > 1
      ? path.join(process.cwd(), ...parts.slice(0, -1))
      : process.cwd();
  const baseDir = path.join(targetBase, compName);
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

  const compFile = path.join(baseDir, `${compName}.tsx`);
  const indexFile = path.join(baseDir, `index.ts`);
  const styleFile = path.join(baseDir, `${compName}.module.scss`);

  if (fs.existsSync(compFile) || fs.existsSync(indexFile)) {
    console.error("Component already exists at", baseDir);
    process.exit(1);
  }

  const importStyle = hasStyle
    ? `import styles from './${compName}.module.scss';\n`
    : "";
  const styleUsage = hasStyle ? ` className={styles.root}` : "";

  const componentContent = `import type { FC } from "react";\n\n${importStyle}type ${compName}Props = {};\n\nconst ${compName}: FC<${compName}Props> = () => {\n  return <div${styleUsage}>${compName}</div>;\n};\n\nexport default ${compName};\n`;

  const indexContent = `import ${compName} from './${compName}';\nexport default ${compName};\n`;

  fs.writeFileSync(compFile, componentContent, { encoding: "utf8" });
  fs.writeFileSync(indexFile, indexContent, { encoding: "utf8" });
  if (hasStyle) {
    const scss = `/* ${compName} styles */\n.root {\n  /* add styles here */\n}\n`;
    fs.writeFileSync(styleFile, scss, { encoding: "utf8" });
  }

  console.log("Generated component at", baseDir);
}

main();
