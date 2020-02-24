import { httpClient as http } from '../services'

const internals = {}

internals.postModel = (payload) => {
  return http.post('api/shortUrl', payload)
}

export default internals
