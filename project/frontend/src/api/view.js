import config from './config.json';

export const viewController = {
  async addView(questionId) {
    const response = await fetch(`${config.BASE_URL}/api/v1/views`, {
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
