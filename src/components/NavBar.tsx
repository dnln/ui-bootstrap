import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import { HamburgerButton } from "react-hamburger-button";
import { SlideDown } from "react-slidedown";

import NavBarLinks from "./NavBarLinks";

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

const NavBar: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

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
                  <NavBarLinks />
                </Hidden>
              </div>
            </NavBarContainer>
          </Col>
        </Row>
        <Visible xs sm md>
          <Row>
            <Col>
              <SlideDown>{mobileNavOpen ? <NavBarLinks /> : null}</SlideDown>
            </Col>
          </Row>
        </Visible>
      </Container>
    </NavBarWrapper>
  );
};

export default NavBar;
