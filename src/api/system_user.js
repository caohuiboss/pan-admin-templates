import request from '@/utils/request'

// User/SelectUser
export function SelectUser(data) {
  return request({
    url: '/User/SelectUser',
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
