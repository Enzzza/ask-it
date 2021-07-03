export const userController = {
  async getUserById(id) {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/profile/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.ok) {
      return false;
    }
    const content = await response.json();

    return content.user;
  },

  async getUserQuestions() {
    const response = await fetch(
      'http://localhost:8000/api/v1/user/questions',
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    if (!response.ok) {
      return false;
    }

    const content = await response.json();

    return content.questions;
  },
};
