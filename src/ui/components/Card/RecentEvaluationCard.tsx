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
    <Box className="w-full !grid grid-cols-2" {...boxProps}>
      <Image boxSize="128px" src={asideComments} />

      <Image
        boxSize="128px"
        objectFit="cover"
        src={image}
        alt={`Imagem de perfil ${name}`}
        fallbackSrc="https://via.placeholder.com/128"
        className="my-3"
      />
    </Box>
  );
}
