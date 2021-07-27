import config from './config.json';

export const postController = {
  async getQuestionPost(id) {
    const response = await fetch(
      `${config.BASE_URL}/api/v1/posts/question/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Question: ${response.statusText}`);
    }

    const content = await response.json();
    const { post } = content;

    return post;
  },

  async getPost(id) {
    const response = await fetch(`${config.BASE_URL}/api/v1/posts/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Post: ${response.statusText}`);
    }

    const content = await response.json();
    const { post } = content;

    return post;
  },

  async createPost(data) {
    const response = await fetch(`${config.BASE_URL}/api/v1/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Question: ${response.statusText}`);
    }

    const content = await response.json();
    const { post } = content;

    return post;
  },

  async updatePost(data, postId) {
    const response = await fetch(
      `${config.BASE_URL}/api/v1/posts/${postId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Question: ${response.statusText}`);
    }

    const content = await response.json();
    const { post } = content;

    return post;
  },

  async deletePost(postId) {
    const response = await fetch(
      `${config.BASE_URL}/api/v1/posts/${postId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`Question: ${response.statusText}`);
    }

    const content = await response.json();
    const { post } = content;

    return post;
  },
};
