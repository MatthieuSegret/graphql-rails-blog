import axios from 'config/axios';
import jwtDecode from 'jwt-decode';

export function findToken() {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem('blog:token');

    if (!token) {
      reject();
      return;
    }

    if (validTokenExpiration()) {
      resolve(token);
    } else {
      axios
        .post('/graphql', {
          query: 'mutation refreshToken { refreshToken(input: {}) { token } }'
        })
        .then(response => {
          const newToken = response.data.data.refreshToken.token;
          saveToken(newToken);
          resolve(newToken);
        });
    }
  });

  function tokenExpiration() {
    return window.localStorage.getItem('blog:token-expiration');
  }

  function validTokenExpiration() {
    const exp = tokenExpiration();
    const now = Math.round(new Date().getTime() / 1000);

    if (!exp) {
      return false;
    }
    return exp > now;
  }
}

export function saveToken(token) {
  try {
    const payload = jwtDecode(token);
    window.localStorage.setItem('blog:token', token);
    window.localStorage.setItem('blog:token-expiration', payload.exp);
  } catch (e) {
    removeToken();
    window.location.reload();
  }
}

export function removeToken() {
  window.localStorage.removeItem('blog:token');
  window.localStorage.removeItem('blog:token-expiration');
}
