import { useState } from "react";
import api from "../services/api";

function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    bio: "",
    githubLink: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const email = localStorage.getItem("email");

      await api.put("/users/update", {
        ...form,
        email: email,
      });

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      <div
        className="shadow"
        style={{
          background: "#ffffff",
          padding: "35px",
          borderRadius: "12px",
          width: "380px",
        }}
      >
        <h3 className="text-center mb-4 fw-bold">Edit Profile</h3>

        <input
          className="form-control mb-3"
          name="name"
          placeholder="Update Name"
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          name="bio"
          placeholder="Bio (e.g., Full Stack Developer...)"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="githubLink"
          placeholder="GitHub Profile Link"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="New Password"
          onChange={handleChange}
        />

        <small style={{ color: "gray" }}>
          Leave password empty if you don’t want to change it
        </small>

        <button className="btn btn-primary w-100 mt-3" onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
