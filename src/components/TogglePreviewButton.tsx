import Button from '@mui/material/Button';

import { useAppStore } from '@/store';

export function TogglePreviewButton() {
  const { showPreview, setShowPreview } = useAppStore();

  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Button onClick={handleTogglePreview} variant="outlined">
      {showPreview ? 'Back' : 'Show Preview'}
    </Button>
  );
}
