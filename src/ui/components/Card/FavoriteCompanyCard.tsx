import { Box, BoxProps, Image } from '@chakra-ui/react';

type FavoriteCompanyCardProps = {
  name: string;
  image: string;
} & BoxProps;

export function FavoriteCompanyCard({
  name,
  image,
  ...boxProps
}: FavoriteCompanyCardProps) {
  return (
    <Box className="w-full flex justify-between items-center" {...boxProps}>
      <Image
        boxSize="80px"
        objectFit="cover"
        src={image}
        alt={`Imagem de perfil ${name}`}
        fallbackSrc="https://via.placeholder.com/80"
        className="my-3"
      />

      <p className="text-primary text-lg">{name}</p>

      <Box className="h-min bg-primary rounded-full px-4 py-1 text-xs font-bold">
        SEGUINDO
      </Box>
    </Box>
  );
}
