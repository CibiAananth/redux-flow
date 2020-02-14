/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
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
  const [rectCoords, setRectCoords] = useState([0, 0]);

  useEffect(() => {
    if (!reducerState.miniMap.miniMapDragging) {
      const [rectStart, rectEnd] = reducerState.miniMap.activeArea;
      setRectCoords([rectStart, rectEnd]);
    }
  }, [reducerState.miniMap]);

  const handleRectDrag = ({
    position: { x },
    rectEnd: end,
    rectStart: start
  }) => {
    dispatch({
      payload: {
        activeArea: [x, end + x - start],
        scaleDownFactor
      },
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
            x={rectCoords[0]}
            y={0}
            width={rectCoords[1] - rectCoords[0]}
            height={canvasHeight}
            stroke="red"
            draggable
            dragBoundFunc={({ x }) => {
              const minPos = 0;
              const maxPos = canvasWidth - (rectCoords[1] - rectCoords[0]);
              const position = {
                x: x <= minPos ? 0 : x >= maxPos ? maxPos : x,
                y: 0
              };
              throttledEvents({
                position,
                rectEnd: rectCoords[1],
                rectStart: rectCoords[0]
              });
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
