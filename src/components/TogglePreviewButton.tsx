import Button from '@mui/material/Button';

import { useDataLayer } from '@/hooks';
import { useAppStore } from '@/store';

export function TogglePreviewButton() {
  const { showPreview, setShowPreview } = useAppStore();
  const dataLayer = useDataLayer({ componentName: 'TogglePreviewButton' });

  const buttonLabel = showPreview ? 'Back' : 'Show Preview';

  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
    dataLayer.pushEvent('togglePreviewButton', {
      togglePreviewButtonLabel: buttonLabel,
    });
  };

  return (
    <Button onClick={handleTogglePreview} variant="outlined">
      {buttonLabel}
    </Button>
  );
}
