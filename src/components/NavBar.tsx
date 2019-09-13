import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import { HamburgerButton } from "react-hamburger-button";
import { SlideDown } from "react-slidedown";
import gql from "graphql-tag";
import { useQuery, useApolloClient } from "react-apollo";
import { path } from "ramda";
import useReactRouter from "use-react-router";

import "react-slidedown/lib/slidedown.css";

const NavBarContainer = styled.div`
  width: 100%;
  min-height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBarWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
`;

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

const NavBar: React.FC = () => {
  const { data } = useQuery(GET_USER);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const client = useApolloClient();
  const { history } = useReactRouter();

  const handleSignOutClick = () => {
    localStorage.clear();
    client.resetStore();
    history.push("/sign-in");
  };

  return (
    <NavBarWrapper>
      <Container>
        <Row>
          <Col sm={12}>
            <NavBarContainer>
              <div>My Sweet Logo</div>
              <div>
                <Visible xs sm md>
                  <HamburgerButton
                    open={mobileNavOpen}
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                    width={30}
                    height={15}
                    strokeWidth={4}
                    color="black"
                    animationDuration={0.5}
                  />
                </Visible>
                <Hidden xs sm md>
                  {path(["user", "name"], data) ? (
                    <Link onClick={handleSignOutClick}>Sign out</Link>
                  ) : (
                    <>
                      <Link onClick={() => history.push("/sign-in")}>
                        Sign in
                      </Link>
                      <Link onClick={() => history.push("/sign-up")}>
                        Sign up
                      </Link>
                    </>
                  )}
                </Hidden>
              </div>
            </NavBarContainer>
          </Col>
        </Row>
        <Visible xs sm md>
          <Row>
            <Col>
              <SlideDown>
                {mobileNavOpen ? (
                  <>
                    {path(["user", "name"], data) ? (
                      <MobileLink>Sign out</MobileLink>
                    ) : (
                      <MobileLink>Sign in</MobileLink>
                    )}
                  </>
                ) : null}
              </SlideDown>
            </Col>
          </Row>
        </Visible>
      </Container>
    </NavBarWrapper>
  );
};

export default NavBar;
