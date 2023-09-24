import axios from 'axios';
import queryString from 'query-string';
import { ErrorResponseInterface, ErrorResponseGetQueryInterface } from 'interfaces/error-response';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getErrorResponses = async (
  query?: ErrorResponseGetQueryInterface,
): Promise<PaginatedInterface<ErrorResponseInterface>> => {
  const response = await axios.get('/api/error-responses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createErrorResponse = async (errorResponse: ErrorResponseInterface) => {
  const response = await axios.post('/api/error-responses', errorResponse);
  return response.data;
};

export const updateErrorResponseById = async (id: string, errorResponse: ErrorResponseInterface) => {
  const response = await axios.put(`/api/error-responses/${id}`, errorResponse);
  return response.data;
};

export const getErrorResponseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/error-responses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteErrorResponseById = async (id: string) => {
  const response = await axios.delete(`/api/error-responses/${id}`);
  return response.data;
};
