import logo from '@assets/logo-home.svg';
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import type { CompanyControllerAbs } from '@company/domain/controller';
import type { ICompany } from '@company/domain/model';
import { CompanyRankingCard } from '@components/Card/CompanyRankingCard';
import { RecentEvaluationCard } from '@components/Card/RecentEvaluationCard';
import { Carousel } from '@components/Carousel/Carousel';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

type HomeProps = {
  companyController: CompanyControllerAbs;
};

export function Home({ companyController }: HomeProps) {
  const [lastRelates, setLastRelates] = useState<ICompany[]>([]);

  useEffectOnce(() => {
    const getLastRelates = async () => {
      const companies = await companyController.getLatestEvaluated({ size: 3 });
      setLastRelates(companies);
    };

    getLastRelates();
  });

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
          {lastRelates.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <CompanyRankingCard name={`Empresa ${i}`} image="#" />
              ))
            : lastRelates
                .reverse()
                .map((c) => (
                  <CompanyRankingCard
                    name={c.name}
                    image={c.image ?? '#'}
                    key={c.id}
                  />
                ))}
        </Box>
      </Box>

      <Box className="my-12">
        <Heading as="h3" className="mb-6">
          Depoimentos Recentes
        </Heading>

        <Carousel className="mx-14">
          {lastRelates.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <RecentEvaluationCard image="#" name={`Empresa ${i}`} />
              ))
            : lastRelates.map((c) => (
                <RecentEvaluationCard
                  image={c.image ?? '#'}
                  name={c.name}
                  key={c.id}
                />
              ))}
        </Carousel>
      </Box>
    </>
  );
}
