import { Directive, HostBinding, input } from '@angular/core';

type Variant = 'primary' | 'danger' | 'warning' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
  secondary: 'bg-white text-gray-700 shadow-sm hover:bg-gray-50',
  ghost: 'text-gray-400 hover:bg-gray-100 hover:text-gray-600',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
};

const BASE_CLASSES = 'cursor-pointer rounded-lg font-medium disabled:opacity-50';

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective {
  variant = input<Variant>('primary');
  size = input<Size>('md');

  @HostBinding('class')
  get hostClasses(): string {
    return `${BASE_CLASSES} ${SIZE_CLASSES[this.size()]} ${VARIANT_CLASSES[this.variant()]}`;
  }
}
