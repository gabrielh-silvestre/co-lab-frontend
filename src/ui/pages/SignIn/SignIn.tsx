import { AuthController } from '@auth/infra/controller';
import {
  AspectRatio,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link
} from '@chakra-ui/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { User } from '@supabase/supabase-js';
import * as Joi from 'joi';
import { SubmitHandler, useForm } from 'react-hook-form';

import logo from '../../../assets/logo.png';

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
    <Container className="h-screen flex flex-col justify-center content-center bg-backgorund">
      <AspectRatio>
        <img src={logo} alt="logo" />
      </AspectRatio>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email || !!errors.password}>
            <FormLabel htmlFor="email">
              <Input
                id="email"
                placeholder="Email"
                variant="filled"
                _focus={{ color: 'secondary' }}
                {...register('email', { required: true })}
              />

              <FormErrorMessage>
                {errors.email ? errors.email.message : null}
              </FormErrorMessage>
            </FormLabel>

            <FormLabel htmlFor="password">
              <Input
                id="password"
                placeholder="Password"
                type="password"
                variant="filled"
                _focus={{ color: 'secondary' }}
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
                color="detail"
                spinnerPlacement="start"
                fontWeight="bold"
              >
                Entrar
              </Button>
            </Box>
          </FormControl>
        </form>
      </div>

      <Box className="mt-8 text-secondary">
        <p>Don't have an account?</p>
        <Link color="teal.100">Sign up</Link>
      </Box>
    </Container>
  );
}
