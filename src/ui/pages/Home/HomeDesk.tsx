import illustration from '@assets/desk-home-illustration.svg';
import {
  Box,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { CompanyRankingCard } from '@components/Card/CompanyRankingCard';
import { RecentEvaluationCard } from '@components/Card/RecentEvaluationCard';
import { Carousel } from '@components/Carousel/Carousel';
import { HeaderDesk } from '@components/Header/HeaderDesk';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export function HomeDesk() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState<string>('');

  const handleSearch = async () => {
    navigate(`/companies/search?name=${companyName}`);
  };

  return (
    <>
      <HeaderDesk />

      <Box as="main">
        <Box as="article">
          <Box
            as="section"
            className="grid grid-cols-2 justify-items-center content-center mx-12 my-24"
          >
            <Box className="flex flex-col">
              <h3 className="text-5xl mb-7 font-bold text-primary">
                Aqui a fofoca é por uma boa causa! ;)
              </h3>

              <p className="text-lg">
                Chega de passar perrengue no mercado de trabalho, amiga. A gente
                te ajuda a encontrar o lugar certo pra mandar seu currículo{' '}
                {'<3'}
              </p>
            </Box>

            <div>
              <Image
                w={340}
                h={290}
                objectFit="cover"
                src={illustration}
                alt="Ilustration"
              />
            </div>
          </Box>

          <Box as="section">
            <FormLabel htmlFor="company-name" className="px-52">
              <InputGroup className="flex justify-center">
                <InputLeftElement>
                  <FiSearch className="text-black" />
                </InputLeftElement>
                <Input
                  id="company-name"
                  type="text"
                  placeholder="Pesquisar"
                  className="!rounded-full !border-black placeholder:text-primary"
                  onChange={(e) => setCompanyName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
              </InputGroup>
            </FormLabel>
          </Box>
        </Box>

        <Box as="article" className="grid grid-cols-2 mt-14">
          <Box as="section">
            <Heading as="h4" textAlign="center">
              Ranking de Empresas
            </Heading>

            <Box className="flex justify-center items-center mt-4">
              <CompanyRankingCard name="Empresa 1" image="#" />
              <CompanyRankingCard name="Empresa 1" image="#" />
              <CompanyRankingCard name="Empresa 1" image="#" />
            </Box>
          </Box>

          <Box as="section">
            <Heading as="h4" textAlign="center">
              Depoimentos Recentes
            </Heading>

            <Carousel>
              <RecentEvaluationCard image="#" name="Empresa 1" />
              <RecentEvaluationCard image="#" name="Empresa 2" />
              <RecentEvaluationCard image="#" name="Empresa 3" />
            </Carousel>
          </Box>
        </Box>
      </Box>
    </>
  );
}
