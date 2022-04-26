import http from '@/http-common'

class ReadWhitelistData {
  getAll() {
    return http.get('/read_whitelist')
  }

  get(ip_src, ip_dst) {
    return http.get(`/read_whitelist/${ip_src}/${ip_dst}`)
  }

  create(data) {
    return http.post('/read_whitelist', data)
  }

  update(ip_src, ip_dst, data) {
    return http.put(`/read_whitelist/${ip_src}/${ip_dst}`, data)
  }

  delete(ip_src, ip_dst) {
    return http.delete(`/read_whitelist/${ip_src}/${ip_dst}`)
  }

  deleteAll() {
    return http.delete(`/read_whitelist`)
  }
}

export default new ReadWhitelistData()
