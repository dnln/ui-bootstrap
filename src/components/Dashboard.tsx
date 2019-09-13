import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_USER = gql`
  {
    user {
      name
    }
  }
`;

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) {
    return <>Loading...</>;
  }

  if (error || (data && data.error)) {
    return <>Error: {error}</>;
  }

  return <>Hello {data.user.name}</>;
};

export default Dashboard;
