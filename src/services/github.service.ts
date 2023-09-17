/* eslint-disable no-useless-catch */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/github",
});

export async function getUserData(username: string) {
  try {
    const response = await api.get(`/user/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserRepos(username: string) {
  try {
    const response = await api.get(`/user/${username}/repos`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
