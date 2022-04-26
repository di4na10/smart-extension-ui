import http from '@/http-common'

class PlcSystemsData {
  getAll() {
    return http.get('/plc_systems')
  }

  get(plc_name) {
    return http.get(`/plc_systems/${plc_name}`)
  }

  create(data) {
    return http.post('/plc_systems', data)
  }

  update(plc_name, data) {
    return http.put(`/plc_systems/${plc_name}`, data)
  }

  delete(plc_name) {
    return http.delete(`/plc_systems/${plc_name}`)
  }

  deleteAll() {
    return http.delete(`/plc_systems`)
  }
}

export default new PlcSystemsData()
