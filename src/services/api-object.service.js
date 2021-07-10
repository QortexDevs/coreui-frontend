import config from 'config'
import { authHeader } from '../helpers'
import { authService } from './auth.service'

export class ApiObjectService {
  namespace

  constructor (namespace: string) {
    this.namespace = namespace
  }

  create (formData: any) {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }

    return fetch(
      `${config.apiUrl}/api/${this.namespace}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  getAll () {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }

    return fetch(
      `${config.apiUrl}/api/${this.namespace}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  getById (id: any) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }

    return fetch(
      `${config.apiUrl}/api/${this.namespace}/${id}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  update (data: { id: any }) {
    const requestOptions = {
      method: 'PATCH',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    return fetch(
      `${config.apiUrl}/api/${this.namespace}/${data.id}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  delete (id: any) {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    }

    return fetch(
      `${config.apiUrl}/api/${this.namespace}/${id}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  handleResponse (response: { text: () => Promise<any>; status: number }) {
    return response.text().then((text: string) => {
      const data = text && JSON.parse(text)
      if (response.status === 401) {
        authService.logout()
        location.reload()
      }

      return data
    })
  }
}
