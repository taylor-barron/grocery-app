import React from "react";
import Header from "../components/Header";
import LoggedIn from '../components/LoggedIn'
import LoggedOut from '../components/LoggedOut'
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="profile-container">
    <Header />
    <LoggedIn />
    <LoggedOut />
    </div>
  );
};

export default Profile;