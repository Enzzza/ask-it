export const publicController = {
  
  async getPublicQuestionsById(userID) {
    const response = await fetch(
      `http://localhost:8000/api/v1/public/questions/${userID}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Server is down, please try again later!');
    }

    return response.json();
  },

  async getPaginatedPublicQuestions(page, pageSize = 20) {
    
    const response = await fetch(
      `http://localhost:8000/api/v1/public/questions/${page}-${pageSize}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Server is down, please try again later!');
    }

    return response.json();
  },
  
  async getUsersWithMostAnswers() {
    
    const response = await fetch(
      `http://localhost:8000/api/v1/public/top-answers`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Server is down, please try again later!');
    }

    return response.json();
  },
  

  async getAnswersForQuestion(questionID){
    const response = await fetch(
      `http://localhost:8000/api/v1/public/answers/${questionID}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Server is down, please try again later!');
    }

    return response.json();
  }

};
