const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>대시보드</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>총 사용자</h3>
          <p>50</p>
        </div>
        <div className="stat-card">
          <h3>총 리뷰</h3>
          <p>120</p>
        </div>
        <div className="stat-card">
          <h3>오늘의 활동</h3>
          <p>15</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
