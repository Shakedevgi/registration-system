import axios from 'axios';
import { Platform } from 'react-native';

// Android Emulator cannot see 'localhost'. It uses '10.0.2.2'.
// iOS Simulator uses 'localhost'.
const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:8000'
  : 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;