import asideComments from '@assets/aside-comments.svg';
import { Box, BoxProps, Image } from '@chakra-ui/react';

type RecentEvaluationCardProps = {
  name: string;
  image: string;
} & BoxProps;

export function RecentEvaluationCard({
  image,
  name,
  ...boxProps
}: RecentEvaluationCardProps) {
  return (
    <Box
      className="w-full !grid grid-cols-2 justify-items-center"
      {...boxProps}
    >
      <Image
        src={asideComments}
        objectFit="contain"
        fallbackSrc="https://via.placeholder.com/185"
        className="my-3 w-[128px] h-[128px] md:w-[185px] md:h-[185px]"
      />

      <Image
        objectFit="contain"
        src={image}
        alt={`Imagem de perfil ${name}`}
        fallbackSrc="https://via.placeholder.com/185"
        className="my-3 w-[128px] h-[128px] md:w-[185px] md:h-[185px]"
      />
    </Box>
  );
}
