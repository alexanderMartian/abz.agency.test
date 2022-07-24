import axios from 'axios';

const useUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/';


const instance = axios.create({
  baseURL: useUrl,
  headers: {"Content-Type": "multipart/form-data"}
});
export default instance;