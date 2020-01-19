import { httpClient as http } from '../services'

const internals = {}

internals.getList = (params) => {
  return http.get('api/v1/story', params)
}

internals.getAll = () => {
  return http.get('api/v1/story/all')
}

internals.getModel = (id) => {
  return http.put(`api/v1/story/${id}`)
}

internals.postModel = (payload) => {
  return http.post('api/v1/story', payload)
}

internals.putModel = (id, payload) => {
  return http.put(`api/v1/story/${id}`, payload)
}

internals.deleteModel = (id) => {
  return http.delete(`api/v1/story/${id}`)
}

internals.deleteModels = (payload) => {
  return http.delete(`api/v1/story/deleteBatch`, payload)
}

internals.enable = (id) => {
  return http.put(`api/v1/story/${id}/enable`)
}

internals.disable = (id) => {
  return http.put(`api/v1/story/${id}/disable`)
}

export default internals
