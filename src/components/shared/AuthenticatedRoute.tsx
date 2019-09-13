import React from "react";
import { Route, Redirect } from "react-router";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { path } from "ramda";

const GET_USER = gql`
  {
    user {
      name
    }
  }
`;

export const AuthenticatedRoute = ({ component: Component, ...rest }: any) => {
  const { data } = useQuery(GET_USER);

  if (path(["user", "name"], data)) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    return <Route {...rest} render={() => <Redirect to="/sign-in" />} />;
  }
};
