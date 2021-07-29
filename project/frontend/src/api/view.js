import { Config } from "../config";

export const viewController = {
  async addView(questionId) {
    const response = await fetch(`${Config.API_URL}/api/v1/views`, {
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
