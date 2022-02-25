import http from '@/http-common'

class TagData {
  getAll() {
    return http.get('/tag')
  }

  get(id) {
    return http.get(`/tag/${id}`)
  }

  create(data) {
    return http.post('/tag', data)
  }

  update(id, data) {
    return http.put(`/tag/${id}`, data)
  }

  delete(id) {
    return http.delete(`/tag/${id}`)
  }

  deleteAll() {
    return http.delete(`/tag`)
  }

  /*
  findByTitle(title) {
    return http.get(`/host?title=${title}`)
  }
  */
}

export default new TagData()
