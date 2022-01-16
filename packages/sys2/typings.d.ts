import type { AxiosStatic } from 'axios';

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
    __QIANKUN_DEVELOPMENT__?: boolean;
    Zone?: CallableFunction;
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** 是否添加access-token请求头, 默认true */
    addToken?: boolean;
    /** get请求是否添加时间戳(_t), 默认true */
    addTimestamp?: boolean;
    /** 请求是否显示提示框, 默认true */
    showMessage?: boolean;
    /** 当手动取消接口调用时, 是否显示提示, 默认false */
    showCancelMessage?: boolean;
  }

  export interface AxiosInstance {
    deleteNoMessage<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    postNoMessage<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    putNoMessage<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<R>;
  }
}
