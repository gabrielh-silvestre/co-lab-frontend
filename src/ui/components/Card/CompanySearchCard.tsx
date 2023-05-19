import { Box, BoxProps, Heading, Image } from '@chakra-ui/react';

type CompanySearchCardProps = {
  name: string;
  rating: number;
  image: string | null;
} & BoxProps;

export function CompanySearchCard({
  name,
  image,
  rating,
  ...boxProps
}: CompanySearchCardProps) {
  return (
    <Box
      {...boxProps}
      className={`grid grid-cols-3 justify-items-center items-center my-4 ${
        boxProps.className ?? ''
      }`}
    >
      <Box>
        <Image
          boxSize={188}
          objectFit="contain"
          src={image ?? '#'}
          alt={`Imagem da empresa ${name}`}
          fallbackSrc="https://via.placeholder.com/188"
        />
      </Box>

      <Box>
        <Heading as="h4">{name}</Heading>
      </Box>

      <Box className="text-xl font-bold text-primary">
        <p>{rating} / 10</p>
      </Box>
    </Box>
  );
}
