/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { Layer, Rect, Stage } from 'react-konva';
// pages
import StitchedImage from './StitchedImage';

const MiniMap = ({
  canvasHeight,
  canvasWidth,
  dispatch,
  list,
  reducerState,
  scaleDownFactor,
  wrapperRef
}) => {
  const throttledEvents = useRef(throttle(q => handleRectDrag(q), 300)).current;

  const [rectStart, rectEnd] = reducerState.miniMap.activeArea;

  const handleRectDrag = ({
    position: { x },
    rectEnd: end,
    rectStart: start
  }) => {
    dispatch({
      payload: { activeArea: [x, end + x - start], scaleDownFactor },
      type: 'MINIMAP_WINDOW_DRAG'
    });
  };

  return (
    <div ref={wrapperRef}>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          <StitchedImage
            photoList={list.images}
            scaleDownFactor={scaleDownFactor}
          />
          <Rect
            x={0}
            y={0}
            width={rectEnd - rectStart}
            height={canvasHeight}
            stroke="red"
            draggable
            dragBoundFunc={({ x }) => {
              const minPos = 0;
              const maxPos = canvasWidth - (rectEnd - rectStart);
              const position = {
                x: x <= minPos ? 0 : x >= maxPos ? maxPos : x,
                y: 0
              };
              throttledEvents({ position, rectEnd, rectStart });
              return position;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

MiniMap.propTypes = {
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  reducerState: PropTypes.object.isRequired,
  scaleDownFactor: PropTypes.number.isRequired,
  wrapperRef: PropTypes.any.isRequired
};

export default MiniMap;
