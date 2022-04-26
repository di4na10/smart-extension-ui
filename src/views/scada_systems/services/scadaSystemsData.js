import http from '@/http-common'

class ScadaSystemsData {
  getAll() {
    return http.get('/scada_systems')
  }

  get(name) {
    return http.get(`/scada_systems/${name}`)
  }

  create(data) {
    return http.post('/scada_systems', data)
  }

  update(name, data) {
    return http.put(`/scada_systems/${name}`, data)
  }

  delete(name) {
    return http.delete(`/scada_systems/${name}`)
  }

  deleteAll() {
    return http.delete(`/scada_systems`)
  }
}

export default new ScadaSystemsData()
