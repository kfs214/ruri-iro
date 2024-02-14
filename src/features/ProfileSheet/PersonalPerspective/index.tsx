import React from 'react';

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
  const answerLines = answer.trim().split(/\r?\n/);

  return (
    <Box>
      <Typography variant="h5">{questionLabel}</Typography>
      <Typography variant="body1" whiteSpace="pre-line">
        {answerLines.map((answerLine, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            {answerLine}
            <br />
          </React.Fragment>
        ))}
      </Typography>
    </Box>
  );
}

export function PersonalPerspective() {
  const { getShownPairs } = usePersonalPerspectiveStore();

  return (
    <Box display="grid" gridTemplateColumns="minmax(0,1fr)" gap={1}>
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
