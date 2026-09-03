export function debounce<T extends (...args: Parameters<T>) => void | Promise<void>>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  function debounced(this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced as ((...args: Parameters<T>) => void) & { cancel: () => void };
}
