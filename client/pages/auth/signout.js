import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

// Sign Out Page
//
// Description:
// see title

const signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  // Future maybe make a spinner
  return <div>Signing you out...</div>;
};

export default signout;
