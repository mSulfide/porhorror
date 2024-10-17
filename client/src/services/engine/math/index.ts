import { TPoint } from ".."

const add = (a: TPoint, b: TPoint): TPoint => ({ x: a.x + b.x, y: a.y + b.y });

const sub = (a: TPoint, b: TPoint): TPoint => ({ x: a.x - b.x, y: a.y - b.y });

const mlt = (a: TPoint, p: number): TPoint => ({ x: a.x * p, y: a.y * p })

const dot = (a: TPoint, b: TPoint): number => a.x * b.x + a.y * b.y;

const smod = (a: TPoint): number => dot(a, a);

const modl = (a: TPoint): number => Math.sqrt(smod(a));

const norm = (a: TPoint): TPoint => mlt(a, 1 / modl(a));

const zero = (): TPoint => ({ x: 0, y: 0 });

export { add, sub, mlt, dot, smod, modl, norm, zero }