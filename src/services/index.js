import axios from 'axios';

const firebase = axios.create({
  baseURL: 'https://europe-west1-social-app-45dd0.cloudfunctions.net/api/',
  timeout: 5000,
  headers: { 'content-type': 'application/json' }
});

const service = {};

service.getScreams = () => firebase.get('/screams');

export default service;
