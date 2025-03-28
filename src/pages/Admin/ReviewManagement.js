import { useState, useEffect } from "react";
import axios from "axios";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Fetch reviews error:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/reviews/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setReviews(reviews.filter((review) => review._id !== id));
      } catch (err) {
        console.error("Delete review error:", err);
        alert("리뷰 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditContent(review.content);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/reviews/${id}`,
        { content: editContent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setReviews(
        reviews.map((review) => (review._id === id ? response.data : review))
      );
      setEditingReviewId(null);
      setEditContent("");
    } catch (err) {
      console.error("Update review error:", err);
      alert("리뷰 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditContent("");
  };

  return (
    <div className="admin-review-management">
      <h2>리뷰 관리</h2>
      <div className="review-list">
        {reviews.length === 0 ? (
          <p>리뷰가 없습니다.</p>
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
                    작성일:{" "}
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : "날짜 없음"}
                  </p>
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
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
