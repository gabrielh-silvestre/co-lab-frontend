import type { IAuthModel } from '@auth/domain/model';
import { Session, SupabaseClient, User } from '@supabase/supabase-js';

export type AuthOutput = {
  user: User;
  session: Session;
};

export class AuthSupabaseModel implements IAuthModel<AuthOutput> {
  constructor(private readonly client: SupabaseClient) {}

  async signIn(email: string, password: string): Promise<AuthOutput> {
    const {
      data: { user, session },
      error
    } = await this.client.auth.signInWithPassword({ email, password });

    if (error || !user || !session) throw error;

    return { user, session };
  }

  async signUp(email: string, password: string): Promise<AuthOutput> {
    const {
      data: { user },
      error
    } = await this.client.auth.signUp({
      email,
      password
    });
    if (error || !user) throw error;

    const {
      data: { session },
      error: sessionError
    } = await this.client.auth.signInWithPassword({ email, password });
    if (sessionError || !session) throw sessionError;

    return { user, session };
  }
}
