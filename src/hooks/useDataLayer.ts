import { useCallback } from 'react';

declare const window: Window & { dataLayer?: Record<string, unknown>[] };

export function useDataLayer() {
  const push = useCallback((properties: Record<string, unknown>) => {
    const timer = setInterval((): void => {
      if (!window.dataLayer) return;

      window.dataLayer.push(properties);
      clearInterval(timer);
    }, 100);
  }, []);

  return { push };
}
