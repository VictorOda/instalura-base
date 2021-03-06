import { isStagingEnv } from '../../infra/env/isStagingEnv';
import { HttpClient } from '../../infra/http/HttpClient';
import { authService } from '../auth/authService';

const BASE_URL = isStagingEnv
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  : 'https://instalura-api-omariosouto.vercel.app';

export const userService = {
  async getProfilePage(ctx) {
    const url = `${BASE_URL}/api/users/posts`;
    try {
      const token = await authService(ctx).getToken();
      const response = await HttpClient(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return {
        user: {
          totalLikes: 100,
        },
        posts: response.data,
      };
    } catch (err) {
      throw new Error('Não conseguimos pegar os posts');
    }
  },
  async createPost(description, photoUrl, filter) {
    const url = `${BASE_URL}/api/posts`;
    console.log(description, photoUrl, filter);
    try {
      const token = await authService().getToken();
      await HttpClient(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          description,
          photoUrl,
          filter,
        },
      });
    } catch (err) {
      throw new Error('Não conseguimos criar o post');
    }
  },
  async likePost(postId) {
    const url = `${BASE_URL}/api/posts/${postId}/like`;
    try {
      const token = await authService().getToken();
      await HttpClient(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      throw new Error('Não conseguimos dar o like no post');
    }
  },
};
