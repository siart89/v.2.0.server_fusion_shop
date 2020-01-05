import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FilterForm, FilterTitle, Label } from '../listFilterStyles';
import setCategory from '../../../../store/actions/setCategory';

const CategoryFilter = () => {
  const category = useSelector((state) => state.category);
  const activeCategory = useSelector((state) => state.products.category);
  const dispatch = useDispatch();

  const handleCategoryFilter = (value) => {
    if (value !== 'Все') {
      dispatch(setCategory(value));
    } else {
      dispatch(setCategory(''));
    }
  };

  const compareCategory = (cur, act) => {
    if (cur === act) return true;
    if (cur === 'Все' && act === '') return true;
    return false;
  };

  return (
    <FilterForm name="category">
      <FilterTitle>
        Категории
      </FilterTitle>
      {category.map((item) => (
        <Label
          key={item}
          htmlFor={item}
          onChange={(e) => handleCategoryFilter(e.target.value)}
          isactive={compareCategory(item, activeCategory)}
        >
          <input
            type="radio"
            name="category"
            id={item}
            value={item}
          />
          {item}
        </Label>
      ))}
    </FilterForm>
  );
};


export default CategoryFilter;
