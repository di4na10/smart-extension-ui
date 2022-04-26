import http from '@/http-common'

class HostData {
  getAll() {
    return http.get('/host')
  }

  get(mac, ip, port) {
    return http.get(`/host/${mac}/${ip}/${port}`)
  }

  create(data) {
    return http.post('/host', data)
  }

  update(mac, ip, port, data) {
    return http.put(`/host/${mac}/${ip}/${port}`, data)
  }

  delete(mac, ip, port) {
    return http.delete(`/host/${mac}/${ip}/${port}`)
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
