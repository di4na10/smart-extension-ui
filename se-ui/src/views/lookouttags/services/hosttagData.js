import http from '@/http-common'

class HostTagData {
  getAll() {
    return http.get('/host_tag')
  }

  get(id) {
    return http.get(`/host_tag/${id}`)
  }

  create(data) {
    return http.post('/host_tag', data)
  }

  update(id, data) {
    return http.put(`/host_tag/${id}`, data)
  }

  delete(id) {
    return http.delete(`/host_tag/${id}`)
  }

  deleteAll() {
    return http.delete(`/host_tag`)
  }

  /*
  findByTitle(title) {
    return http.get(`/host?title=${title}`)
  }
  */
}

export default new HostTagData()
