import React from 'react'

import { Col, Row, Glyphicon } from 'react-bootstrap'

const Home = () =>
  <Row>
    <Col xs={8}>
      <h3><Glyphicon glyph='home' /> Home</h3>
      <p className='welcome-message'>Welcome to the Node Redux Starter Kit</p>
    </Col>
  </Row>

export default Home
