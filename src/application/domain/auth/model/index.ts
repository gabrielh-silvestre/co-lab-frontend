export interface IAuthModel<T = unknown> {
  signIn(email: string, password: string): Promise<T | never>;
  signUp(email: string, password: string): Promise<T | never>;
}
