import { useReportWebVitals } from 'next/web-vitals';

import { useDataLayer } from '@/hooks';

export function WebVitals() {
  const dataLayer = useDataLayer({ componentName: 'WebVitals' });
  useReportWebVitals((metric) => {
    dataLayer.pushEvent(metric.name, {
      webVitalsValue: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value,
      ), // values must be integers
      webVitalsEventLabel: metric.id, // id unique to current page load
      webVitalsNonInteraction: true, // avoids affecting bounce rate.
    });
  });

  return null;
}
