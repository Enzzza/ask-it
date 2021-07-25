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
    });

    try {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    } catch (error) {
      return error.json();
    }
  },

  async signup(data) {
    const response = await fetch(`http://localhost:8000/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...data,
      }),
    });

    try {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    } catch (error) {
      return error.json();
    }
  },

  async signout() {
    const response = await fetch('http://localhost:8000/api/v1/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    try {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    } catch (error) {
      return error.json();
    }
  },

  async me() {
    const response = await fetch('http://localhost:8000/api/v1/auth/me', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    try {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    } catch (error) {
      return error.json();
    }
  },
  // adjust this if we will use react query!
  async updateDetails(data) {
    const response = await fetch(
      `http://localhost:8000/api/v1/auth/updatedetails`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
        }),
      }
    );

    try {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    } catch (error) {
      return error.json();
    }
  },

  // adjust this if we will use react query!
  async updatePassword(data) {
    const response = await fetch(
      `http://localhost:8000/api/v1/auth/updatepassword`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
        }),
      }
    );

    try {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    } catch (error) {
      return error.json();
    }
  },
};
