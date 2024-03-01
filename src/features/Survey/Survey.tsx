import { useEffect, useRef } from 'react';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import { useSurvey } from './useSurvey';

export function Survey() {
  const surveyRef = useRef<HTMLParagraphElement>(null);
  const { setSurveyRef } = useSurvey();

  useEffect(() => {
    setSurveyRef(surveyRef);

    return () => {
      setSurveyRef(undefined);
    };
  }, [setSurveyRef]);

  return (
    <Box sx={{ color: 'rgba(0, 0, 0, 0.7)' }}>
      <Typography ref={surveyRef}>
        いかがでしたか？お困りごとはありませんか？
      </Typography>
      <Typography>よろしければ5分程度のアンケートにご協力ください</Typography>
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSd6ChVKkE6XWLKNpB6eLrrNQgxtw6Ppv75dUz_l4x-E-RnFTg/viewform?usp=sf_link"
      >
        Google Formsで回答する
      </Link>
    </Box>
  );
}
