import React from 'react'

import { Nav, Navbar, NavItem } from 'react-bootstrap'

import { IndexLinkContainer } from 'react-router-bootstrap'

const Header = () => <Navbar>
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
    <IndexLinkContainer to={{ pathname: '/signin' }}>
      <NavItem eventKey={3} href='#'>Signin</NavItem>
    </IndexLinkContainer>
  </Nav>
</Navbar>

export default Header
