import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea
} from '@chakra-ui/react';
import { EvaluationSlider } from '@components/Slider/EvaluationSlider';
import { FiSearch } from 'react-icons/fi';

export function RegisterEvaluation() {
  return (
    <>
      <div className="my-8">
        <Heading as="h2">Cadastrar minha experiência</Heading>
      </div>

      <form>
        <FormControl className="text-primary">
          <FormLabel htmlFor="company-name">
            Nome da empresa
            <InputGroup className="mt-1">
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

          <FormLabel htmlFor="comment" className="!text-xl">
            Compartilhe sua história:
            <Textarea />
          </FormLabel>

          <Box className="my-4 flex justify-center">
            <Button
              type="submit"
              className="py-1 !px-8 text-black"
              bgColor="primary"
              rounded="full"
              size="xs"
            >
              ENVIAR
            </Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
}
