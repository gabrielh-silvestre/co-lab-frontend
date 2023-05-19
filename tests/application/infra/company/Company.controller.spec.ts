import { CompanyControllerAbs } from '@company/domain/controller';
import { CompanyController } from '@company/infra/controller';
import { CompanyModel } from '@company/infra/model';
import { COMPANY } from '@mocks/company';
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

describe('[Integration] Tests for CompanyController', () => {
  let controller: CompanyControllerAbs;

  let axiosMock: MockAdapter;

  let spyRequest: SpyInstance;

  beforeEach(() => {
    vi.useFakeTimers();

    const companyModel = new CompanyModel('http://localhost:3000');

    axiosMock = new MockAdapter(companyModel.client);
    spyRequest = vi.spyOn(companyModel.client, 'request');

    controller = new CompanyController(companyModel);
  });

  afterEach(() => {
    axiosMock.restore();
    spyRequest.mockRestore();

    vi.useRealTimers();
  });

  it('should create a CompanyController', () => {
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(CompanyController);
  });

  it('should get all companies', async () => {
    axiosMock.onGet('/companies/search').reply(200, [COMPANY]);

    const result = await controller.getAll();

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual([COMPANY]);
  });

  it('should get company by id', async () => {
    axiosMock.onGet('/companies/1').reply(200, COMPANY);

    const result = await controller.getById({ id: '1' });

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(COMPANY);
  });

  it('should get company by name', async () => {
    axiosMock.onGet('/companies/search').reply(200, [COMPANY]);

    const result = await controller.getByName({ name: 'company' });

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual([COMPANY]);
  });

  it('should allow get all companies response to be transformed', async () => {
    axiosMock.onGet('/companies/search').reply(200, [COMPANY]);

    const all = await controller.getAll((companies) =>
      companies.map((c) => ({ id: c.id, name: c.name }))
    );

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(all).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String)
        })
      ])
    );
  });

  it('should allow get by id company response to be transformed', async () => {
    axiosMock.onGet('/companies/1').reply(200, COMPANY);

    const result = await controller.getById({ id: '1' }, (company) => ({
      id: company?.id,
      name: company?.name
    }));

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      id: expect.any(String),
      name: expect.any(String)
    });
  });

  it('should allow get by name companies response to be transformed', async () => {
    axiosMock.onGet('/companies/search').reply(200, [COMPANY]);

    const result = await controller.getByName(
      { name: 'company' },
      (companies) => companies.map((c) => ({ id: c.id, name: c.name }))
    );

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String)
        })
      ])
    );
  });

  it('should create a company', async () => {
    axiosMock.onPost('/companies/create').reply(201, COMPANY);

    const result = await controller.create({ name: 'company' });

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(COMPANY);
  });

  it('should allow create company response to be transformed', async () => {
    axiosMock.onPost('/companies/create').reply(201, COMPANY);

    const result = await controller.create({ name: 'company' }, (company) => ({
      id: company.id,
      name: company.name
    }));

    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual({
      id: expect.any(String),
      name: expect.any(String)
    });
  });

  it('should add an evaluation to a company', async () => {
    axiosMock.onPatch().reply(204, {});

    await controller.addEvaluation({
      categories: [],
      companyId: '1'
    });

    expect(spyRequest).toHaveBeenCalledTimes(1);
  });
});
