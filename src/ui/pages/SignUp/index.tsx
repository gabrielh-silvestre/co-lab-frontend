import { AuthContainer } from "@auth/infra/container";
import { createClient } from "@supabase/supabase-js";
import { SignUp } from "./SignUp";

export function MakeSignUp() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_KEY as string
  );

  const authController = AuthContainer.buildSupabase(supabase);

  return <SignUp authController={authController} />;
}
