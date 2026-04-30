import { useEffect, useState } from "react";
import api from "../services/api";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
  });

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects/my");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!newProject.title || !newProject.description) {
      alert("Title and Description are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/projects", newProject);

      setNewProject({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
      });

      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setEditData({
      title: p.title,
      description: p.description,
      techStack: p.techStack,
      githubLink: p.githubLink || "",
      liveLink: p.liveLink || "",
    });
  };

  const handleUpdate = async () => {
    await api.put(`/projects/${editingId}`, editData);
    setEditingId(null);
    fetchProjects();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #ffffff)",
        padding: "40px",
      }}
    >
      <div className="container">
        <h2 className="mb-4 fw-bold">My Projects</h2>

        {/*COPY PORTFOLIO LINK */}
        <button
          className="btn btn-outline-dark mb-3"
          onClick={() => {
            const email = localStorage.getItem("email");
            const link = `${window.location.origin}/portfolio/${email}`;
            navigator.clipboard.writeText(link);
            alert("Portfolio link copied!");
          }}
        >
          Copy Portfolio Link
        </button>

        {/*ADD PROJECT FORM */}
        <div className="card p-3 mb-4 shadow-sm">
          <h5>Add New Project</h5>

          <input
            className="form-control mb-2"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                description: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Tech Stack"
            value={newProject.techStack}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                techStack: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="GitHub Link"
            value={newProject.githubLink}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                githubLink: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Live Link"
            value={newProject.liveLink}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                liveLink: e.target.value,
              })
            }
          />

          <button
            className="btn btn-primary"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Project"}
          </button>
        </div>

        {/* EMPTY STATE */}
        {projects.length === 0 ? (
          <p className="text-muted text-center">
            No projects added yet. Start by adding one ...
          </p>
        ) : (
          <div className="row">
            {projects.map((p) => (
              <div className="col-md-4 mb-4" key={p.id}>
                <div
                  className="card shadow-sm"
                  style={{
                    borderRadius: "12px",
                    padding: "15px",
                  }}
                >
                  {editingId === p.id ? (
                    <>
                      <input
                        className="form-control mb-2"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            title: e.target.value,
                          })
                        }
                      />

                      <input
                        className="form-control mb-2"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                      />

                      <input
                        className="form-control mb-2"
                        value={editData.techStack}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            techStack: e.target.value,
                          })
                        }
                      />

                      <input
                        className="form-control mb-2"
                        value={editData.githubLink}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            githubLink: e.target.value,
                          })
                        }
                      />

                      <input
                        className="form-control mb-2"
                        value={editData.liveLink}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            liveLink: e.target.value,
                          })
                        }
                      />

                      <button
                        className="btn btn-success me-2"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="fw-bold">{p.title}</h5>
                      <p className="text-muted">{p.description}</p>

                      <p>
                        <b>Tech:</b> {p.techStack}
                      </p>

                      <p>
                        <b>Views:</b> {p.views}
                      </p>

                      {/* 🔗 LINKS */}
                      <div className="mb-2">
                        {p.githubLink && (
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        )}
                        {p.githubLink && p.liveLink && " | "}
                        {p.liveLink && (
                          <a href={p.liveLink} target="_blank" rel="noreferrer">
                            Live
                          </a>
                        )}
                      </div>

                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
