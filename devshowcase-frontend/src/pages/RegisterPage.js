import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #141e30, #243b55)",
      }}
    >
      <div
        className="shadow"
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "320px",
        }}
      >
        <h3 className="text-center mb-4">Register</h3>

        <form onSubmit={handleRegister}>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
