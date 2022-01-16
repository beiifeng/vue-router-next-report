import { inject, warn } from 'vue';
import { qiankunKey } from './injectionSymbols';

/**
 *
 * @returns {{
 *    registerStateChangeHandler: (name: string, callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void;
 *    unregisterStateChangeHandler: (name: string) => void
 *    emmitGlobalStateChange: (state: Record<string, any>) => boolean;
 *    isMicro: boolean,
 * }}
 * @typedef {(state: Record<string, any>, prevState: Record<string, any>) => void} OnGlobalStateChangeCallback
 */
export function useQiankun() {
  return inject(qiankunKey, {
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
    isMicro: false,
  });
}
