/* eslint-disable no-useless-catch */
import axios from "axios";

type Repo = {
  id: number;
  name: string;
  description: string;
};

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
    const filteredRepos = response.data.filter((repo: Repo) =>
      repo.name.toLowerCase().includes("github")
    );
    return filteredRepos;
  } catch (error) {
    throw error;
  }
}

export async function getRepocommits(username: string, repoName: string) {
  try {
    const response = await api.get(`/user/${username}/${repoName}/commits`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
