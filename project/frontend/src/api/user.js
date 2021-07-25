export const userController = {
  async getUserById(id) {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/profile/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`User: ${response.statusText}`);
    }

    const content = await response.json();
    const { user } = content;

    return user;
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
      throw new Error(`User: ${response.statusText}`);
    }

    const content = await response.json();
    const { questions } = content;

    return questions;
  },
  async getPaginatedUserQuestions(id, page, pageSize = 20) {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/${id}/questions/${page}-${pageSize}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`User: ${response.statusText}`);
    }

    const content = await response.json();
    const { error, msg, ...obj } = content;

    return obj;
  },
};
