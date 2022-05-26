import React from "react";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const LoggedIn = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <p><b>Email:</b>  {user.email}</p><br></br>
        <p><b>Last Updated:</b>  {user.updated_at}</p><br></br><br></br>
        <LogoutButton />
      </div>
    )
  );
};

export default LoggedIn;