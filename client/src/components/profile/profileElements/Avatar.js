import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AvatarBox,
  AddInp,
  InputLabel,
} from '../profileStyles/styles';
import setUrl from '../../../store/actions/setUrl';
import useFetch from '../../actions/fetch.hook';


const Avatar = ({ name }) => {
  const { url, id } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const { fetching, error } = useFetch();

  const handleSendData = async (e) => {
    const data = new FormData();
    data.append('avatar', e.target.files[0]);

    try {
      const ava = await fetching(
        `/api/profile/avatar/${id}`,
        'POST',
        {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))} ${JSON.parse(localStorage.getItem('refreshToken'))}`,
        },
        data,
      );
      dispatch(setUrl(ava.url));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <AvatarBox url={url}>
      <InputLabel htmlFor="avatar">
        {!url && name[0].toUpperCase()}
      </InputLabel>
      <form
        style={{ position: 'relative' }}
      >
        <AddInp
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleSendData}
        />
      </form>
    </AvatarBox>

  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
