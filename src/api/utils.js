import axios from 'api/axios';

const get = ({ apiURL, params = {} }) => {
  const config = {
    headers: { Authorization: 'token fe4ab4049caaff4bd11ef7922aed70b19b3d1e75' }
  };
  config.params = params;
  return axios
    .get(apiURL, config)
    .then(response => ({
      request: params,
      response: response.data,
      error: null
    }))
    .catch(error => ({
      request: params,
      response: null,
      error
    }));
};

// eslint-disable-next-line import/prefer-default-export
export { get };
