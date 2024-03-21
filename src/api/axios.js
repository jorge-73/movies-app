import axios from "axios";

const API = "https://api.themoviedb.org/3";

export const getMoviesRequest = async (path) =>
  axios.get(`${API}${path}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2VjZjZkOGE5MjRhMmIwNTk0ZDRmZGE4YjY0OTcwMSIsInN1YiI6IjYzZmVhZjE0N2E0ZWU3MDBmMGY5OTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._IeKis30tdzrqgF7zO3vah3L5lkT7ALXnK676kyaAfs",
      "Content-Type": "application/json;charset=utf-8",
    },
  });
