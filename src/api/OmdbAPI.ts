import axios from "axios";

const baseUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

class OmdbAPI {
  static getMovieDetails = async (title: String): Promise<any> => {
    const response = await axios.get(`${baseUrl}t=${title}`);
    const details = await response.data;

    return details;
  };
}

export default OmdbAPI;
