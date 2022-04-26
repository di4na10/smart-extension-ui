import http from '@/http-common'

class WriteWhitelistData {
  getAll() {
    return http.get('/write_whitelist')
  }

  get(ip_src, ip_dst) {
    return http.get(`/write_whitelist/${ip_src}/${ip_dst}`)
  }

  create(data) {
    return http.post('/write_whitelist', data)
  }

  update(ip_src, ip_dst, data) {
    return http.put(`/write_whitelist/${ip_src}/${ip_dst}`, data)
  }

  delete(ip_src, ip_dst) {
    return http.delete(`/write_whitelist/${ip_src}/${ip_dst}`)
  }

  deleteAll() {
    return http.delete(`/write_whitelist`)
  }
}

export default new WriteWhitelistData()
