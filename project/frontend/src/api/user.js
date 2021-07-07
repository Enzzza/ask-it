export const userController = {
  async getUserById(id) {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/profile/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    ).catch((err) => {
      return { error: true, msg: 'Server is down, please try again later!' };
    });

    if (response.error) {
      return response;
    }

    const content = await response.json();

    return content;
  },

  async getUserQuestions() {
    const response = await fetch(
      'http://localhost:8000/api/v1/user/questions',
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    ).catch((err) => {
      return { error: true, msg: 'Server is down, please try again later!' };
    });
    

    if (response.error) {
      return response;
    }

    const content = await response.json();

    return content;
  },
  
};
