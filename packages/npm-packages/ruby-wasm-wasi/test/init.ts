import fs from "fs/promises";
import path from "path";
import { DefaultRubyVM } from "../dist/default/node.cjs";

const rubyModule = (async () => {
  const binary = await fs.readFile(path.join(__dirname, "./../dist/ruby.wasm"));
  return await WebAssembly.compile(binary.buffer);
})();

export const initRubyVM = async () => {
  return DefaultRubyVM(await rubyModule);
};
