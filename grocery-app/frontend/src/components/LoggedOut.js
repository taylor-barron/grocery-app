import React from "react";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const LoggedIn = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    !isAuthenticated && (
      <div>
        <LoginButton />
      </div>
    )
  );
};

export default LoggedIn;