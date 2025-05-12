import React from 'react';
import PropTypes from 'prop-types';

function CategoryBadge({
  category,
  onCategoryClick = null,
  isActive = false,
  setPointer = true,
}) {
  return (
    <span
      className={`category-name text-secondary border-dark border rounded px-2 py-1 ${
        isActive ? 'bg-secondary text-white' : ''
      }`}
      style={{ fontSize: '13px', cursor: setPointer ? 'pointer' : 'default' }}
      onClick={() => onCategoryClick && onCategoryClick(category)}
    >
      #{category}
    </span>
  );
}

CategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func,
  isActive: PropTypes.bool,
  setPointer: PropTypes.bool,
};

export default CategoryBadge;
