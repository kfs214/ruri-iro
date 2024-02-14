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
        pt={coverImage ? 14 : 2}
        px={2}
        minHeight={coverImage && '180px'}
        sx={{
          background: coverImage && `no-repeat top/contain url(${coverImage})`,
        }}
      >
        {profileImage && (
          <Box
            width={128}
            height={128}
            mr={1}
            overflow="hidden"
            borderRadius="50%"
            flexShrink={0}
          >
            <Image
              src={profileImage}
              width={128}
              height={128}
              alt="プロフィール画像"
              style={{ display: 'block' }}
            />
          </Box>
        )}
        <Box pt={coverImage && 10} minWidth={0}>
          <Overview />
        </Box>
      </Box>

      <Box mt={1} px={1}>
        <Name />
      </Box>
    </Box>
  );
}
