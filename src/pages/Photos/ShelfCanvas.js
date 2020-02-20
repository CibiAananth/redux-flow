/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce, throttle } from 'lodash';
import { Stage, Layer, Rect } from 'react-konva';
import StitchedImage from './StitchedImage';

const styles = {
  imageLayer: {
    display: 'flex'
  },
  wrapper: {
    overflow: 'auto'
  }
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

  const throttledMouseEvents = useRef(throttle(q => handleMouseEvents(q), 800))
    .current;

  const handleMouseEvents = e => {
    setUserScroll(e);
  };

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
  const throttledScroll = useCallback(
    useRef(debounce(q => handleCanvasScroll(q), 0)).current
  );

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

  console.log('list', list);

  return (
    <>
      <div ref={wrapperRef} style={styles.wrapper}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <Layer
            onMouseOver={() => throttledMouseEvents(true)}
            onMouseLeave={() => throttledMouseEvents(false)}
          >
            <StitchedImage photoList={list.images} />
            {/* {list.variants[0].bounding_boxes.map((box, i) => {
              return (
                <Rect
                  key={i + box.left * box.right}
                  x={(box.left / 450) * 300}
                  y={(box.top / 800) * 400}
                  width={((box.right - box.left) / 450) * 300}
                  height={((box.bottom - box.top) / 800) * 400}
                  stroke="red"
                />
              );
            })} */}
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
