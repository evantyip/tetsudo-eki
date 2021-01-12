import axios from 'axios';

// build Client
// Description:
//
// creates an axios object/instance that can either
// communicate from within server or regular comminucation
// (used in getInitialProps server side rendering)
const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server

    return axios.create({
      // Production URL
      // baseURL: 'http://www.tetsudoeki.com',

      // development URL
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // we are on the browser

    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
