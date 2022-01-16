import { inject, warn } from 'vue';
import { qiankunKey } from './injectionSymbols';

export type OnGlobalStateChangeCallback = (
  state: Record<string, any>,
  prevState: Record<string, any>,
) => void;

export type Qiankun = {
  startQiankun?: () => void;
  registerStateChangeHandler: (
    name: string,
    callback: OnGlobalStateChangeCallback,
  ) => void;
  unregisterStateChangeHandler: (name: string) => void;
  emmitGlobalStateChange: (state: Record<string, any>) => boolean;
};

export function useQiankun(): Qiankun {
  return inject(qiankunKey, {
    startQiankun: () => {
      warn('QiankunPlugin is not install!');
    },
    registerStateChangeHandler: () => {
      warn('QiankunPlugin is not install!');
    },
    unregisterStateChangeHandler: () => {
      warn('QiankunPlugin is not install!');
    },
    emmitGlobalStateChange: () => {
      warn('QiankunPlugin is not install!');
      return false;
    },
  });
}
