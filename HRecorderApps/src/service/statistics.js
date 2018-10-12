import request from '../utils/request';
import { service } from '../utils/config';

export async function statistics(params) {
  return request(`${service.server}frontend/cloudstatistics/statistics/list-statistics-data`, {
    method: 'GET',
    data: params,
  });
}
