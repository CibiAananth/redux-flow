import React from 'react';
import PropTypes from 'prop-types';
import Konva from './Konva';

const Photos = ({ list }) => {
  return (
    <>
      <Konva
        list={{
          ...list,
          images: list.images.map(el => ({
            ...el,
            width: 300,
            height: 400
          }))
        }}
      />
    </>
  );
};

// component proptypes
Photos.propTypes = {
  list: PropTypes.object.isRequired
};

export default Photos;
