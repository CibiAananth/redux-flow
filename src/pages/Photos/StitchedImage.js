/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useImage from 'use-image';
import { Image } from 'react-konva';

const ImageNode = ({ url, ...rest }) => {
  const [image] = useImage(url);
  return (image && <Image {...rest} image={image} />) || null;
};

ImageNode.propTypes = {
  url: PropTypes.string.isRequired
};

const StitchedImage = ({ photoList, scaleDownFactor, nativeProps }) => {
  let nextXPosition = 0;
  return (
    photoList &&
    photoList.map((image, i) => {
      const item = i > 0 ? photoList[i - 1] : image;
      nextXPosition += i > 0 ? item.width / scaleDownFactor : 0;

      return (
        <ImageNode
          {...nativeProps}
          key={image.id}
          url={image.scaled_img}
          x={nextXPosition}
          width={item.width / scaleDownFactor}
          height={item.height / scaleDownFactor}
        />
      );
    })
  );
};

StitchedImage.propTypes = {
  photoList: PropTypes.array.isRequired,
  scaleDownFactor: PropTypes.number,
  nativeProps: PropTypes.object
};

StitchedImage.defaultProps = {
  scaleDownFactor: 1,
  nativeProps: {}
};

export default StitchedImage;
