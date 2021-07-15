export const userController = {
  async getUserById(id) {
    
    const response = await fetch(
      `http://localhost:8000/api/v1/user/profile/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  
    if(!response.ok){
      throw new Error("Server is down, please try again later!");
    }
    
    return response.json();
  },

  async getUserQuestions() {
    const response = await fetch(
      'http://localhost:8000/api/v1/user/questions',
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    

    if(!response.ok){
      throw new Error("Server is down, please try again later!");
    }

    return response.json();
  },
  async getPaginatedUserQuestions(id,page, pageSize = 20) {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/${id}/questions/${page}-${pageSize}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Server is down, please try again later!');
    }

    return response.json();
  },
  
};
