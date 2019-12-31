import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookCardWrapper, ShowComBtn } from '../bookCard/bookCardStyles';
import BookInfo from '../bookCard/BookInfo';
import PriceInfo from '../bookCard/PriceInfo';
import Comments from '../comments/Comments';
import CommentBLock from '../commentBlock/CommentBlock';
import { GridBox } from '../commentBlock/styles';
import useFetch from '../actions/fetch.hook';

const MainBookCard = () => {
  const [info, setInfo] = useState(null);
  const { id } = useParams();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState([]);
  const { fetching } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetching(`/api/info/book/card/${id}`);
        setInfo(data);
      } catch (e) {
        setInfo(null);
      }
    };
    if (!showComment) {
      fetchData();
    }
  }, [id, showComment, fetching]);

  useEffect(() => {
    const fetchingComments = async () => {
      try {
        const data = await fetching(`/api/info/book/comment/book/${id}`);
        setComment(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    if (!showComment) {
      fetchingComments();
    }
  }, [id, showComment, fetching]);

  const handleCloseComment = () => {
    setShowComment(false);
  };
  const handleShowComments = () => {
    if (info) {
      setShowComment(true);
    }
  };
  return (
    <>
      {showComment && (
        <Comments
          closeOnClick={handleCloseComment}
          title={info.title}
          bookId={id}
        />
      )}
      <BookCardWrapper>
        {info && (
          <>
            <BookInfo
              title={info.title}
              author={info.author}
              cover={info.cover}
              description={info.description}
              rating={info.rating}
              bookId={info.id}
            />
            <PriceInfo price={info.price} bookId={+id} />
          </>
        )}
        {comment.length > 0 ? (
          comment.map((item) => (
            <CommentBLock
              key={item.id}
              author={item.authorName}
              date={item.createdAt}
              rating={item.rating}
              text={item.text}
            />
          ))
        ) : <GridBox>Отзывов нет</GridBox>}
        <ShowComBtn onClick={handleShowComments}>
          Написать отзыв
        </ShowComBtn>
      </BookCardWrapper>
    </>
  );
};

export default MainBookCard;
