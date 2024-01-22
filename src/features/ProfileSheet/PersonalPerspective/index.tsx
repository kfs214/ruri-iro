import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { usePersonalPerspectiveStore } from '@/store';

function QuestionAnswerPair({
  questionLabel,
  answer,
}: {
  questionLabel: string;
  answer: string;
}) {
  return (
    <Box>
      <Typography variant="h5">{questionLabel}</Typography>
      <Typography variant="body1">{answer}</Typography>
    </Box>
  );
}

export function PersonalPerspective() {
  const { getShownPairs } = usePersonalPerspectiveStore();

  return (
    <Box display="grid" gridTemplateColumns="100%" gap={1}>
      {getShownPairs().map(({ questionLabel, answer }) => (
        <QuestionAnswerPair
          key={questionLabel}
          questionLabel={questionLabel}
          answer={answer}
        />
      ))}
    </Box>
  );
}
