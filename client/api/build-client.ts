import axios from 'axios';

// build Client
// Description:
//
// creates an axios object/instance that can either
// communicate from within server or regular comminucation
// (used in getInitialProps server side rendering)

const buildClient = ({ req }: { req: Request }): any => {
  if (typeof window === 'undefined') {
    // we are on the server
    const baseURL = process.env.BASE_URL;
    return axios.create({
      baseURL,
      // development URL
      //,
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
