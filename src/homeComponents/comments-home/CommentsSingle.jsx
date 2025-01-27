import React, { useEffect, useState } from 'react';
import './CommentsHome.css';

function CommentsSingle({ limit, currentIndex }) {
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState([]);
  const [typedTexts, setTypedTexts] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Məlumatı çəkmək alınmadı!');
        }
        return response.json();
      })
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const selectedComments = comments.slice(currentIndex, currentIndex + limit);
    setVisibleComments(selectedComments);
    setTypedTexts(selectedComments.map(() => '')); // Boş sətir hazırlayır
  }, [comments, currentIndex, limit]);

  useEffect(() => {
    if (visibleComments.length > 0) {
      const intervalIds = visibleComments.map((comment, index) => {
        let charIndex = 0;

        const intervalId = setInterval(() => {
          setTypedTexts((prevTypedTexts) => {
            const newTypedTexts = [...prevTypedTexts];
            if (charIndex < comment.text.length) {
              newTypedTexts[index] = comment.text.slice(0, charIndex + 1); // İlk simvoldan başlayır
              charIndex++;
            } else {
              clearInterval(intervalId); // Tam mətn göstərildikdə interval dayandırılır
            }
            return newTypedTexts;
          });
        }, 50);

        return intervalId;
      });

      return () => {
        intervalIds.forEach((id) => clearInterval(id));
      };
    }
  }, [visibleComments]);

  return (
    <div className="comments-list">
      {visibleComments.map((comment, index) => (
        <div
          className={`comments-single ${index === 0 ? 'show-card' : ''}`}
          key={comment.id}
        >
          <div className="comment-total">
            <div className="comCard-top">
              <div className="comCard-top-img">
                <img src={comment.image} alt={comment.name} />
              </div>
              <div className="comCard-top-info">
                <h3>{comment.name}</h3>
                <h5>{comment.position}</h5>
              </div>
            </div>
            <div className="comCardText">
              <p>{typedTexts[index]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsSingle;
