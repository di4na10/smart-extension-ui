import http from '@/http-common'

class IpblacklistData {
  getAll() {
    return http.get('/ip_blacklist')
  }

  get(IP) {
    return http.get(`/ip_blacklist/${IP}`)
  }

  create(data) {
    return http.post('/ip_blacklist', data)
  }

  update(IP, data) {
    return http.put(`/ip_blacklist/${IP}`, data)
  }

  delete(IP) {
    return http.delete(`/ip_blacklist/${IP}`)
  }

  deleteAll() {
    return http.delete(`/ip_blacklist`)
  }
}

export default new IpblacklistData()
