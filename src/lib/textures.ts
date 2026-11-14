import type { DemoFields } from "@/lib/demo";
import { possibleNewWater, ambiguousWater } from "@/lib/interpret";
import type { LayerId } from "@/state/store";

const PX = 512;

function cellCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  return [c, c.getContext("2d")!];
}

function upscale(src: HTMLCanvasElement, smooth: boolean): HTMLCanvasElement {
  const out = document.createElement("canvas");
  out.width = PX;
  out.height = PX;
  const ctx = out.getContext("2d")!;
  ctx.imageSmoothingEnabled = smooth;
  ctx.drawImage(src, 0, 0, PX, PX);
  return out;
}

/** Simulated backscatter: dark water, bright land, speckled invalidity. */
export function observationCanvas(f: DemoFields, which: "A" | "B"): HTMLCanvasElement {
  const [c, ctx] = cellCanvas(f.size);
  const img = ctx.createImageData(f.size, f.size);
  for (let i = 0; i < f.size * f.size; i++) {
    const water = which === "A" ? f.reference[i] : f.episode[i] || f.reference[i];
    let v = 150 + f.height[i] * 70;
    if (water === 1) v = 42 + f.height[i] * 18;
    if (f.invalid[i] === 1) v = 110 + ((i * 2654435761) % 97);
    const o = i * 4;
    img.data[o] = v;
    img.data[o + 1] = v;
    img.data[o + 2] = v;
    img.data[o + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return upscale(c, true);
}

/** Thematic layer: color + hatch + outline; color is never the only code. */
export function overlayCanvas(
  f: DemoFields,
  visible: Record<LayerId, boolean>,
): HTMLCanvasElement {
  const nw = possibleNewWater(f);
  const amb = ambiguousWater(f);
  const [c, ctx] = cellCanvas(f.size);
  const img = ctx.createImageData(f.size, f.size);
  const at = (x: number, y: number) => y * f.size + x;
  for (let y = 0; y < f.size; y++) {
    for (let x = 0; x < f.size; x++) {
      const i = at(x, y);
      const o = i * 4;
      const hatch = (x + y) % 4 < 2;
      if (visible.exclusion && f.invalid[i] === 1) {
        img.data[o] = 107; img.data[o + 1] = 114; img.data[o + 2] = 128;
        img.data[o + 3] = hatch ? 210 : 70;
      } else if (visible.newwater && nw[i] === 1) {
        const edge =
          x === 0 || y === 0 || x === f.size - 1 || y === f.size - 1 ||
          nw[at(x - 1, y)] === 0 || nw[at(x + 1, y)] === 0 ||
          nw[at(x, y - 1)] === 0 || nw[at(x, y + 1)] === 0;
        if (edge) {
          img.data[o] = 6; img.data[o + 1] = 74; img.data[o + 2] = 82; img.data[o + 3] = 255;
        } else {
          img.data[o] = 14; img.data[o + 1] = 143; img.data[o + 2] = 154; img.data[o + 3] = 235;
        }
      } else if (visible.ambiguous && amb[i] === 1) {
        img.data[o] = 160; img.data[o + 1] = 106; img.data[o + 2] = 0;
        img.data[o + 3] = hatch ? 200 : 60;
      } else if (visible.reference && f.reference[i] === 1) {
        img.data[o] = 31; img.data[o + 1] = 95; img.data[o + 2] = 166; img.data[o + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return upscale(c, false);
}

/** 2D plate prepared for the cover (no 3D load). */
export function previewDataUrl(f: DemoFields): string {
  const base = observationCanvas(f, "B");
  const over = overlayCanvas(f, { reference: true, newwater: true, ambiguous: true, exclusion: true });
  const ctx = base.getContext("2d")!;
  ctx.drawImage(over, 0, 0);
  return base.toDataURL("image/png");
}