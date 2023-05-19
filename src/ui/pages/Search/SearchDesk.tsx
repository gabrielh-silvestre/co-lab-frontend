import { Box, Heading } from '@chakra-ui/react';
import type { CompanyControllerAbs } from '@company/domain/controller';
import type { ICompany } from '@company/domain/model';
import { CompanySearchCard } from '@components/Card/CompanySearchCard';
import { HeaderDesk } from '@components/Header/HeaderDesk';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchDeskProps = {
  companyController: CompanyControllerAbs;
};

export function SearchDesk({ companyController }: SearchDeskProps) {
  const [searchParams] = useSearchParams();

  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchTerm] = useState<string>(() => searchParams.get('name') ?? '');

  useEffectOnce(() => {
    const searchCompanies = async () => {
      if (searchTerm !== '') {
        const foundCompanies = await companyController.getByName({
          name: searchTerm,
          page: 1
        });
        console.log('foundCompanies', foundCompanies)

        setCompanies(foundCompanies);
        return;
      }

      const foundCompanies = await companyController.getAll();
      setCompanies(foundCompanies);
    };

    searchCompanies();
  });

  return (
    <>
      <HeaderDesk location="companies" />

      <Box
        as="main"
        className="flex flex-col justify-center items-center my-16 px-36"
      >
        <Box>
          {searchTerm === '' ? (
            <Heading as="h3">Empresas</Heading>
          ) : (
            <Heading as="h3">Pesquisa por: "{searchTerm}"</Heading>
          )}
        </Box>

        <Box className="w-full mt-8">
          {companies.length === 0
            ? null
            : companies.map((c) => (
                <CompanySearchCard
                  key={c.id}
                  name={c.name}
                  rating={c.rating}
                  image={c.image}
                />
              ))}
        </Box>
      </Box>
    </>
  );
}
