/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { createRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import { sumBy } from 'lodash';
import MiniMap from './MiniMap';
import ShelfCanvas from './ShelfCanvas';

const initialState = {
  type: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'move':
      return { type: 'move' };
    case 'up':
      return { type: 'up' };
    case 'down':
      return { type: 'down' };
    default:
      return state;
  }
};

const Konva = ({ list }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('state', state);
  const shelfCanvasRef = createRef();
  const miniMapCanvasRef = createRef();

  const miniMapScaleDownFactor = 10;

  const shelfCanvasWidth = sumBy(list.images, x => x.width);
  const shelfCanvasHeight = list.images[0].height;

  const miniMapCanvasWidth = shelfCanvasWidth / miniMapScaleDownFactor;
  const miniMapCanvasHeight = shelfCanvasHeight / miniMapScaleDownFactor;

  const handleButtonClick = ref => {
    ref.current.scrollBy({
      top: 0,
      left: 500,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <ShelfCanvas
        canvasHeight={shelfCanvasHeight}
        canvasWidth={shelfCanvasWidth}
        dispatch={dispatch}
        handleButtonClick={handleButtonClick}
        list={list}
        wrapperRef={shelfCanvasRef}
      />
      <div style={{ height: 40 }} />
      <MiniMap
        canvasHeight={miniMapCanvasHeight}
        canvasWidth={miniMapCanvasWidth}
        dispatch={dispatch}
        list={list}
        scaleDownFactor={miniMapScaleDownFactor}
        wrapperRef={miniMapCanvasRef}
      />
      <div style={{ height: 40 }} />
      <button
        onClick={() => {
          handleButtonClick(shelfCanvasRef);
        }}
      >
        click
      </button>
    </>
  );
};

Konva.propTypes = {
  list: PropTypes.object.isRequired
};

export default Konva;
