import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { QuestionsGroupWrapper } from '@/features/Form/QuestionsGroupWrapper';

import { SelectImage } from './SelectImage';

export function ImageGroup() {
  return (
    <QuestionsGroupWrapper groupName="画像を設定">
      <Box>
        <Typography variant="h5">プロフィール画像</Typography>
        <Box mt={1}>
          <SelectImage buttonText="画像を選択" type="profile" />
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">カバー画像</Typography>
        <Box mt={1}>
          <SelectImage buttonText="画像を選択" type="cover" />
        </Box>
      </Box>
    </QuestionsGroupWrapper>
  );
}
