import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/appointments/';

export default function userService() {
    
  const getAdminAppointments = () => {
    return axios.get(API_URL + 'get/admin', { headers: authHeader() })
  }

  const getUserAppointments = () => {
    return axios.get(API_URL + 'get/suer', { headers: authHeader() })
  }

  return {getAdminAppointments, getUserAppointments}

}