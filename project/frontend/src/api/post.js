export const postController = {
  async getQuestionPost(id) {
    const response = await fetch(`http://localhost:8000/api/v1/posts/question/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Server is down, please try again later!');
    }
    return response.json();
  },
};
