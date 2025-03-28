import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2 className="admin-sidebar-title">관리자 패널</h2>
      <ul className="admin-sidebar-menu">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            대시보드
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            사용자 관리
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/reviews"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            리뷰 관리
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            설정
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
