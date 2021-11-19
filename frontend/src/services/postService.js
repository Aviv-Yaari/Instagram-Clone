import { httpService } from './http.service';

export const postService = { add, query, like, addComment };

async function query() {
  return await httpService.get('post');
}

async function add(media, text) {
  return await httpService.post('post', { media, text });
}

async function like(id) {
  return await httpService.put(`post/${id}/like`);
}

async function addComment(id, comment, commentId) {
  return await httpService.post(`post/${id}/comment`, { comment, commentId });
}
