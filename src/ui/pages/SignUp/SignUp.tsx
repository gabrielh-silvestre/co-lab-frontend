import { AuthController } from '@auth/infra/controller';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignInFormInput } from '@pages/SignIn';
import { useUserStore } from '@stores/userStore';
import * as Joi from 'joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type SignUpProps = {
  authController: AuthController;
  schema: Joi.ObjectSchema;
};

export function SignUp({ authController, schema }: SignUpProps) {
  const navigate = useNavigate();
  const { setToken } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormInput>({
    resolver: joiResolver(schema),
    mode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<SignInFormInput> = async ({
    email,
    password
  }) => {
    const { session } = await authController.signUp({ email, password });
    setToken(session?.access_token);

    navigate('/');
  };

  return (
    <Container className="h-screen flex flex-col justify-center content-center bg-backgorund">
      <Box className="sm:max-w-sm mb-8 flex justify-center content-center text-4xl font-bold text-primary">
        <h1>
          Aqui a fofoca <br /> é por uma boa <br /> causa! ;)
        </h1>
      </Box>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email || !!errors.password}>
            <FormLabel htmlFor="email">
              <Input
                id="email"
                placeholder="Email"
                variant="filled"
                rounded="full"
                backgroundColor="primary"
                className="opacity-40"
                borderColor="black"
                _focus={{ borderColor: 'primary' }}
                _placeholder={{ color: 'black' }}
                {...register('email', { required: true })}
              />

              <FormErrorMessage>
                {errors.email ? errors.email.message : null}
              </FormErrorMessage>
            </FormLabel>

            <FormLabel htmlFor="password">
              <Input
                id="password"
                placeholder="Senha"
                type="password"
                variant="filled"
                rounded="full"
                backgroundColor="primary"
                className="opacity-40"
                borderColor="black"
                _focus={{ borderColor: 'primary' }}
                _placeholder={{ color: 'black' }}
                {...register('password', { required: true })}
              />

              <FormErrorMessage>
                {errors.password ? errors.password.message : null}
              </FormErrorMessage>
            </FormLabel>

            <Box className="flex justify-center mt-4">
              <Button
                type="submit"
                isLoading={isSubmitting}
                bgColor="primary"
                color="background"
                spinnerPlacement="start"
                fontWeight="bold"
                rounded="full"
                px="12"
                _loading={{ bgColor: 'primary' }}
              >
                Cadastrar
              </Button>
            </Box>
          </FormControl>
        </form>
      </div>
    </Container>
  );
}
