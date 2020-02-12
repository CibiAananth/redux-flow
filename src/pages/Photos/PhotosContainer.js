import React, { Component } from 'react';
import PropTypes from 'prop-types';
// redux-utils
import { connect } from 'react-redux';
import { photosActions } from 'redux-utils/actions';

import Photos from 'pages/Photos/Photos';

class PhotosContainer extends Component {
  constructor(props) {
    super(props);
    const { getPhotosFromAPI } = this.props;
    getPhotosFromAPI({
      payload: { params: { version: 2 } }
    });
  }

  render() {
    const { photosList } = this.props;

    console.log('photosList', photosList);
    return Object.keys(photosList).length > 0 ? (
      <Photos list={photosList} />
    ) : null;
  }
}

PhotosContainer.propTypes = {
  getPhotosFromAPI: PropTypes.func.isRequired,
  photosList: PropTypes.object.isRequired
};

/*
  Connect dispatch methods to props so that you can call the methods
  from the scope of the component's props
*/
const mapStateToProps = state => ({
  photosList: state.photo.photos.list
});

/*
  Connect dispatch methods to props so that you can call the methods
  from the scope of the component's props
*/
const mapDispatchToProps = {
  getPhotosFromAPI: photosActions.getPhotosAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotosContainer);
