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
        objectFit="contain"
        src={image}
        alt={`Imagem de perfil ${name}`}
        fallbackSrc="https://via.placeholder.com/110"
        className="my-3 w-[50px] h-[50px] md:w-[110px] md:h-[110px] md:mx-4"
      />

      <p className="text-primary">{name}</p>
    </Box>
  );
}
