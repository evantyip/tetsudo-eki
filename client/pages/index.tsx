// Landing Page
//
// Description:
// shows a list of all available tickets

import Link from 'next/link';

interface CurrentUser {
  email: string;
  id: string;

}
const LandingPage = ({ currentUser }: {currentUser: CurrentUser}) => {
  console.log(currentUser)
  return (
    <div>
      <h4>Welcome {currentUser && currentUser.email}</h4>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser: CurrentUser) => {
  return {};
};

export default LandingPage;
