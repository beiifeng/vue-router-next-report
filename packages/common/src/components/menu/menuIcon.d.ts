import type { FunctionalComponent } from 'vue';

declare type IconMap = Record<string, FunctionalComponent>;

export default IconMap;

export function hasIcon(icon: string): boolean;

export function Icon(icon: string): FunctionalComponent;

export function withTheme(type: string): string;
