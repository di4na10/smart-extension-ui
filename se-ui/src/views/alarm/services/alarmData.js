import http from '@/http-common'

class AlarmData {
  getAll() {
    return http.get('/alarms')
  }

  get(id) {
    return http.get(`/alarms/${id}`)
  }

  create(data) {
    return http.post('/alarms', data)
  }

  update(id, data) {
    return http.put(`/alarms/${id}`, data)
  }

  delete(id) {
    return http.delete(`/alarms/${id}`)
  }

  deleteAll() {
    return http.delete(`/alarms`)
  }

  /*
  findByTitle(title) {
    return http.get(`/host?title=${title}`)
  }
  */
}

export default new AlarmData()
