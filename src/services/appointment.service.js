import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/appointments/';

export default function userService() {

  const getAppointmentsByMonth = (year, month) => {
    return axios.get(API_URL + 'get/month?year=' + year + '&month=' + month, { headers: authHeader() })
  }

  return { getAppointmentsByMonth }

}