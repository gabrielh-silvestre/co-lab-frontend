import logo from '@assets/logo-home.svg';
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { CompanyRankingCard } from '@components/Card/CompanyRankingCard';
import { RecentEvaluationCard } from '@components/Card/RecentEvaluationCard';
import { Carousel } from '@components/Carousel/Carousel';
import { FiSearch } from 'react-icons/fi';

export function Home() {
  return (
    <>
      <Box className="sm:max-w-sm mb-8">
        <img className="w-full px-8" src={logo} alt="logo" />

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            id="search"
            placeholder="Pesquisar"
            rounded="full"
            _placeholder={{ textColor: 'primary', fontSize: 'sm' }}
          />
        </InputGroup>
      </Box>

      <Box className="my-12">
        <Heading as="h3" className="mb-6">
          Ranking de Empresas
        </Heading>

        <Box className="flex justify-between">
          <CompanyRankingCard image="#" name="Empresa 1" />
          <CompanyRankingCard image="#" name="Empresa 2" />
          <CompanyRankingCard image="#" name="Empresa 3" />
        </Box>
      </Box>

      <Box className="my-12">
        <Heading as="h3" className="mb-6">
          Depoimentos Recentes
        </Heading>

        <Carousel className="mx-14">
          <RecentEvaluationCard image="#" name="Empresa 1" />
          <RecentEvaluationCard image="#" name="Empresa 2" />
          <RecentEvaluationCard image="#" name="Empresa 3" />
        </Carousel>
      </Box>
    </>
  );
}
