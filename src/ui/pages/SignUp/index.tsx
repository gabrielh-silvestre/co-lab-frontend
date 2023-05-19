import { AuthContainer } from '@auth/infra/container';
import { createClient } from '@supabase/supabase-js';
import * as Joi from 'joi';

import { SignUp } from './SignUp';
import { SignUpDesk } from './SignUpDesk';

export function MakeSignUp() {
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
    return <SignUp authController={authController} schema={schema} />;
  return <SignUpDesk authController={authController} schema={schema} />;
}
