import { useEffect } from "react";
import api from "../services/api";

function TestPage() {
  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        console.log("API RESPONSE:", res.data);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
      });
  }, []);

  return <h2>Check console for API response</h2>;
}

export default TestPage;
