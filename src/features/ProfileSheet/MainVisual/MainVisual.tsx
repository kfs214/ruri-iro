import Box from '@mui/material/Box';
import Image from 'next/image';

import { useImageStore } from '@/store';

import { Name } from './Name';
import { Overview } from './Overview';

export function MainVisual() {
  const { coverImage, profileImage } = useImageStore();
  return (
    <Box>
      <Box
        display="flex"
        pt={coverImage && 10}
        minHeight={coverImage && '180px'}
        sx={{
          background: coverImage && `no-repeat top/contain url(${coverImage})`,
        }}
      >
        {profileImage && (
          <>
            <Box mr={1}>
              <Image
                src={profileImage}
                width={128}
                height={128}
                alt="プロフィール画像"
              />
            </Box>
            <Box pt={coverImage && 11}>
              <Overview />
            </Box>
          </>
        )}
      </Box>
      {!profileImage && <Overview />}
      <Box mt={1}>
        <Name />
      </Box>
    </Box>
  );
}
