/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useImage from 'use-image';
import { debounce } from 'lodash';
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

const ShelfCanvas = ({
  canvasHeight,
  canvasWidth,
  dispatch,
  list,
  reducerState,
  wrapperRef
}) => {
  const [userScroll, setUserScroll] = useState(false);
  useEffect(() => {
    if (!userScroll) {
      const { current: canvasRef } = wrapperRef;
      canvasRef.scrollTo({
        top: 0,
        left: reducerState.shelfCanvas.activeArea[0],
        behavior: 'smooth'
      });
    }
  }, [reducerState.shelfCanvas, wrapperRef, userScroll]);

  const handleCanvasScroll = ({ event, toDispatch }) => {
    if (event && toDispatch) {
      const { target } = event;
      dispatch({
        payload: { event: target },
        type: 'SHELF_CANVAS_SCROLL_EVENT'
      });
    }
  };
  const throttledScroll = useRef(debounce(q => handleCanvasScroll(q), 500))
    .current;

  const [mouseEvent, setMouseEvent] = useState(null);

  useEffect(() => {
    throttledScroll({
      event: mouseEvent,
      toDispatch: userScroll
    });
  }, [mouseEvent, userScroll, throttledScroll]);

  useEffect(() => {
    const { current: canvasRef } = wrapperRef;
    const scrollListener = canvasRef.addEventListener('scroll', e => {
      setMouseEvent(e);
    });
    return () => {
      canvasRef.removeEventListener('scroll', scrollListener);
    };
  }, [wrapperRef]);

  return (
    <>
      <div ref={wrapperRef} style={styles.wrapper}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <Layer
            onMouseOver={() => setUserScroll(true)}
            onMouseLeave={() => setUserScroll(false)}
          >
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
  dispatch: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  reducerState: PropTypes.object.isRequired,
  wrapperRef: PropTypes.any.isRequired
};

export default ShelfCanvas;
