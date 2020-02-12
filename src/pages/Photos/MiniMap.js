/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { Stage, Layer } from 'react-konva';
// pages
import StitchedImage from './StitchedImage';

const MiniMap = ({
  canvasHeight,
  canvasWidth,
  dispatch,
  list,
  scaleDownFactor,
  wrapperRef
}) => {
  const throttledEvents = useRef(throttle(q => handleMouseEvents(q), 300))
    .current;

  const handleMouseEvents = ({ evt, type }) => {
    dispatch({ payload: { evt }, type });
  };

  return (
    <div ref={wrapperRef}>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer
          onMouseMove={({ evt }) => throttledEvents({ evt, type: 'move' })}
          onMouseDown={({ evt }) => throttledEvents({ evt, type: 'down' })}
          onMouseUp={({ evt }) => throttledEvents({ evt, type: 'up' })}
        >
          <StitchedImage
            photoList={list.images}
            scaleDownFactor={scaleDownFactor}
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
  scaleDownFactor: PropTypes.number.isRequired,
  wrapperRef: PropTypes.any.isRequired
};

export default MiniMap;
