import logo from '@assets/logo-home.svg';
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import type { ICompany } from '@company/domain/model';
import { CompanyController } from '@company/infra/controller';
import { CompanyRankingCard } from '@components/Card/CompanyRankingCard';
import { RecentEvaluationCard } from '@components/Card/RecentEvaluationCard';
import { Carousel } from '@components/Carousel/Carousel';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

type HomeProps = {
  companyController: CompanyController;
};

export function Home({ companyController }: HomeProps) {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffectOnce(() => {
    getCompaniesOnRanking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const getCompaniesOnRanking = async () => {
    // TODO: implement endpoint to get companies on ranking
    // change .getAll() to .getOnRanking(n) when endpoint is ready
    const companies = await companyController.getAll();

    if (companies.length > 3) setCompanies(companies.slice(0, 3));
    else setCompanies(companies);
  };

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
          {companies.map((c) => (
            <CompanyRankingCard
              key={c.id}
              image={c.image ?? '#'}
              name={c.name}
            />
          ))}
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
