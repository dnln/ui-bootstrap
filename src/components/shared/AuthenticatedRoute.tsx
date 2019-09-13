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
  const { data, loading } = useQuery(GET_USER);

  if (loading) {
    return <>Loading...</>;
  }

  if (path(["user", "name"], data)) {
    console.log(data);
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    console.log("ere");
    return <Route {...rest} render={() => <Redirect to="/sign-in" />} />;
  }
};
