import logo from '@assets/logo-signin.svg';
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
import { useUserStore } from '@stores/userStore';
import * as Joi from 'joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import type { SignInFormInput } from '.';

export type SignInProps = {
  authController: AuthController;
  schema: Joi.ObjectSchema;
};

export function SignIn({ authController, schema }: SignInProps) {
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
    const { session } = await authController.signIn({ email, password });
    setToken(session?.access_token);

    navigate('/');
  };

  return (
    <Container className="h-screen flex flex-col justify-center content-center bg-primary">
      <Box className="sm:max-w-sm mb-8">
        <img className="w-full" src={logo} alt="logo" />
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
                _focus={{ borderColor: 'backgorund' }}
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
                _focus={{ borderColor: 'backgorund' }}
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
                bgColor="background"
                color="primary"
                spinnerPlacement="start"
                fontWeight="bold"
                rounded="full"
                px="12"
              >
                Entrar
              </Button>
            </Box>
          </FormControl>
        </form>
      </div>

      <Box className="flex justify-center mt-8 text-backgorund">
        <p>Nova por aqui?</p>
        <Link className="ml-2 underline" to="/sign-up">
          Cadastre-se
        </Link>
      </Box>
    </Container>
  );
}
