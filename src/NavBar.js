import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';

const StyledNav = styled.nav`
  height: 50px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #4682B4;
  font-size: 105%;
  position: fixed;
  z-index: 1;
  box-shadow 1px 1px 18px #4683b451;
`;

const StyledRouteLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 30px;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 15px;
  margin: 0px 1px;
  color: white;
  font-weight: 400;
  height: 100%;

  &:hover {
    background-color: gray;
  }

  &.active {
    font-weight: 800;
  }
`;

const StyledLogoutButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 15px;
  margin: 0px 1px;
  color: white;
  font-weight: 400;
  height: 100%;
  width: 80px;
  border: none;

  &:hover {
    background-color: gray;
    cursor: pointer;
  }

  &.active {
    font-weight: 800;
  }
`;

const StyledCompanyLink = styled(StyledNavLink)`
  width: 120px;
`;
const StyledJobsLink = styled(StyledNavLink)`
  width: 60px;
`;
const StyledProfileLink = styled(StyledNavLink)`
  width: 70px;
`;
const StyledLoginLink = styled(StyledNavLink)`
  width: 60px;
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    // Access to history is granted by the withRouter export
    this.props.history.push('/');
  }

  render() {
    const display = this.props.token ? (
      <StyledRouteLinkContainer>
        <StyledCompanyLink exact to="/companies">
          Companies
        </StyledCompanyLink>
        <StyledJobsLink exact to="/jobs">
          Jobs
        </StyledJobsLink>
        <StyledProfileLink exact to="/profile">
          Profile
        </StyledProfileLink>
        <StyledLogoutButton onClick={this.handleLogout}>
          Logout
        </StyledLogoutButton>
      </StyledRouteLinkContainer>
    ) : (
      <StyledRouteLinkContainer>
        <StyledLoginLink exact to="/login">
          Login
        </StyledLoginLink>
      </StyledRouteLinkContainer>
    );

    return (
      <StyledNav>
        <StyledNavLink exact to="/">
          Jobly
        </StyledNavLink>
        {display}
      </StyledNav>
    );
  }

  state = {};
}

Navbar.propTypes = {};

Navbar.defaultProps = {
  token: ''
};

export default withRouter(Navbar);
