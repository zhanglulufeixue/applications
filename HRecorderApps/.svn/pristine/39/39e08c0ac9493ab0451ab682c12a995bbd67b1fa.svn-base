import request from '../utils/request';
import { service } from '../utils/config';

const postHeader = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
});

export async function getLiveVideoList(params) {
  return request(`${service.server}frontend/cloudlive/live/page-lives`, {
    method: 'GET',
    data: params,
  });
}

export async function saveLiveRoom(params) {
  return request(`${service.server}frontend/cloudlive/live/save-live-room`, {
    method: 'POST',
    data: params,
  });
}

export async function deleteLive(params) {
  return request(`${service.server}frontend/cloudlive/live/delete-live`, {
    method: 'GET',
    data: params,
  });
}

export async function updateLive(params) {
  return request(`${service.server}frontend/cloudlive/live/update-live`, {
    method: 'POST',
    data: params,
  });
}

export async function getLiveInfo(params) {
  return request(`${service.server}frontend/cloudlive/live/get-live-info`, {
    method: 'GET',
    data: params,
  });
}

export async function getUseStatus(params) {
  return request(`${service.server}frontend/cloudlive/live/get-use-status`, {
    method: 'GET',
    data: params,
  });
}