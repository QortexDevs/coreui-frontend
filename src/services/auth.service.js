import config from 'config'

class AuthService {
  login (email, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }

    return fetch(`${config.apiUrl}/api/auth/token/`, requestOptions)
      .then(this.handleResponse)
      .then(user => {
        if (user.token) {
          localStorage.setItem('user', JSON.stringify(user))
        }
        return user
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  isLoggedIn () {
    return localStorage.getItem('user')
  }

  handleResponse (response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text)
      return data
    })
  }
}

export const authService = new AuthService()
