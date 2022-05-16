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
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <a href='/profile'>Profile</a>
        <LogoutButton />
      </div>
    )
  );
};

export default LoggedIn;