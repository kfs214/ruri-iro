import { useEffect, useRef } from 'react';

import { Typography } from '@mui/material';
import Link from 'next/link';

import { useSurveyStore } from '@/store/useSurveyStore';

export function Survey() {
  const { setRef } = useSurveyStore();
  const surveyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setRef(surveyRef);

    return () => {
      setRef(undefined);
    };
  }, [setRef]);

  return (
    <>
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
    </>
  );
}
