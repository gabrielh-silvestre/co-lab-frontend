import { WORKER } from '@mocks/worker';
import { IWorkerModel } from '@worker/domain/model';
import { WorkerModel } from '@worker/infra/model';
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

describe('[Unit] Tests for WorkerModel', () => {
  let model: IWorkerModel;

  let axiosMock: MockAdapter;

  let spyMakeRequest: SpyInstance;

  beforeEach(() => {
    vi.useFakeTimers();

    const workerModel = new WorkerModel('http://localhost:3000');

    model = workerModel;
    axiosMock = new MockAdapter(workerModel.client);

    spyMakeRequest = vi.spyOn(workerModel, 'makeRequest');
  });

  afterEach(() => {
    axiosMock.restore();
    spyMakeRequest.mockRestore();

    vi.useRealTimers();
  });

  it('should create a WorkerModel', () => {
    expect(model).toBeDefined();
    expect(model).toBeInstanceOf(WorkerModel);
  });

  it('should get worker by id', async () => {
    axiosMock.onGet('/workers/1').reply(200, WORKER);

    const result = await model.getById('1');

    expect(spyMakeRequest).toHaveBeenCalledTimes(1);
    expect(spyMakeRequest).toHaveBeenCalledWith('GET', '/workers/1');

    expect(result).toStrictEqual(WORKER);
  });
});
