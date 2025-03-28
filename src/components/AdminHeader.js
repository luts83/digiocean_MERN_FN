const AdminHeader = ({ user, onLogout }) => {
  return (
    <div className="admin-header">
      <h1>관리자 페이지</h1>
      <div className="admin-header-right">
        <span>안녕하세요, {user?.name || "관리자"}님</span>
        <button onClick={onLogout} className="logout-btn">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
