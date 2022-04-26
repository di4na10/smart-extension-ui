import http from '@/http-common'

class PacketData {
  getAll() {
    return http.get('/packets')
  }

  get(id) {
    return http.get(`/packets/${id}`)
  }

  create(data) {
    return http.post('/packets', data)
  }

  update(id, data) {
    return http.put(`/packets/${id}`, data)
  }

  delete(id) {
    return http.delete(`/packets/${id}`)
  }

  deleteAll() {
    return http.delete(`/packets`)
  }
}

export default new PacketData()
