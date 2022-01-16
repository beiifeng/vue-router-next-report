import { IStringifyOptions } from 'qs';

/**
 * 将object形式的查询参数转换为字符串
 * @param  params url中的params对象
 * @param  config qs中的IStringifyOptions配置对象
 */
export function urlParamsStringify(
  params: any,
  options?: IStringifyOptions,
): string;

/** 判断是否预生产环境 */
export const isPreProduct: boolean;
/** 判断是否为生产环境 */
export const isProduction: boolean;
