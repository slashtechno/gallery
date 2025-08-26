// heic-convert is ISC-licensed, according to the repo's package.json file
declare module "heic-convert" {
  import { ArrayBufferLike } from "buffer";
  interface ConversionOptions {
    buffer: ArrayBufferLike;
    format?: "JPEG" | "PNG" | string;
    quality?: number;
  }
  export default function convert(image: ConversionOptions): Promise<ArrayBuffer>;
}