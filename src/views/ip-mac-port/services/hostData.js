import http from '@/http-common'

class HostData {
  getAll() {
    return http.get('/host')
  }

  get(mac, ip, plc_port, other_port, direction) {
    return http.get(`/host/${mac}/${ip}/${plc_port}/{$other_port}/${direction}`)
  }

  create(data) {
    return http.post('/host', data)
  }

  update(mac, ip, plc_port, other_port, direction, data) {
    return http.put(`/host/${mac}/${ip}/${plc_port}/{$other_port}/${direction}`, data)
  }

  delete(mac, ip, plc_port, other_port, direction) {
    return http.delete(`/host/${mac}/${ip}/${plc_port}/{$other_port}/${direction}`)
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
