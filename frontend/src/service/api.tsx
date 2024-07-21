import axios from 'axios';

const API_URL = 'http://147.235.201.152:3001/api';

export const fetchWordByCategory = async ({category, difficulty}: {category: string, difficulty: string}) => {
  try {
    const response = await axios.get(`${API_URL}/word`, { params: { category, difficulty } });
    return response.data;
  } catch (error) {
    console.error('Error fetching words:', error);
    throw error;
  }
};

export const fetchTopScores = async () => {
  try {
    const response = await axios.get(`${API_URL}/scores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
};

export const addScore = async ({ username, score }: { username: string, score: number }) => {
  try {
    const response = await axios.post(`${API_URL}/scores`, { username, score });
    return response.data;
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
};
