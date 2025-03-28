import { useState } from "react";
import axios from "axios";

const Auth = ({ setShowAuthModal, initialTab }) => {
  const [isLogin, setIsLogin] = useState(initialTab === "login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleTabSwitch = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? `${process.env.REACT_APP_API_URL}/auth/login`
        : `${process.env.REACT_APP_API_URL}/auth/register`;
      const response = await axios.post(url, formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setShowAuthModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.response?.data?.message || "인증 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-page">
      <div className="modal">
        <div className="modal-content">
          <span className="modal-close" onClick={() => setShowAuthModal(false)}>
            ×
          </span>
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={handleTabSwitch}
            >
              로그인
            </button>
            <button
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={handleTabSwitch}
            >
              회원가입
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className={`auth-form ${isLogin ? "active" : ""}`}
          >
            <h2>로그인</h2>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              로그인
            </button>
          </form>
          <form
            onSubmit={handleSubmit}
            className={`auth-form ${!isLogin ? "active" : ""}`}
          >
            <h2>회원가입</h2>
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
