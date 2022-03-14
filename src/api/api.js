import { BASE_URL } from "../context/constants";

const fetchQuizzes = async () => {
  try {
    const server = await fetch(BASE_URL);
    const response = await server.json();
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }
};

export default fetchQuizzes;