import { useEffect, useState } from "react";
import api from "../services/api";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    techStack: "",
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
                        setEditData({ ...editData, title: e.target.value })
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
      </div>
    </div>
  );
}

export default DashboardPage;
