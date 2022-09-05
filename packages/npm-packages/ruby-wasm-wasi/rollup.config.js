import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

const typescriptOptions = { tsconfig: "./tsconfig.json", declaration: false, exclude: ["src/browser.script.ts"] }

function variant(basename) {
  return {
    input: `src/${basename}.ts`,
    output: [
      {
        file: `dist/${basename}.umd.js`,
        format: "umd",
        name: "ruby-wasm-wasi",
      },
      {
        file: `dist/${basename}.esm.js`,
        format: "es",
        name: "ruby-wasm-wasi",
      },
      {
        file: `dist/${basename}.cjs.js`,
        format: "cjs",
        exports: "named",
      },
    ],
    plugins: [
      typescript(typescriptOptions),
      nodeResolve(),
      json(),
    ],
  };
}

/** @type {import('rollup').RollupOptions[]} */
export default [
  variant("index"),
  variant("browser"),
  {
    input: "src/browser.script.ts",
    output: [
      {
        file: "dist/browser.script.js",
        format: "iife"
      }
    ],
    plugins: [
      typescript(typescriptOptions),
      nodeResolve(),
      json(),
    ],
  },
  {
    input: `src/node.ts`,
    output: [
      {
        file: `dist/node.esm.js`,
        format: "es",
        name: "ruby-wasm-wasi",
      },
      {
        file: `dist/node.cjs.js`,
        format: "cjs",
        exports: "named",
      },
    ],
    plugins: [
      typescript(typescriptOptions),
      nodeResolve(),
    ],
    external: ["wasi"],
  },
];
