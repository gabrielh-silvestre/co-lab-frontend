import { AuthContainer } from '@auth/infra/container';
import { createClient } from '@supabase/supabase-js';
import * as Joi from 'joi';

import { SignIn } from './SignIn';
import { SignInDesk } from './SignInDesk';

export type SignInFormInput = {
  email: string;
  password: string;
};

export function MakeSignIn() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_KEY as string
  );

  const authController = AuthContainer.buildSupabase(supabase);

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required()
  });

  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  if (!isDesktop)
    return <SignIn authController={authController} schema={schema} />;
  return <SignInDesk authController={authController} schema={schema} />;
}
