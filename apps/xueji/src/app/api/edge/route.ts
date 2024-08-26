import type * as addWasmModule from "@/wasm/wasm";
// @ts-ignore
import addWasm from "../../../../public/add.wasm?module";

const module$ = WebAssembly.instantiate(addWasm);

export async function GET() {
  const instance = (await module$) as any;
  const exports = instance.exports as typeof addWasmModule;
  const { add_one: addOne } = exports;
  const number = addOne(11);

  return new Response(`got: ${number}`);
}

export const runtime = "edge";
