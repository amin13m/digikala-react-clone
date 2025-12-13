import { useEffect, useState } from "react";
import { ProductAPI } from "../api/api";

export default function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const delay = setTimeout(async () => {
      try {
        const res = await ProductAPI.getAll();
        const filtered = res.data.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        console.log("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 600); // Debounce 400ms

    return () => clearTimeout(delay);
  }, [query]);

  return { results, loading };
}