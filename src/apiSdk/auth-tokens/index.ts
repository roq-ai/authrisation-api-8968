import axios from 'axios';
import queryString from 'query-string';
import { AuthTokenInterface, AuthTokenGetQueryInterface } from 'interfaces/auth-token';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAuthTokens = async (
  query?: AuthTokenGetQueryInterface,
): Promise<PaginatedInterface<AuthTokenInterface>> => {
  const response = await axios.get('/api/auth-tokens', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAuthToken = async (authToken: AuthTokenInterface) => {
  const response = await axios.post('/api/auth-tokens', authToken);
  return response.data;
};

export const updateAuthTokenById = async (id: string, authToken: AuthTokenInterface) => {
  const response = await axios.put(`/api/auth-tokens/${id}`, authToken);
  return response.data;
};

export const getAuthTokenById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/auth-tokens/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAuthTokenById = async (id: string) => {
  const response = await axios.delete(`/api/auth-tokens/${id}`);
  return response.data;
};
