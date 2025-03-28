import { Link, useLocation } from "react-router-dom";

const Header = ({ setShowAuthModal, setAuthTab }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleLoginClick = () => {
    console.log("Login button clicked");
    setShowAuthModal(true);
    setAuthTab("login");
  };

  const handleSignupClick = () => {
    console.log("Signup button clicked");
    setShowAuthModal(true);
    setAuthTab("signup");
  };

  return (
    <div className="header">
      <Link to="/" className="logo">
        Digiocean
      </Link>
      <div className="header-right">
        <nav className="nav-menu">
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                data-page="index"
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={location.pathname === "/blog" ? "active" : ""}
                data-page="blog"
              >
                블로그
              </Link>
            </li>
            <li>
              <Link
                to="/review"
                className={location.pathname === "/review" ? "active" : ""}
                data-page="review"
              >
                리뷰
              </Link>
            </li>
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  className={location.pathname === "/admin" ? "active" : ""}
                  data-page="user-management"
                >
                  유저 관리
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="auth-section">
          {user ? (
            <>
              <span className="auth-icon">👤</span>
              <span className="user-display">{user.name}</span>
              <button className="auth-link" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <span className="auth-icon">👤</span>
              <button className="auth-link" onClick={handleLoginClick}>
                로그인
              </button>
              <button className="auth-link" onClick={handleSignupClick}>
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
