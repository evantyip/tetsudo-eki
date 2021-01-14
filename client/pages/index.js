// Landing Page
//
// Description:
// shows a list of all available tickets

import Link from 'next/link';
import buildClient from '../api/build-client';
// import { getServerSideProps } from 'next';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      <h4>Welcome {currentUser && currentUser.email}</h4>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  // const { data } = await client.get('/api/tickets');
  // return { tickets: data };
};

export default LandingPage;
