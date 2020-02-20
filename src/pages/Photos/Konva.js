/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, {
  createRef,
  useReducer,
  useEffect,
  useCallback,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { sumBy } from 'lodash';
// components
import MiniMap from './MiniMap';
import ShelfCanvas from './ShelfCanvas';

const scaleDownValues = (value, factor) => {
  return value / factor;
};

const scaleUpValues = (value, factor) => {
  return value * factor;
};

const initialState = {
  miniMap: {
    miniMapDragging: false,
    activeArea: [0, 0],
    scaleDownFactor: 10
  },
  shelfCanvas: {
    canvasScroll: false,
    width: 0,
    activeArea: [0, 0]
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_SHELF_CANVAS':
      return {
        ...state,
        shelfCanvas: { ...state.shelfCanvas, ...action.payload },
        miniMap: {
          ...state.miniMap,
          scaleDownFactor: action.payload.scaleDownFactor,
          activeArea: [
            scaleDownValues(
              action.payload.activeArea[0],
              action.payload.scaleDownFactor
            ),
            scaleDownValues(
              action.payload.activeArea[1],
              action.payload.scaleDownFactor
            )
          ]
        }
      };
    case 'MINIMAP_WINDOW_DRAG': {
      return {
        ...state,
        shelfCanvas: {
          ...state.shelfCanvas,
          canvasScroll: false,
          activeArea: [
            scaleUpValues(
              action.payload.activeArea[0],
              action.payload.scaleDownFactor
            ),
            scaleUpValues(
              action.payload.activeArea[1],
              action.payload.scaleDownFactor
            )
          ]
        },
        miniMap: {
          ...state.miniMap,
          miniMapDragging: true,
          activeArea: [...action.payload.activeArea]
        }
      };
    }
    case 'SHELF_CANVAS_SCROLL_EVENT': {
      return {
        ...state,
        shelfCanvas: {
          ...state.shelfCanvas,
          canvasScroll: true,
          activeArea: [
            action.payload.event.scrollLeft,
            action.payload.event.scrollLeft + state.shelfCanvas.width
          ]
        },
        miniMap: {
          ...state.miniMap,
          miniMapDragging: false,
          activeArea: [
            scaleDownValues(
              action.payload.event.scrollLeft,
              state.miniMap.scaleDownFactor
            ),
            scaleDownValues(
              action.payload.event.scrollLeft + state.shelfCanvas.width,
              state.miniMap.scaleDownFactor
            )
          ]
        }
      };
    }
    default:
      return state;
  }
};

const Konva = ({ list }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchLogger = params => {
    console.log('dispatch', params);
    dispatch(params);
  };

  // function scope
  const miniMapScaleDownFactor = 10;

  const shelfCanvasRef = createRef();
  const shelfCanvasWidth = sumBy(list.images, x => x.width);
  const shelfCanvasHeight = list.images[0].height;

  const miniMapCanvasRef = createRef();
  const miniMapCanvasWidth = scaleDownValues(
    shelfCanvasWidth,
    miniMapScaleDownFactor
  );
  const miniMapCanvasHeight = scaleDownValues(
    shelfCanvasHeight,
    miniMapScaleDownFactor
  );

  let updateState = useCallback(() => {
    const { current } = shelfCanvasRef;
    const { width } = current.getBoundingClientRect();
    dispatchLogger({
      type: 'REGISTER_SHELF_CANVAS',
      payload: {
        width,
        activeArea: [current.scrollLeft, current.scrollLeft + width],
        scaleDownFactor: miniMapScaleDownFactor
      }
    });
  }, [shelfCanvasRef]);
  updateState = useRef(updateState).current;

  useEffect(() => {
    updateState();
  }, [updateState]);

  const handleButtonClick = ref => {
    ref.current.scrollBy({
      top: 0,
      left: 500,
      behavior: 'smooth'
    });
  };

  console.log('shelfCanvas', state);

  return (
    <>
      <ShelfCanvas
        canvasHeight={shelfCanvasHeight}
        canvasWidth={shelfCanvasWidth}
        dispatch={dispatchLogger}
        handleButtonClick={handleButtonClick}
        list={list}
        reducerState={state}
        wrapperRef={shelfCanvasRef}
      />
      <div style={{ height: 40 }} />
      <MiniMap
        canvasHeight={miniMapCanvasHeight}
        canvasWidth={miniMapCanvasWidth}
        dispatch={dispatchLogger}
        list={list}
        reducerState={state}
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

// let moveShelfCanvas = useCallback(() => {
//   const { current } = shelfCanvasRef;
//   current.scrollTo({
//     top: 0,
//     left: state.shelfCanvas.activeArea[0],
//     behavior: 'smooth'
//   });
// }, [shelfCanvasRef, state.shelfCanvas.activeArea]);
// moveShelfCanvas = useRef(moveShelfCanvas).current;

// useEffect(() => {
//   updateState();
// }, [updateState]);

// useEffect(() => {
//   moveShelfCanvas();
// }, [moveShelfCanvas]);
