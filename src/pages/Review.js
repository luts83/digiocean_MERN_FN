import { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/reviews`
      );
      console.log("Fetched reviews:", response.data); // 디버깅용 로그
      setReviews(response.data);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      alert("리뷰를 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reviews`,
        { content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Submitted review:", response.data); // 디버깅용 로그
      setReviews([...reviews, response.data]);
      setContent("");
      fetchReviews(); // 리뷰 목록 새로고침
    } catch (err) {
      console.error("Submit review error:", err);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (err) {
      console.error("Delete review error:", err);
      alert("리뷰 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditContent(review.content);
  };

  const handleUpdate = async (id) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/reviews/${id}`,
        { content: editContent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Updated review:", response.data); // 디버깅용 로그
      setReviews(
        reviews.map((review) => (review._id === id ? response.data : review))
      );
      setEditingReviewId(null);
      setEditContent("");
      fetchReviews(); // 리뷰 목록 새로고침
    } catch (err) {
      console.error("Update review error:", err);
      alert("리뷰 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditContent("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 없음";

    const date = new Date(dateString);
    if (isNaN(date)) return "날짜 없음";

    // 날짜 포맷 (예: 2025년 03월 28일)
    const formattedDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long", // '2-digit' → 'long'으로 변경 (3 → 3월)
      day: "numeric",
    });

    // 시간 포맷 (예: 14시 40분)
    const formattedTime =
      date
        .toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // 24시간 형식
        })
        .replace(":", "시 ") + "분";

    return `${formattedDate} | ${formattedTime}`;
  };

  return (
    <div className="review-page">
      <h1>리뷰</h1>
      {user ? (
        <form onSubmit={handleSubmit} className="review-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="리뷰를 작성해주세요."
            required
            className="review-textarea"
          />
          <button type="submit" className="submit-btn">
            리뷰 등록
          </button>
        </form>
      ) : (
        <p>리뷰를 작성하려면 로그인이 필요합니다.</p>
      )}
      <div className="review-list">
        {reviews.length === 0 ? (
          <p>아직 리뷰가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-item">
              {editingReviewId === review._id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="review-textarea"
                  />
                  <button
                    onClick={() => handleUpdate(review._id)}
                    className="submit-btn"
                  >
                    저장
                  </button>
                  <button onClick={handleCancelEdit} className="delete-btn">
                    취소
                  </button>
                </div>
              ) : (
                <>
                  <p className="review-content">{review.content}</p>
                  <p className="review-author">
                    작성자: {review.userId?.name || "익명"}
                  </p>
                  <p className="review-date">
                    작성일: {formatDate(review.date)}
                  </p>
                  {user &&
                    (user.id === review.userId?._id ||
                      user.role === "admin") && (
                      <div>
                        <button
                          onClick={() => handleEdit(review)}
                          className="edit-btn"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="delete-btn"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Review;
