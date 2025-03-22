// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
});

// Users API
export const fetchUsers = async (search = '') => {
  const response = await API.get(`/users?q=${search}`);
  return response.data;
};

export const fetchUserById = async (id) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};

// Activities API
export const fetchActivities = async () => {
  const response = await API.get('/activities');
  return response.data;
};

export const createActivity = async (activity) => {
  const response = await API.post('/activities', activity);
  return response.data;
};

// Rewards API
export const fetchRewards = async () => {
  const response = await API.get('/rewards');
  return response.data;
};

export const redeemReward = async (userId, rewardId) => {
  const response = await API.post('/redemptions', { userId, rewardId });
  return response.data;
};
export const updateActivity = async (id, updatedActivity) => {
    const response = await API.put(`/activities/${id}`, updatedActivity);
    return response.data;
  };