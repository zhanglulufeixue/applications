import request from '../utils/request';
import { service } from '../utils/config';

export async function getVideoList(params) {
  return request(`${service.server}frontend/service/tour-course/get-tour-course-list`, {
    method: 'GET',
    data: params,
  });
}

export async function getOtherVideoList(params) {
  return request(`${service.server}frontend/service/tour-course/page-tour-course-by-uid`, {
    method: 'GET',
    data: params,
  });
}
