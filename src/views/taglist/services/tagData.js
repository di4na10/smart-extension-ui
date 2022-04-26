import http from '@/http-common'

class TagData {
  getAll() {
    return http.get('/tag')
  }

  get(name, plc_name) {
    return http.get(`/tag/${name}/${plc_name}`)
  }

  create(data) {
    return http.post('/tag', data)
  }

  update(name, plc_name, data) {
    return http.put(`/tag/${name}/${plc_name}`, data)
  }

  delete(name, plc_name) {
    return http.delete(`/tag/${name}/${plc_name}`)
  }

  deleteAll() {
    return http.delete(`/tag`)
  }
}

export default new TagData()
