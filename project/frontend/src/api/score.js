import { Config } from "../config";

export const scoreController = {
  async getTopScoreQuestions() {
    const response = await fetch(`${Config.API_URL}/api/v1/scores/top`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Top questions: ${response.statusText}`);
    }

    const content = await response.json();
    const { questions } = content;

    return questions;
  },

  async addScore(data) {
    const response = await fetch(`${Config.API_URL}/api/v1/scores/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Vote: ${response.statusText}`);
    }

    const content = await response.json();
    const { post } = content;

    return post;
  },
};
