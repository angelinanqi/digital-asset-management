import { useState, useEffect } from "react";
import axios from "axios";

export default function useTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_API_URL = "http://127.0.0.1:8000/tags/";

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get(BASE_API_URL);
        setTags(response.data.results); //have to specify want the results array part of response data
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load tags...");
      } finally {
        setLoading(false); //no matter can load tag or not, end loading state
      }
    }

    fetchTags();
  }, []);

  return {tags, loading, error };
}
