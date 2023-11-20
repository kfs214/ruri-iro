import * as React from 'react';

import { Form } from '@/features/Form';
import { ProfileSheet } from '@/features/ProfileSheet';

export default function HomePage() {
  return (
    <>
      <Form />
      <ProfileSheet />
    </>
  );
}
