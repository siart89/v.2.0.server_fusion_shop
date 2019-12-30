import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Notifications from './Notifications';
import { FlexColumn, EmptyTitle } from './styles';
import MyBookList from '../profileElements/myBooks/MyBookList';
import useFetch from '../../actions/fetch.hook';


const ProfileBoard = () => {
  const [note, setNote] = useState([]);
  const { id } = useSelector((state) => state.currentUser);
  const [newProd, setNewProd] = useState([]);
  const { fetching } = useFetch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await fetching(`/profile/notifications/user${id}`);
        setNote(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchNotifications();
  }, [id, fetching]);

  useEffect(() => {
    const fetchNewProduct = async () => {
      try {
        const data = await fetching('/api/prod/news');
        setNewProd(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchNewProduct();
  }, [id, fetching]);

  return (
    <>
      <FlexColumn>
        {note.length > 0 ? (
          note.map((item) => (
            <Notifications
              key={item.id}
              title={item.title}
              bookId={item.id}
              count={item.Comments.length}
            />
          ))
        ) : (
          <EmptyTitle>Новых отзывов нет</EmptyTitle>
        )}
      </FlexColumn>
      {newProd.length > 0 && <MyBookList list={newProd} />}
    </>
  );
};

export default ProfileBoard;
