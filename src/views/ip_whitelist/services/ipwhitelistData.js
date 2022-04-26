import http from '@/http-common'

class IpwhitelistData {
  getAll() {
    return http.get('/ip_whitelist')
  }

  get(IP) {
    return http.get(`/ip_whitelist/${IP}`)
  }

  create(data) {
    return http.post('/ip_whitelist', data)
  }

  update(IP, data) {
    return http.put(`/ip_whitelist/${IP}`, data)
  }

  delete(IP) {
    return http.delete(`/ip_whitelist/${IP}`)
  }

  deleteAll() {
    return http.delete(`/ip_whitelist`)
  }
}

export default new IpwhitelistData()
