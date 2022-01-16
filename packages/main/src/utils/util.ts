import qs, { ParsedQs } from 'qs';
import type { IStringifyOptions } from 'qs';
export type WithNull<T> = T | null;

export type PointOffsetType = {
  offsetTop: number;
  offsetLeft: number;
};
/**
 * 计算传入html元素相对于body的位置
 * @param { WithNull<HTMLElement> } el html元素
 * @returns { PointOffsetType } 传入元素相对于body的offset
 */
export const getOffsetSizeFromBody = (
  el: WithNull<HTMLElement>,
): PointOffsetType => {
  let ele = el;
  let offsetTop = 0;
  let offsetLeft = 0;
  while (ele && ele.tagName !== 'BODY') {
    offsetTop += ele.offsetTop;
    offsetLeft += ele.offsetLeft;
    ele = <HTMLElement>ele.offsetParent;
  }
  return { offsetTop, offsetLeft };
};

/**
 * 将object形式的查询参数转换为字符串
 * @param  params url中的params对象
 * @param  config qs中的IStringifyOptions配置对象
 */
export function urlParamsStringify(
  params: Record<string, any>,
  options: IStringifyOptions,
): string {
  return qs.stringify(
    params,
    Object.assign({ arrayFormat: 'repeat' }, options),
  );
}

/** 判断是否预生产环境 */
export const isPreProduct = process.env.REACT_APP_ENV === 'pre';
/** 判断是否为生产环境 */
export const isProduction = process.env.NODE_ENV === 'production';

export const getPageQuery = (): ParsedQs =>
  qs.parse(window.location.search, { ignoreQueryPrefix: true });

/**
 * 构建菜单树，返回的数据与原数据是两份数据，是不完全深拷贝，即修改返回值不会影响原数据。
 * 返回值中的树形数组与Map中的数据是相同的，即修改返回数组的属性会影响到Map中的数据。
 */
export function buildTreeData(originData: Array<Record<string, any>>): {
  treeData: Array<Record<string, any>>;
  relationMap: Map<string, Record<string, any>>;
} {
  const relationMap = new Map();

  const treeData = loopTree(originData, relationMap);
  return {
    treeData,
    relationMap,
  };
}

function loopTree(
  originData: Array<Record<string, any>>,
  relationMap: Map<string, Record<string, any>>,
  parentIds: Array<string> = [],
  level = 0,
) {
  const data: Array<Record<string, any>> = [];
  const length = originData.length;
  for (let i = 0; i < length; i += 1) {
    const item = originData[i];
    const newItem = Object.assign({}, item, {
      level,
      parentIds,
    });
    if (item.children) {
      newItem.children = loopTree(
        item.children,
        relationMap,
        parentIds.concat(item.id),
        level + 1,
      );
    }
    relationMap.set(newItem.id, newItem);
    relationMap.set(buildMapKeyByPath(newItem.path), newItem);
    data.push(newItem);
  }
  return data;
}

export function buildMapKeyByPath(path: string): string {
  // mp => menu_path
  return `mp$$${path}`;
}
