import { API_KEY_HEADER } from '@mocks/shared';
import { CustomAxiosClient } from '@shared/infra/client-core/CustomAxios.client-core';
import MockAdapter from 'axios-mock-adapter';
import {
  SpyInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

describe('[Unit] Tests for CustomAxiosClient', () => {
  let client: CustomAxiosClient;

  let mock: MockAdapter;

  let spyRequest: SpyInstance;

  beforeEach(() => {
    vi.useFakeTimers();

    client = new CustomAxiosClient({
      appName: 'test',
      baseURL: 'http://localhost:3000',
      forceAuth: false,
      endpoints: {
        search: '/search',
        fetch: '/fetch/{id}',
        create: '/create',
        update: '/update/{id}',
        delete: '/delete/{id}'
      }
    });

    mock = new MockAdapter(client.client);

    spyRequest = vi.spyOn(client.client, 'request');
  });

  afterEach(() => {
    mock.restore();

    spyRequest.mockRestore();

    vi.useRealTimers();
  });

  it('should create a CustomAxiosClient', () => {
    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(CustomAxiosClient);
  });

  it('should execute create with correct arguments', async () => {
    mock.onPost('/create').reply(200, {});

    await client.create({});

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(spyRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: '/create',
      data: {},
      params: undefined,
      headers: API_KEY_HEADER
    });
  });

  it('should execute update with correct arguments', async () => {
    mock.onPut('/update/1').reply(200, {});

    await client.update('1', {});

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(spyRequest).toHaveBeenCalledWith({
      method: 'PUT',
      url: '/update/1',
      data: {},
      params: undefined,
      headers: API_KEY_HEADER
    });
  });

  it('should execute delete with correct arguments', async () => {
    mock.onDelete('/delete/1').reply(200, {});

    await client.delete('1');

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(spyRequest).toHaveBeenCalledWith({
      method: 'DELETE',
      url: '/delete/1',
      params: undefined,
      headers: API_KEY_HEADER
    });
  });

  it('should execute fetch with correct arguments', async () => {
    mock.onGet('/fetch/1').reply(200, {});

    await client.fetch('1');

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(spyRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: '/fetch/1',
      params: undefined,
      headers: API_KEY_HEADER
    });
  });
});
