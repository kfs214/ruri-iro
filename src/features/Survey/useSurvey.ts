import { useCallback } from 'react';

import { useSurveyStore } from '@/features/Survey/useSurveyStore';

export function useSurvey() {
  const { surveyRef, setSurveyRef } = useSurveyStore();
  const scrollSurveyIntoView = useCallback(() => {
    if (!surveyRef?.current) return;
    surveyRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [surveyRef]);

  return { setSurveyRef, scrollSurveyIntoView };
}
