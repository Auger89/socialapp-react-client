import axios from 'axios';
import { FIREBASE_ID_TOKEN } from '../utils/constants';

const firebase = axios.create({
  baseURL: 'https://europe-west1-social-app-45dd0.cloudfunctions.net/api',
  timeout: 5000
});

const service = {};

service.getScreams = () => firebase.get('/screams');
service.login = loginData => firebase.post('/login', loginData);
service.signup = signupData => firebase.post('/signup', signupData);
service.getUser = () =>
  firebase.get('/user', {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });
service.uploadImage = image => {
  const formData = new FormData();
  formData.append('image', image, image.name);

  return firebase.post('/user/image', formData, {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });
};
service.editUserDetails = details =>
  firebase.post('/user', details, {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });
service.likeScream = screamId =>
  firebase.get(`/scream/${screamId}/like`, {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });
service.unlikeScream = screamId =>
  firebase.get(`/scream/${screamId}/unlike`, {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });
service.deleteScream = screamId =>
  firebase.delete(`/scream/${screamId}`, {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });
service.postScream = newScream =>
  firebase.post('/scream', newScream, {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });
service.getScream = screamId => firebase.get(`/scream/${screamId}`);
service.submitComment = (screamId, comment) =>
  firebase.post(`/scream/${screamId}/comment`, comment, {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });
service.getUserData = userHandle => firebase.get(`/user/${userHandle}`);

export default service;
