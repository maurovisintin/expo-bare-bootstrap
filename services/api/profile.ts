import { get, post, put } from './app-client';

const getProfile = () => get('/facts/random?animal_type=cat&amount=1');

export {
  getProfile
};
