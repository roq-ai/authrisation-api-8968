import axios from 'axios';
import queryString from 'query-string';
import { PasswordManagementInterface, PasswordManagementGetQueryInterface } from 'interfaces/password-management';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPasswordManagements = async (
  query?: PasswordManagementGetQueryInterface,
): Promise<PaginatedInterface<PasswordManagementInterface>> => {
  const response = await axios.get('/api/password-managements', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPasswordManagement = async (passwordManagement: PasswordManagementInterface) => {
  const response = await axios.post('/api/password-managements', passwordManagement);
  return response.data;
};

export const updatePasswordManagementById = async (id: string, passwordManagement: PasswordManagementInterface) => {
  const response = await axios.put(`/api/password-managements/${id}`, passwordManagement);
  return response.data;
};

export const getPasswordManagementById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/password-managements/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePasswordManagementById = async (id: string) => {
  const response = await axios.delete(`/api/password-managements/${id}`);
  return response.data;
};
