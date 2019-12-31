import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { remove } from 'react-icons-kit/fa/remove';
import { ruble } from 'react-icons-kit/fa/ruble';
import { Icon } from 'react-icons-kit';
import {
  Row,
  RowBookCover,
  CartRowTitle,
  CartMainText,
  CartNumText,
  RowCursiveText,
  CartDeleteBtn,
  RowInfo,
} from './cartStyles';
import CountBtn from '../bookCard/CountBtn';
import decrement from '../../store/actions/decrement';
import increment from '../../store/actions/increment';
import removeFromCart from '../../store/actions/removeFromCart';
import useFetch from '../actions/fetch.hook';


const CartRow = ({ id, count }) => {
  const dispatch = useDispatch();
  const [cover, setCover] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState(null);
  const { fetching, error } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetching(`/api/info/book/card/${id}`);
        setCover(data.cover);
        setTitle(data.title);
        setAuthor(data.author);
        setPrice(data.price);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchData();
  }, [id, error, fetching]);

  useEffect(() => {
    setCost(price * count);
  }, [count, price]);
  return (
    <Row>
      <RowBookCover src={cover} />
      <RowInfo>
        <CartRowTitle to={`/book/${id}`}>
          {title}
        </CartRowTitle>
        <RowCursiveText>
          {author}
        </RowCursiveText>
      </RowInfo>
      <CartMainText>
        {id}
      </CartMainText>
      <div>
        <CountBtn
          count={count}
          decOnClick={() => dispatch(decrement(id))}
          incOnClick={() => dispatch(increment(id))}
        />
      </div>
      <CartNumText>
        {cost}
        <Icon icon={ruble} size={14} />
      </CartNumText>
      <CartDeleteBtn onClick={() => dispatch(removeFromCart(id))}>
        <Icon icon={remove} size={18} />
      </CartDeleteBtn>
    </Row>
  );
};

CartRow.propTypes = {
  id: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default CartRow;
