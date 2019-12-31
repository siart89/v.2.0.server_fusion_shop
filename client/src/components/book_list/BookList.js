import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListWrapper from './bookListStyles';
import ListFilter from './listFilter/ListFilter';
import ProductList from './products/ProductList';
import setAllTitles from '../../store/actions/setAllTitles';
import setMaxPrice from '../../store/actions/setMaxPrice';
import useFetch from '../actions/fetch.hook';

const BookList = () => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.products);
  const { fetching } = useFetch();
  // geting all titles and authors of products for tips
  useEffect(() => {
    const allTitles = [];
    const getHeaders = async () => {
      try {
        const data = await fetching('/api/list/product/headers');
        const set = new Set(data);
        set.forEach((item) => allTitles.push(item));
        dispatch(setAllTitles(allTitles));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    if (!headers) {
      getHeaders();
    }
  }, [dispatch, headers, fetching]);

  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const data = await fetching('/api/list/product/max/price');
        dispatch(setMaxPrice(data.max));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    fetchMaxPrice();
  }, [dispatch, fetching]);

  return (
    <ListWrapper>
      <ListFilter />
      <ProductList />
    </ListWrapper>
  );
};


export default BookList;
