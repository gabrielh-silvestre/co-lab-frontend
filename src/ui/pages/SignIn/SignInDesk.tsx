import logo from '@assets/desk-signin-illustration.svg';
import { AuthController } from '@auth/infra/controller';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useUserStore } from '@stores/userStore';
import * as Joi from 'joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import type { SignInFormInput } from '.';

type SignInProps = {
  authController: AuthController;
  schema: Joi.ObjectSchema;
};

export function SignInDesk({ authController, schema }: SignInProps) {
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
    <Box className="w-full p-48 h-screen flex flex-col justify-center bg-backgorund">
      <Box className="mb-8">
        <Image
          boxSize={500}
          objectFit="contain"
          src={logo ?? '#'}
          alt="logo"
          fallbackSrc="https://via.placeholder.com/300"
          className="mx-auto"
        />
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
                className="!bg-primary opacity-60"
                _placeholder={{ textColor: 'black' }}
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
                className="!bg-primary opacity-60"
                _placeholder={{ textColor: 'black' }}
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
                bgColor="primary"
                color="Background"
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

      <Box className="flex justify-center mt-8 text-detail">
        <p>Nova por aqui?</p>
        <Link className="ml-2 underline" to="/sign-up">
          Cadastre-se
        </Link>
      </Box>
    </Box>
  );
}
