/* eslint-disable @typescript-eslint/no-explicit-any */
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

  private static convertPathParams(path: string, params: object): string {
    return Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      path
    );
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
        ...this.auth
      },
      headers
    });
  }

  async create(data: object): Promise<any> {
    return this.makeRequest('POST', `${this.clientOptions.endpoints.create}`, {
      data
    });
  }

  async update(id: string, data: object): Promise<any> {
    const url = CustomAxiosClient.convertPathParams(
      `${this.clientOptions.endpoints.update}`,
      { id }
    );

    return this.makeRequest('PUT', url, { data });
  }

  async fetch(id: string): Promise<any> {
    const url = CustomAxiosClient.convertPathParams(
      `${this.clientOptions.endpoints.fetch}`,
      { id }
    );

    return this.makeRequest('GET', url);
  }

  async delete(id: string): Promise<any> {
    const url = CustomAxiosClient.convertPathParams(
      `${this.clientOptions.endpoints.delete}`,
      { id }
    );

    return this.makeRequest('DELETE', url);
  }
}
