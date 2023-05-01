import { AuthApiKey, AxiosClient, DataOptions } from '@coaktion/client-core';
import type { ClientOptionsAxios } from '@coaktion/client-core/dist/types';
import type { AxiosResponse } from 'axios';

export class CustomAxiosClient extends AxiosClient {
  constructor(clientOptions: Omit<ClientOptionsAxios, 'authProvider'>) {
    super({
      ...clientOptions,
      authProvider: new AuthApiKey({
        headerKey: 'apiKey',
        apiKey: '$2b$10$68Qj.iAg.XsJ8ek4ALS1WuTHjzyAWHj.YFwwzW0eKASNg7PVtMgQq'
      }),
      forceAuth: true
    });
  }

  async makeRequest<T = unknown>(
    methodName: string,
    endpoint: string,
    dataOptions?: DataOptions | undefined,
    headers?: object | undefined
  ): Promise<AxiosResponse<T, unknown>> {
    if (this.clientOptions.forceAuth || this.retryAuth) {
      await super.authentication();
    }

    return this.client.request({
      method: methodName,
      url: endpoint,
      data: dataOptions?.data,
      params: {
        ...dataOptions?.params,
        ...this.auth,
      },
      headers
    });
  }
}
