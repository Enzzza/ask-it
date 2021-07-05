export const postController = {
    
    async getPostById(id) {
        const response = await fetch(
            `http://localhost:8000/api/v1/posts/${id}`,
            {
              headers: { 'Content-Type': 'application/json' },
            }
          ).catch((err) => {
            return { error: true, msg: 'Server is down, please try again later!' };
          });
      
          if (response.error) {
            return response;
          }
      
          const content = await response.json();
      
          return content;

    }


}