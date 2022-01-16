export const hasSymbol =
  typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

export const PolySymbol = (name: string): symbol | string =>
  hasSymbol ? Symbol(name) : 'qiankun:' + name;

export const qiankunKey = PolySymbol('qiankunKey');
