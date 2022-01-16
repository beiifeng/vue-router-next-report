export const hasSymbol =
  typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

/**
 * PolySymbol
 * @param {string} name 名称
 * @returns symbol | string
 */
export const PolySymbol = (name) =>
  hasSymbol ? Symbol(name) : 'qiankun:' + name;

export const qiankunKey = PolySymbol('qiankunKey');
