/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosClient, DataOptions } from '@coaktion/client-core';
import type { AxiosResponse } from 'axios';

export class CustomAxiosClient extends AxiosClient {
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
      await this.authentication();
    }

    return this.client.request({
      method: methodName,
      url: endpoint,
      data: dataOptions?.data,
      params: dataOptions?.params,
      headers: {
        ...headers,
        'x-api-key': import.meta.env.VITE_API_KEY
      }
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
