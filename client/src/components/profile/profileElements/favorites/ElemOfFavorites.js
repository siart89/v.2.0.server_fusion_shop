import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../../../actions/fetch.hook';
import { FavoriteCover, FavoriteGridBox } from './styles';
import { Title, LogOutButton } from '../../profileStyles/styles';

const ElemOfFavorites = ({
  title,
  url,
  id,
  bookId,
  reloadOnRemove,
}) => {
  const { fetching } = useFetch();
  const removeOnClick = async () => {
    try {
      await fetching(`/profile/favor/user${id}/book${bookId}/favorites/remove`);
      reloadOnRemove();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <FavoriteGridBox>
      <FavoriteCover url={url} to={`/book/${bookId}`} />
      <Title>
        {title}
      </Title>
      <LogOutButton onClick={removeOnClick}>
        Удалить
      </LogOutButton>
    </FavoriteGridBox>
  );
};

ElemOfFavorites.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  bookId: PropTypes.number.isRequired,
  reloadOnRemove: PropTypes.func.isRequired,
};

export default ElemOfFavorites;
