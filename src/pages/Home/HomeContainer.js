import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// redux-utils
import { connect } from 'react-redux';
import { photosActions } from 'redux-utils/actions';

const Home = ({ getPhotosFromAPI }) => {
  useEffect(() => {
    getPhotosFromAPI({
      payload: { params: { version: 2 } }
    });
  }, []);

  return <div>hello from home</div>;
};

// component proptypes
Home.propTypes = {
  getPhotosFromAPI: PropTypes.func.isRequired
};

/*
  Connect dispatch methods to props so that you can call the methods
  from the scope of the component's props
*/
const mapDispatchToProps = {
  getPhotosFromAPI: photosActions.getPhotosAction
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
