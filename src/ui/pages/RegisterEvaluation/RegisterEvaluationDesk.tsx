import {
  Box,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea
} from '@chakra-ui/react';
import { HeaderDesk } from '@components/Header/HeaderDesk';
import { EvaluationSlider } from '@components/Slider/EvaluationSlider';
import { FiSearch } from 'react-icons/fi';

export function RegisterEvaluationDesk() {
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

                <Input
                  id="company-name"
                  rounded="full"
                  focusBorderColor="black"
                  className="text-black"
                />
              </InputGroup>
            </FormLabel>

            <FormLabel htmlFor="history">
              Compartilhe sua história:
              <Textarea id="history" />
            </FormLabel>

            <Box className="my-4 flex justify-center">
              <button
                type="submit"
                className="bg-primary text-white rounded-full px-10 py-1"
              >
                Enviar
              </button>
            </Box>
          </Box>
        </Box>

        <Box className="grid grid-rows-4 gap-y-16 mt-16">
          <EvaluationSlider
            id="participation"
            label="Como você avalia a participação e presença feminina dentro desta
            empresa?"
          />

          <EvaluationSlider
            id="benefits"
            label="Como você avalia a pratica dos benefícios e políticas oferecidas
            para o publico feminino?"
          />

          <EvaluationSlider
            id="growth"
            label="Como você classifica as oportunidades de desenvolvimento, carreira e
            reconhecimento para o publico feminino da empresa."
          />

          <EvaluationSlider
            id="safety"
            label="Você acredita que viveu uma experiência segura, respeitosa e
            igualitária nesta empresa?"
          />
        </Box>
      </Box>
    </>
  );
}
