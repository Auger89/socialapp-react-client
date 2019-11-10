import axios from 'axios';

const firebase = axios.create({
  baseURL: 'https://europe-west1-social-app-45dd0.cloudfunctions.net/api',
  timeout: 5000
});

const service = {};
service.getScreams = () => firebase.get('/screams');
service.login = loginData => firebase.post('/login', loginData);
service.signup = signupData => firebase.post('/signup', signupData);

export default service;
