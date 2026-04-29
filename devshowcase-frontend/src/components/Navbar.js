import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isPortfolioPage = location.pathname.includes("/portfolio");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        DevShowcase
      </Link>

      <div className="ms-auto">
        {token && !isPortfolioPage && (
          <Link className="btn btn-outline-light me-2" to="/dashboard">
            Dashboard
          </Link>
        )}

        {token && (
          <Link className="btn btn-warning me-2" to="/profile">
            Profile
          </Link>
        )}

        {token && (
          <a
            className="btn btn-info me-2"
            href={`/portfolio/${email}`}
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </a>
        )}

        {token && (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
