import { PROJECT_TYPE } from '@global/common/src/config/global';

/** 项目类型 */
export { PROJECT_TYPE };
/** Menu上方标题 */
export const SIDER_TITLE = 'DEMO';
/** 登录页输入框上的标题 */
export const LOGIN_TITLE = 'DEMO';

/** 登录地址 */
export const LOGIN_URL = [
  '/member/login-v1',
  '/member/login-v2',
  '/member/login-v3',
];

/** 样式前缀 */
export const ANT_PREFIX = 'antdv';
/** 默认登录地址 */
export const DEFAULT_LOGIN_URL = LOGIN_URL[0];
/** 默认退出地址 */
export const DEFAULT_LOGOUT_URL = DEFAULT_LOGIN_URL + '?logout=1';
/** 默认首页 */
export const DEFAULT_HOME_PAGE = '/home';
