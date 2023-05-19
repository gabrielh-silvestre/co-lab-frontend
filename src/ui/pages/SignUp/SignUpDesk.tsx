import logo from '@assets/desk-signup-illustration.svg';
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
import { HeaderDesk } from '@components/Header/HeaderDesk';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignInFormInput } from '@pages/SignIn';
import { useUserStore } from '@stores/userStore';
import * as Joi from 'joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type SignInProps = {
  authController: AuthController;
  schema: Joi.ObjectSchema;
};

export function SignUpDesk({ authController, schema }: SignInProps) {
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
    <>
      <HeaderDesk location="sign" />

      <Box className="px-48 h-screen flex flex-col justify-center content-center bg-backgorund">
        <Box className="mb-8 text-4xl font-bold text-primary grid grid-cols-2 justify-items-center items-center">
          <h1>Faça parte desse movimento:</h1>

          <Image
            boxSize={300}
            objectFit="cover"
            src={logo}
            alt="logo"
            fallbackSrc="https://via.placeholder.com/300"
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
      </Box>
    </>
  );
}
