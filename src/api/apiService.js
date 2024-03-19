import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Base URL of API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retrieves user information
function getUserInfo(userId) {
    return apiClient.get(`/user/${userId}`);
  }
  
  // Retrieves user activity
  function getUserActivity(userId) {
    return apiClient.get(`/user/${userId}/activity`);
  }
  
  // Retrieves a user's average sessions
  function getUserAverageSessions(userId) {
    return apiClient.get(`/user/${userId}/average-sessions`);
  }
  
  // Retrieves a user's performance
  function getUserPerformance(userId) {
    return apiClient.get(`/user/${userId}/performance`);
  }
  
  export { getUserInfo, getUserActivity, getUserAverageSessions, getUserPerformance };
