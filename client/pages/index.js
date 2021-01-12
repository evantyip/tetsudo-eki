// Landing Page
//
// Description:
// shows a list of all available tickets

import Link from 'next/link';

const LandingPage = ({ currentUser }) => {
  return (
    <div>
      <h4>Welcome {currentUser && currentUser.email}</h4>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
