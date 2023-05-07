import type { IAuthModel } from '@auth/domain/model';
import type { IPresenter } from '@shared/domain/controller';

import type { AuthOutput } from '../model';

export type InputSignInDto = {
  email: string;
  password: string;
};

export class AuthController {
  constructor(private readonly model: IAuthModel<AuthOutput>) {}

  async signIn<T>(
    dto: InputSignInDto,
    presenter: IPresenter<AuthOutput, T> | null = null
  ): Promise<T> {
    const result = await this.model.signIn(dto.email, dto.password);
    return presenter ? presenter(result) : (result as T);
  }

  async signUp<T>(
    dto: InputSignInDto,
    presenter: IPresenter<AuthOutput, T> | null = null
  ): Promise<T> {
    const result = await this.model.signUp(dto.email, dto.password);
    return presenter ? presenter(result) : (result as T);
  }
}
