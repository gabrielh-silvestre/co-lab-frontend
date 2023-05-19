import { WORKER } from '@mocks/worker';
import { WorkerControllerAbs } from '@worker/domain/controller';
import { WorkerController } from '@worker/infra/controller';
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

describe('[Integration] Tests for WorkerController', () => {
  let controller: WorkerControllerAbs;

  let axiosMock: MockAdapter;

  let spyRequest: SpyInstance;

  beforeEach(() => {
    vi.useFakeTimers();

    const workerModel = new WorkerModel('http://localhost:3000');

    axiosMock = new MockAdapter(workerModel.client);
    spyRequest = vi.spyOn(workerModel.client, 'request');

    controller = new WorkerController(workerModel);
  });

  afterEach(() => {
    axiosMock.restore();
    spyRequest.mockRestore();

    vi.useRealTimers();
  });

  it('should create a WorkerController', () => {
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(WorkerController);
  });

  it('should get worker by id', async () => {
    axiosMock.onGet('/workers/1').reply(200, WORKER);

    const result = await controller.getById({ id: '1' });

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(WORKER);
  });

  it('should allow response to be transformed', async () => {
    axiosMock.onGet('/workers/1').reply(200, WORKER);

    const result = await controller.getById({ id: '1' }, (worker) => ({
      id: worker.id,
      name: worker.name
    }));

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      id: WORKER.id,
      name: WORKER.name
    });
  });
});
