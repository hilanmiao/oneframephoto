import { httpClient as http } from '../services'

const internals = {}

internals.uploadProfileImage = (name, file, options) => {
  const data = new FormData()
  data.append('name', name)
  data.append('file', file)
  return http.post('/file/upload/profile-image', data, options)
}

internals.uploadImage = (name, file, options) => {
  const data = new FormData()
  data.append('name', name)
  data.append('file', file)
  return http.post('/file/upload/image', data, options)
}

internals.upload = (name, file, options) => {
  const data = new FormData()
  data.append('name', name)
  data.append('file', file)
  return http.post('api/upload', data, options)
}

internals.uploadPhoto = (name, file, options) => {
  const data = new FormData()
  data.append('name', name)
  data.append('file', file)
  return http.post('api/uploadPhoto', data, options)
}

export default internals
