export const publicController = {
  async GetPublicQuestionsById(userID) {
    // @Router /v1/public/questions/:userID [get]
    const response = await fetch(
      `http://localhost:8000/api/v1/public/questions/${userID}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.ok) {
      return false;
    }
    const content = await response.json();
    return content.questions;
  },
};
