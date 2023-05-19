import { Box, BoxProps, Image } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';

type CompanyRankingCardProps = {
  name: string;
  image: string;
} & BoxProps;

export function CompanyRankingCard({
  name,
  image,
  ...boxProps
}: CompanyRankingCardProps) {
  return (
    <Box className="flex flex-col justify-between items-center" {...boxProps}>
      <FiStar className="text-2xl text-primary" />

      <Image
        boxSize="50px"
        objectFit="cover"
        src={image}
        alt={`Imagem de perfil ${name}`}
        fallbackSrc="https://via.placeholder.com/50"
        className="my-3"
      />

      <p className="text-primary">Empresa 1</p>
    </Box>
  );
}
