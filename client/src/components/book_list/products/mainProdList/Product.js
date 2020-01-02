import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ProductCont,
  ProdTitle,
  ProdAuthor,
  CoverBox,
  ProdCover,
} from './styles';
import PriceInfo from '../../../bookCard/PriceInfo';

const Product = ({
  url,
  title,
  price,
  author,
  id,
}) => {
  const [isHover, setIsHover] = useState(false);

  const formatingText = (text, name) => {
    if (name === 'title' && text.length > 38) {
      return `${text.slice(0, 37)}...`;
    }
    if (name === 'author' && text.length > 25) {
      return `${text.slice(0, 24)}...`;
    }
    return text;
  };

  return (
    <ProductCont
      hover={isHover}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CoverBox hover={isHover}>
        <Link to={`/book/${id}`} style={{ textDecoration: 'none' }}>
          <ProdCover src={url} />
        </Link>
      </CoverBox>

      <ProdTitle hover={isHover}>
        {formatingText(title, 'title')}
      </ProdTitle>
      <ProdAuthor>
        {formatingText(author, 'author')}
      </ProdAuthor>
      <PriceInfo
        price={price}
        bookId={id}
        small
        isHover={isHover}
      />
    </ProductCont>
  );
};

Product.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Product;
