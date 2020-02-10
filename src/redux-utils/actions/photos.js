import { createAction } from '@reduxjs/toolkit';
import { photoTypes } from 'redux-utils/types';
import reducerModel from 'models/reducerModel';

const getPhotosAction = ({
  payload,
  meta = { reducerID: [reducerModel.photo.id] }
}) => {
  const action = createAction(photoTypes.getPhotos.request)(payload);
  action.meta = meta;
  return action;
};

// eslint-disable-next-line import/prefer-default-export
export { getPhotosAction };
