import http from '@/http-common'

class NotifyWhitelistData {
  getAll() {
    return http.get('/notify_whitelist')
  }

  get(ip_src, ip_dst) {
    return http.get(`/notify_whitelist/${ip_src}/${ip_dst}`)
  }

  create(data) {
    return http.post('/notify_whitelist', data)
  }

  update(ip_src, ip_dst, data) {
    return http.put(`/notify_whitelist/${ip_src}/${ip_dst}`, data)
  }

  delete(ip_src, ip_dst) {
    return http.delete(`/notify_whitelist/${ip_src}/${ip_dst}`)
  }

  deleteAll() {
    return http.delete(`/notify_whitelist`)
  }
}

export default new NotifyWhitelistData()
