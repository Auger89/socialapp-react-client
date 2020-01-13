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
service.getUserData = () =>
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
service.editUserDetails = userData =>
  firebase.post('/user', userData, {
    headers: { Authorization: localStorage.getItem(FIREBASE_ID_TOKEN) }
  });

export default service;
