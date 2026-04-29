import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

function PortfolioPage() {
  const { email } = useParams();
  const [data, setData] = useState(null);

  //define function FIRST
  const fetchPortfolio = useCallback(async () => {
    try {
      const response = await api.get(`/projects/portfolio/${email}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [email]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleView = async (id) => {
    await api.get(`/projects/${id}`);
    fetchPortfolio();
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "white",
        padding: "40px",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      <div className="container text-center mb-5">
        <h1 className="fw-bold">{data.name}</h1>
        <p className="text-light">{data.bio || "Full Stack Developer"}</p>

        <a
          href={data.github}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#00d4ff", textDecoration: "none" }}
        >
          GitHub
        </a>
      </div>

      <div className="container">
        <div className="row">
          {data.projects.map((p) => (
            <div className="col-md-4 mb-4" key={p.id}>
              <div
                className="card"
                style={{
                  background: "#ffffff",
                  color: "#000",
                  borderRadius: "12px",
                  padding: "20px",
                  transition: "0.3s",
                }}
              >
                <h5
                  style={{ cursor: "pointer", color: "#0d6efd" }}
                  onClick={() => handleView(p.id)}
                >
                  {p.title}
                </h5>

                <p>{p.description}</p>

                <p style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  <b>Tech:</b> {p.techStack}
                </p>

                <p>
                  <b>Views:</b> {p.views}
                </p>

                <div>
                  <a href={p.githubLink} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  {" | "}
                  <a href={p.liveLink} target="_blank" rel="noreferrer">
                    Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
