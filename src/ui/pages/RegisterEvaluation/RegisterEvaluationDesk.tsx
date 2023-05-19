import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea
} from '@chakra-ui/react';
import type { CompanyControllerAbs } from '@company/domain/controller';
import type { ICompany } from '@company/domain/model';
import { HeaderDesk } from '@components/Header/HeaderDesk';
import { EvaluationSlider } from '@components/Slider/EvaluationSlider';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import type { EvaluationCategories, RegisterEvaluationFormInput } from '.';

type RegisterEvaluationDeskProps = {
  companyController: CompanyControllerAbs;
};

export function RegisterEvaluationDesk({
  companyController
}: RegisterEvaluationDeskProps) {
  const navigate = useNavigate();
  const [companyEvaluationForm, setCompanyEvaluationForm] =
    useState<RegisterEvaluationFormInput>({
      benefitsRating: 5,
      equityRating: 5,
      growthRating: 5,
      inclusionRating: 5
    } as RegisterEvaluationFormInput);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [company, setCompany] = useState<ICompany | null>(null);

  const mapCategories = (
    categoris: Omit<RegisterEvaluationFormInput, 'comment'>
  ): EvaluationCategories => {
    const keyMap = {
      inclusionRating: 'diversidade',
      benefitsRating: 'benefícios',
      growthRating: 'crescimento',
      equityRating: 'equidade'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    return Object.entries(categoris).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [keyMap[key]]: value
      }),
      {} as EvaluationCategories
    );
  };

  const handleSearchCompany = async () => {
    const [company] = await companyController.getByName({
      name: companyName,
      page: 1
    });

    setCompany(company);
  };

  const handleSubmitEvaluation = async () => {
    setIsLoading(true);

    try {
      if (company) {
        const comment = companyEvaluationForm.comment;
        delete companyEvaluationForm.comment;

        await companyController.addEvaluation({
          companyId: company?.id,
          categories: Object.entries(mapCategories(companyEvaluationForm)).map(
            ([key, value]) => ({
              name: key,
              rating: Number(value)
            })
          ),
          comment
        });
      }

      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderDesk location="contribute" />

      <Box className="grid grid-cols-2 justify-items-center items-center mx-8">
        <Box>
          <Box className="mb-12">
            <Heading as="h2">Cadastrar minha experiência</Heading>
          </Box>

          <Box>
            <FormLabel htmlFor="company-name">
              Nome da empresa
              <InputGroup>
                <InputLeftElement>
                  <FiSearch className="text-black" />
                </InputLeftElement>

                {company ? (
                  <Input
                    id="company-name"
                    rounded="full"
                    focusBorderColor="black"
                    className="text-black"
                    borderColor="primary"
                    _focus={{ borderColor: 'primary' }}
                    value={company.name}
                    isReadOnly
                    onClick={() => setCompany(null)}
                  />
                ) : (
                  <Input
                    id="company-name"
                    rounded="full"
                    focusBorderColor="black"
                    className="text-black"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchCompany();
                    }}
                  />
                )}
              </InputGroup>
            </FormLabel>

            <FormLabel htmlFor="history">
              Compartilhe sua história:
              <Textarea
                id="history"
                isDisabled={!company}
                onChange={(e) => {
                  setCompanyEvaluationForm({
                    ...companyEvaluationForm,
                    comment: e.target.value
                  });
                }}
              />
            </FormLabel>

            <Box className="my-4 flex justify-center">
              <Button
                type="submit"
                className="!bg-primary !text-white !rounded-full !px-10 !py-1"
                isLoading={isLoading}
                onClick={handleSubmitEvaluation}
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="grid grid-rows-4 gap-y-16 mt-16">
          <EvaluationSlider
            id="participation"
            label="Como você avalia a participação e presença feminina dentro desta
            empresa?"
            isDisabled={!company}
            handleChange={(inclusionRating) =>
              setCompanyEvaluationForm({
                ...companyEvaluationForm,
                inclusionRating
              })
            }
          />

          <EvaluationSlider
            id="benefits"
            label="Como você avalia a pratica dos benefícios e políticas oferecidas
            para o publico feminino?"
            isDisabled={!company}
            handleChange={(benefitsRating) =>
              setCompanyEvaluationForm({
                ...companyEvaluationForm,
                benefitsRating
              })
            }
          />

          <EvaluationSlider
            id="growth"
            label="Como você classifica as oportunidades de desenvolvimento, carreira e
            reconhecimento para o publico feminino da empresa."
            isDisabled={!company}
            handleChange={(growthRating) =>
              setCompanyEvaluationForm({
                ...companyEvaluationForm,
                growthRating
              })
            }
          />

          <EvaluationSlider
            id="safety"
            label="Você acredita que viveu uma experiência segura, respeitosa e
            igualitária nesta empresa?"
            isDisabled={!company}
            handleChange={(equityRating) =>
              setCompanyEvaluationForm({
                ...companyEvaluationForm,
                equityRating
              })
            }
          />
        </Box>
      </Box>
    </>
  );
}
