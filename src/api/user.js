import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Login/UserLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/User/GetMenu',
    method: 'post'
  })
}
