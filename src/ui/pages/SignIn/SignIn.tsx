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
import { User } from '@supabase/supabase-js';
import * as Joi from 'joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo-signin.svg';

export type SignInProps = {
  authController: AuthController;
};

type SignInFormInput = {
  email: string;
  password: string;
};

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required()
});

export function SignIn({ authController }: SignInProps) {
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
    await authController.signIn<User>({ email, password });
    // TODO: redirect to home and pass session to context
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
