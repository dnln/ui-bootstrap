import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import styled from "styled-components";

import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { AuthenticatedRoute } from "./shared/AuthenticatedRoute";

const BodyWrapper = styled.div`
  margin-top: 4rem;
`;

const App: React.FC = () => {
  return (
    <Switch>
      <>
        <NavBar />
        <BodyWrapper>
          <Container>
            <Row>
              <Col>
                <Route exact path="/sign-in" component={SignIn} />
                <Route exact path="/sign-up" component={SignUp} />
                <AuthenticatedRoute
                  exact
                  path="/dashboard"
                  component={Dashboard}
                />
              </Col>
            </Row>
          </Container>
        </BodyWrapper>
      </>
    </Switch>
  );
};

export default App;
