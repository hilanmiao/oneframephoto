import { httpClient as http } from '../services'

const internals = {}

internals.getList = (params) => {
  return http.get('api/v1/game', params)
}

internals.getAll = () => {
  return http.get('api/v1/game/all')
}

internals.getModel = (id) => {
  return http.put(`api/v1/game/${id}`)
}

internals.postModel = (payload) => {
  return http.post('api/v1/game', payload)
}

internals.putModel = (id, payload) => {
  return http.put(`api/v1/game/${id}`, payload)
}

internals.deleteModel = (id) => {
  return http.delete(`api/v1/game/${id}`)
}

internals.deleteModels = (payload) => {
  return http.delete(`api/v1/game/deleteBatch`, payload)
}

internals.enable = (id) => {
  return http.put(`api/v1/game/${id}/enable`)
}

internals.disable = (id) => {
  return http.put(`api/v1/game/${id}/disable`)
}

export default internals
