import http from '@/http-common'

class PlcPacketsData {
  getAll() {
    return http.get('/plc_packets')
  }

  get(plc_name) {
    return http.get(`/plc_packets/${plc_name}`)
  }

  create(data) {
    return http.post('/plc_packets', data)
  }

  update(plc_name, data) {
    return http.put(`/plc_packets/${plc_name}`, data)
  }

  delete(plc_name) {
    return http.delete(`/plc_packets/${plc_name}`)
  }

  deleteAll() {
    return http.delete(`/plc_packets`)
  }
}

export default new PlcPacketsData()
