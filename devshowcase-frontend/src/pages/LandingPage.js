import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "white",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>DevShowcase</h1>

        <p style={{ fontSize: "1.2rem", marginTop: "20px", color: "#ddd" }}>
          Build your personal developer portfolio in minutes. Showcase your
          projects, tech stack, and live links — all in one place.
        </p>

        <p style={{ marginTop: "10px", color: "#aaa" }}>
          Perfect for students, freshers, and developers.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "10px",
            width: "300px",
            textAlign: "center",
            color: "black",
          }}
        >
          <h3>Get Started</h3>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

          <button
            className="btn btn-dark w-100 mt-3"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
