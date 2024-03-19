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
  
  // Récupère les sessions moyennes d'un utilisateur
  function getUserAverageSessions(userId) {
    return apiClient.get(`/user/${userId}/average-sessions`);
  }
  
  // Récupère la performance d'un utilisateur
  function getUserPerformance(userId) {
    return apiClient.get(`/user/${userId}/performance`);
  }
  
  export { getUserInfo, getUserActivity, getUserAverageSessions, getUserPerformance };
