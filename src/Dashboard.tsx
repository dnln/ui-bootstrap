import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_INFO = gql`
  {
    info
  }
`;

export default class Dashboard extends Component {
  render() {
    return (
      <Query query={GET_INFO}>
        {({ loading, error, data }: any) =>
          !loading && !error && data ? <>{data.info}</> : null
        }
      </Query>
    );
  }
}
