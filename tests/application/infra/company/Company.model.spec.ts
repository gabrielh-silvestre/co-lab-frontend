import type { ICompanyModel } from '@company/domain/model';
import { CompanyModel } from '@company/infra/model';
import { COMPANY } from '@mocks/company';
import { CustomAxiosClient } from '@shared/infra/client-core/CustomAxios.client-core';
import MockAdapter from 'axios-mock-adapter';
import { SpyInstance, beforeEach, describe, expect, it, vi } from 'vitest';

describe('[Unit] Tests for CompanyModel', () => {
  let model: ICompanyModel;

  let axiosMock: MockAdapter;

  let spyMakeRequest: SpyInstance;

  beforeEach(() => {
    vi.useFakeTimers();

    const companyModel = new CompanyModel('http://localhost:3000');

    model = companyModel;
    axiosMock = new MockAdapter(companyModel.client);

    spyMakeRequest = vi.spyOn(CustomAxiosClient.prototype, 'makeRequest');
  });

  it('should create a CompanyModel', () => {
    expect(model).toBeDefined();
    expect(model).toBeInstanceOf(CompanyModel);
  });

  it('should get all companies', async () => {
    axiosMock.onGet('/companies/search').reply(200, [COMPANY]);

    const result = await model.getAll();

    expect(spyMakeRequest).toHaveBeenCalled();
    expect(spyMakeRequest).toHaveBeenCalledWith(
      'GET',
      '/companies/search',
      expect.anything() // Needed to avoid comparing the params object, which is a workaround
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result).toEqual([COMPANY]);
  });

  it('should get company by id', async () => {
    axiosMock.onGet('/companies/1').reply(200, COMPANY);

    const result = await model.getById('1');

    expect(spyMakeRequest).toHaveBeenCalled();
    expect(spyMakeRequest).toHaveBeenCalledWith('GET', '/companies/1');

    expect(result).not.toBeNull();
    expect(result).toEqual(COMPANY);
  });

  it('should get company by name', async () => {
    axiosMock.onGet('/companies/search').reply(200, [COMPANY]);

    const result = await model.search({
      field: 'name',
      value: 'company',
      page: 1
    });

    expect(spyMakeRequest).toHaveBeenCalled();
    expect(spyMakeRequest).toHaveBeenCalledWith('GET', '/companies/search', {
      params: { field: 'name', value: 'company', page: 1 }
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result).toEqual([COMPANY]);
  });

  it('should create a company', async () => {
    axiosMock.onPost('/companies/create').reply(200, COMPANY);

    const result = await model.create({
      name: 'company',
      description: 'description'
    });

    expect(spyMakeRequest).toHaveBeenCalled();
    expect(spyMakeRequest).toHaveBeenCalledWith('POST', '/companies/create', {
      data: { name: 'company', description: 'description' }
    });

    expect(result).not.toBeNull();
    expect(result).toEqual(COMPANY);
  });

  it('should add an evaluation to a company', async () => {
    axiosMock.onPatch().reply(200, {});

    await model.addEvaluation('1', {
      comment: 'comment',
      categories: [{ name: 'category', rating: 3 }]
    });

    expect(spyMakeRequest).toHaveBeenCalled();
    expect(spyMakeRequest).toHaveBeenCalledWith(
      'PATCH',
      '/companies/1/add-evaluation',
      {
        data: {
          comment: 'comment',
          categories: [{ name: 'category', rating: 3 }]
        }
      },
      {}
    );
  });
});
