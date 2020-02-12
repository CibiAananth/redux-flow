/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva';
import StitchedImage from './StitchedImage';

const styles = {
  imageLayer: {
    display: 'flex'
  },
  wrapper: {
    overflow: 'auto'
  }
};

const ImageNode = ({ url, ...rest }) => {
  const [image] = useImage(url);
  return (image && <Image {...rest} image={image} />) || null;
};

ImageNode.propTypes = {
  url: PropTypes.string.isRequired
};

const ShelfCanvas = ({ canvasHeight, canvasWidth, list, wrapperRef }) => {
  return (
    <>
      <div ref={wrapperRef} style={styles.wrapper}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <Layer>
            <StitchedImage photoList={list.images} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

ShelfCanvas.propTypes = {
  canvasHeight: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  list: PropTypes.object.isRequired,
  wrapperRef: PropTypes.any.isRequired
};

export default ShelfCanvas;
