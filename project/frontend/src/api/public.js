export const publicController = {
  async getPublicQuestionsById(userID) {
    const response = await fetch(
      `http://localhost:8000/api/v1/public/questions/${userID}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Questions: ${response.statusText}`);
    }
    
    const content = await response.json();
    const { questions } = content;

    return questions;
  },

  async getPaginatedPublicQuestions(page, pageSize = 20) {
    const response = await fetch(
      `http://localhost:8000/api/v1/public/questions/${page}-${pageSize}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!response.ok) {
      throw new Error(`Questions: ${response.statusText}`);
    }

    const content = await response.json();
    const { error, msg, ...obj } = content;

    return obj;
  },

  async getUsersWithMostAnswers() {
    const response = await fetch(
      `http://localhost:8000/api/v1/public/top-answers`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Top answers: ${response.statusText}`);
    }

    const content = await response.json();
    const { answers } = content;

    return answers;
  },

  async getAnswersForQuestion(questionID) {
    const response = await fetch(
      `http://localhost:8000/api/v1/public/answers/${questionID}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Answers: ${response.statusText}`);
    }

    const content = await response.json();
    const { answers } = content;

    return answers;
  },
};
