import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useApolloClient } from "react-apollo";
import { path } from "ramda";
import useReactRouter from "use-react-router";
import { Visible, Hidden } from "react-grid-system";

const Link = styled.span`
  cursor: pointer;
  margin-left: 2rem;
  color: #a7adb8;

  &:hover {
    color: #73767d;
  }
`;

const MobileLink = styled.div`
  cursor: pointer;
  color: #a7adb8;
  margin-bottom: 1rem;
`;

const GET_USER = gql`
  {
    user {
      name
    }
  }
`;

const NavBarLinks: React.FC = () => {
  const { data } = useQuery(GET_USER);
  const client = useApolloClient();
  const { history } = useReactRouter();

  const handleSignOutClick = () => {
    localStorage.clear();
    client.resetStore();
    history.push("/sign-in");
  };

  if (path(["user", "name"], data)) {
    return (
      <>
        <Visible xs sm md>
          <MobileLink onClick={handleSignOutClick}>Sign out</MobileLink>;
        </Visible>
        <Hidden xs sm md>
          <Link onClick={handleSignOutClick}>Sign out</Link>
        </Hidden>
      </>
    );
  } else {
    return (
      <>
        <Visible xs sm md>
          <MobileLink onClick={() => history.push("/sign-in")}>
            Sign in
          </MobileLink>
          <MobileLink onClick={() => history.push("/sign-up")}>
            Sign up
          </MobileLink>
        </Visible>
        <Hidden xs sm md>
          <Link onClick={() => history.push("/sign-in")}>Sign in</Link>
          <Link onClick={() => history.push("/sign-up")}>Sign up</Link>
        </Hidden>
      </>
    );
  }
};

export default NavBarLinks;
