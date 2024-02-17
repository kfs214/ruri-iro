import { useCallback } from 'react';

declare const window: Window & { dataLayer?: Record<string, unknown>[] };

type Options = {
  componentName?: string;
};

function composeEventName(event: string, options?: Options): string {
  if (!options?.componentName) return event;

  return `${options.componentName}-${event}`;
}

export function useDataLayer(options?: Options) {
  const push = useCallback((properties: Record<string, unknown>) => {
    const timer = setInterval((): void => {
      if (!window.dataLayer) return;

      window.dataLayer.push(properties);
      clearInterval(timer);
    }, 100);
  }, []);

  const pushEvent = useCallback(
    (event: string, properties?: Record<string, unknown>) => {
      push({
        ...properties,
        event: composeEventName(event, options),
      });
    },
    [options, push],
  );

  return { pushEvent };
}
