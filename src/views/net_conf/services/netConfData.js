import http from '@/http-common'

class NetConfData {
  getAll() {
    return http.get('/net_conf')
  }

  get(parameter) {
    return http.get(`/net_conf/${parameter}`)
  }

  create(data) {
    return http.post('/net_conf', data)
  }

  update(parameter, data) {
    return http.put(`/net_conf/${parameter}`, data)
  }

  delete(parameter) {
    return http.delete(`/net_conf/${parameter}`)
  }

  deleteAll() {
    return http.delete(`/net_conf`)
  }
}

export default new NetConfData()
