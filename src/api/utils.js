import axios from 'api/axios';

const get = ({ apiURL, params = {} }) => {
  const config = {
    header: { Authorization: 'token a5d7d2aebc1e57f45a22beef858feba519e50912' }
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
