import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../../../actions/fetch.hook';
import { FavoritesWrapper } from './styles';
import ElemOfFavorites from './ElemOfFavorites';
import { Title } from '../../profileStyles/styles';

const Favorites = () => {
  const [favor, setFavorites] = useState([]);
  const [reload, setReload] = useState(true);
  const { id } = useSelector((state) => state.currentUser);
  const { fetching, error } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetching(`/profile/favor/user/${id}/favorites`);
        setFavorites(data);
      } catch (e) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, reload, fetching, error]);

  const handleReloadOnRemove = () => {
    setReload(!reload);
  };
  return (
    <>
      {
        favor.length > 0 ? (
          <FavoritesWrapper>
            {favor.map((item) => (
              <ElemOfFavorites
                key={item.id}
                url={item.Book.cover}
                title={item.Book.title}
                id={+id}
                bookId={item.BookId}
                reloadOnRemove={handleReloadOnRemove}
              />
            ))}
          </FavoritesWrapper>
        ) : (
          <Title>
              В избранных : 0 книг
          </Title>
        )
      }
    </>
  );
};

export default Favorites;
