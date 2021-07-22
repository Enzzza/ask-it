export const viewController = {
  async addView(questionId) {
    const response = await fetch(`http://localhost:8000/api/v1/views`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postID: questionId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Question: ${response.statusText}`);
    }

    return true;
  },
};
