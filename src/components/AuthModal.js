import { useState } from "react";
import axios from "axios";

const AuthModal = ({ setShowAuthModal, initialTab }) => {
  const [tab, setTab] = useState(initialTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = tab === "login" ? "/auth/login" : "/auth/register";
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        {
          name: tab === "signup" ? name : undefined,
          email,
          password,
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setShowAuthModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.response?.data?.message || "오류가 발생했습니다.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={() => setShowAuthModal(false)}>
          ×
        </span>
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
          >
            로그인
          </button>
          <button
            className={`auth-tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => setTab("signup")}
          >
            회원가입
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {tab === "signup" && (
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {tab === "login" ? "로그인" : "회원가입"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
