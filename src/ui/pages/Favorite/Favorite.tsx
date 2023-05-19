import { Box, Heading } from '@chakra-ui/react';
import { FavoriteCompanyCard } from '@components/Card/FavoriteCompanyCard';

export function Favorite() {
  return (
    <>
      <Box className="flex justify-center items-center my-8">
        <Heading as="h2">Favoritos</Heading>
      </Box>

      <Box>
        <FavoriteCompanyCard name="Empresa 1" image="#" />
        <FavoriteCompanyCard name="Empresa 2" image="#" />
        <FavoriteCompanyCard name="Empresa 3" image="#" />
      </Box>
    </>
  );
}
