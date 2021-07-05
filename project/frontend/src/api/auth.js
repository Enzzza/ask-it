export const authController = {
  async signin(email, password) {
    const response = await fetch(`http://localhost:8000/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((err) => {
      return { error: true, msg: 'Server is down, please try again later!' };
    });

    if (response.error) {
      return response;
    }

    const content = await response.json();

    return content;
  },

  async signup(data) {
    const response = await fetch(`http://localhost:8000/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...data,
      }),
    }).catch((err) => {
      return { error: true, msg: 'Server is down, please try again later!' };
    });

    if (response.error) {
      return response;
    }

    const content = await response.json();
    return content;
  },

  async signout() {
    const response = await fetch('http://localhost:8000/api/v1/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).catch((err) => {
      return { error: true, msg: 'Server is down, please try again later!' };
    });
    if (response.error) {
      return response;
    }

    const content = await response.json();

    return content;
  },

  async me() {
    const response = await fetch('http://localhost:8000/api/v1/auth/me', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).catch((err) => {
      return { error: true, msg: 'Server is down, please try again later!' };
    });

    if (response.error) {
      return response;
    }
    const content = await response.json();

    return content;
  },


  async updateDetails(data) {
    const response = await fetch(`http://localhost:8000/api/v1/auth/updatedetails`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...data,
      }),
    }).catch((err) => {
      return { error: true, msg: 'Server is down, please try again later!' };
    });

    if (response.error) {
      return response;
    }

    const content = await response.json();
    return content;
  },

  async updatePassword(data) {
    const response = await fetch(`http://localhost:8000/api/v1/auth/updatepassword`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...data,
      }),
    }).catch((err) => {
      return { error: true, msg: 'Server is down, please try again later!' };
    });

    if (response.error) {
      return response;
    }

    const content = await response.json();
    return content;
  }


};
