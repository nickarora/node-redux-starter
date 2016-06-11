import React, { PropTypes } from 'react'

import { Nav, Navbar, NavItem } from 'react-bootstrap'

import { IndexLinkContainer } from 'react-router-bootstrap'

const handleSignout = (e, signout) => {
  e.preventDefault()
  signout()
}

const Header = ({ authenticated, signout }) => <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <IndexLinkContainer to={{ pathname: '/' }}>
        <a>Node Redux Starter</a>
      </IndexLinkContainer>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <IndexLinkContainer to={{ pathname: '/' }}>
      <NavItem eventKey={1} href='#'>Home</NavItem>
    </IndexLinkContainer>
    <IndexLinkContainer to={{ pathname: '/counter' }}>
      <NavItem eventKey={2} href='#'>Counter</NavItem>
    </IndexLinkContainer>
    <IndexLinkContainer to={{ pathname: '/todos' }}>
      <NavItem eventKey={3} href='#'>Todos</NavItem>
    </IndexLinkContainer>
    {
      authenticated ?
        <NavItem eventKey={3} href='#' onClick={(e) => handleSignout(e, signout)}>
          Sign Out
        </NavItem> :
      [
        <IndexLinkContainer key={1} to={{ pathname: '/signin' }}>
          <NavItem eventKey={3} href='#'>Sign In</NavItem>
        </IndexLinkContainer>,
        <IndexLinkContainer key={2} to={{ pathname: '/signup' }}>
          <NavItem eventKey={3} href='#'>Sign Up</NavItem>
        </IndexLinkContainer>,
      ]
    }
  </Nav>
</Navbar>

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired,
}

export default Header
