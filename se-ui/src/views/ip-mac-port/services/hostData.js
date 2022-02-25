import http from '@/http-common'

class HostData {
  getAll() {
    return http.get('/host')
  }

  get(id) {
    return http.get(`/host/${id}`)
  }

  create(data) {
    return http.post('/host', data)
  }

  update(id, data) {
    return http.put(`/host/${id}`, data)
  }

  delete(id) {
    return http.delete(`/host/${id}`)
  }

  deleteAll() {
    return http.delete(`/host`)
  }

  /*
  findByTitle(title) {
    return http.get(`/host?title=${title}`)
  }
  */
}

export default new HostData()
