import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

// Fetch a word based on the given category and difficulty
export const fetchWordByCategory = async ({category, difficulty}: {category: string, difficulty: string}) => {
  try {
    const response = await axios.get(`${API_URL}/word`, { params: { category, difficulty } });
    return response.data;
  } catch (error) {
    console.error('Error fetching words:', error);
    throw error;
  }
};

// Fetch the top scores from the server
export const fetchTopScores = async () => {
  try {
    const response = await axios.get(`${API_URL}/scores`);
    return response.data.scores;
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
};

// Add a new score for a user
export const addScore = async ({ username, score }: { username: string; score: number }) => {
  try {
    const response = await axios.post(`${API_URL}/scores`, { username, score });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 200 range
        if (error.response.status === 400) {
          return { message: 'Inappropriate username' };
        }
        return { message: `Server error: ${error.response.statusText}` };
      }
      // Network error or no response received
      console.error('Error adding score:', error.message);
      return { message: 'An error occurred while adding the score. Please try again later.' };
    } else {
      // Generic error handling
      console.error('Unexpected error:', error);
      return { message: 'An unexpected error occurred. Please try again later.' };
    }
  }
};

export const wakeTheServer = async () => {
  try {
    await axios.get(`${API_URL}/`);
  } catch (error) {
    console.error('Error waking the server:', error);
  }
};
