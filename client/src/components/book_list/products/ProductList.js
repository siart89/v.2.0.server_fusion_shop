import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BooksWrapper, AlarmText } from './productListStyles';
import ProductListTop from './top/ProductListTop';
import Product from './mainProdList/Product';
import { ProdGridBox } from './mainProdList/styles';
import setInfoOfProd from '../../../store/actions/setInfoOfProd';
import useFetch from '../../actions/fetch.hook';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const {
    pageNum,
    maxOnPage,
    sort,
    incDec,
    search,
    priceFilter,
    category,
    sale,
  } = useSelector((state) => state.products);
  const { fetching } = useFetch();

  useEffect(() => {
    const info = {
      pageNum,
      limit: maxOnPage,
      sort,
      incDec,
      cost: {
        min: priceFilter.min,
        max: priceFilter.max,
      },
      sale,
      category,
    };
    const fetchProductList = async () => {
      try {
        const data = await fetching(
          `/api/list/products/all?q=${search}`,
          'POST',
          {
            'Content-Type': 'application/json',
          },
          JSON.stringify(info),
        );
        setProducts(data.product);
        if (data.product) {
          // if result has matches
          dispatch(setInfoOfProd(data.product.length, data.count));
        } else {
          // if result is empty
          dispatch(setInfoOfProd(0, 0));
        }
      } catch (e) {
        setMessage(true);
      }
    };
    fetchProductList();
  }, [
    dispatch,
    maxOnPage,
    pageNum,
    sort,
    incDec,
    search,
    priceFilter,
    category,
    sale,
    fetching,
  ]);

  const prodList = (products ? (products.map((item) => (
    <Product
      key={item.id}
      title={item.title}
      price={item.price}
      url={item.cover}
      author={item.author}
      id={+item.id}
    />
  ))) : (
    <AlarmText>По вашему запросу нет совпадений</AlarmText>
  ));
  return (
    <BooksWrapper>
      <ProductListTop />
      <ProdGridBox>
        {message ? (
          <AlarmText>Сбой сервера ... перезагрузите страницу</AlarmText>
        ) : (
          prodList
        )}
      </ProdGridBox>
    </BooksWrapper>
  );
};

export default ProductList;
