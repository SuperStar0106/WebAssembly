import { loadRuby } from './node_modules/ruby-wasm-emscripten';

const main = async () => {
  const args = ["--disable-gems", "-e", "puts 'Hello :)'"];
  console.log(`$ ruby.wasm ${args.join(" ")}`)
  const defaultModule = {
    locateFile: (path) => "./node_modules/ruby-wasm-emscripten/" + path,
    setStatus: (msg) => console.log(msg),
    arguments: args
  };
  await loadRuby(defaultModule);
};


main()
