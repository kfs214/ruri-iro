import Button from '@mui/material/Button';

import { useDataLayer } from '@/hooks';
import { useAppStore } from '@/store';

export function SwitchPreviewButton({
  variant,
}: {
  variant: 'back' | 'showPreview';
}) {
  const { setShowPreview } = useAppStore();
  const dataLayer = useDataLayer({ componentName: 'SwitchPreviewButton' });

  let buttonLabel = '';
  let buttonVariant;
  let newShowPreview: boolean;
  if (variant === 'back') {
    buttonLabel = 'Back';
    buttonVariant = 'outlined' as const;
    newShowPreview = false;
  } else if (variant === 'showPreview') {
    buttonLabel = 'Show Preview';
    buttonVariant = 'contained' as const;
    newShowPreview = true;
  } else {
    throw new Error('invalid variant');
  }

  const handleSwitchPreview = () => {
    setShowPreview(newShowPreview);
    dataLayer.pushEvent('switchPreviewButton', {
      switchPreviewButtonLabel: buttonLabel,
    });
  };

  return (
    <Button onClick={handleSwitchPreview} variant={buttonVariant}>
      {buttonLabel}
    </Button>
  );
}
