import { AuthSupabaseModel } from '@auth/infra/model';
import { INVALID_AUTH_RESPONSES } from '@mocks/auth';
import { SupabaseClient } from '@supabase/supabase-js';
import { SpyInstance, beforeEach, describe, expect, it, vi } from 'vitest';

describe('[Unit] Tests for AuthSupabaseModel', () => {
  let model: AuthSupabaseModel;

  let client: SupabaseClient;

  let spySignIn: SpyInstance;

  let spySignUp: SpyInstance;

  beforeEach(() => {
    vi.useFakeTimers();

    client = {
      auth: {
        signInWithPassword: vi
          .fn()
          .mockResolvedValue({ data: { user: {}, session: {} } }),
        signUp: vi.fn().mockResolvedValue({ data: { user: {}, session: {} } })
      }
    } as unknown as SupabaseClient;

    model = new AuthSupabaseModel(client);

    spySignIn = vi.spyOn(client.auth, 'signInWithPassword');
    spySignUp = vi.spyOn(client.auth, 'signUp');
  });

  it('should create a AuthSupabaseModel', () => {
    expect(model).toBeDefined();
    expect(model).toBeInstanceOf(AuthSupabaseModel);
  });

  it('should sign in with email and password', async () => {
    await model.signIn('email@email.com', 'password');

    expect(spySignIn).toHaveBeenCalledTimes(1);
  });

  it('should sign up with email and password', async () => {
    await model.signUp('email@email.com', 'password');

    expect(spySignUp).toHaveBeenCalledTimes(1);
  });

  it.each(INVALID_AUTH_RESPONSES)(
    'should throw an error when fail to sign in',
    async ({ data, error }) => {
      spySignIn.mockRejectedValueOnce({ data, error });

      const act = async () => await model.signIn('', '');

      try {
        await act();
        expect.fail('should throw an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }
  );

  it.each(INVALID_AUTH_RESPONSES)(
    'should throw an error when fail to sign up',
    async ({ data, error }) => {
      spySignUp.mockRejectedValueOnce({ data, error });

      const act = async () => await model.signUp('', '');

      try {
        await act();
        expect.fail('should throw an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }
  );
});
