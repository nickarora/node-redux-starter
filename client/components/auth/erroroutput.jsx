import React, { PropTypes } from 'react'
import { Col, Row } from 'react-bootstrap'

const ErrorOutput = (props) =>
  <Row className='form-group'>
    <Col sm={6}>
      <div className='alert alert-danger text-center'>{props.error}</div>
    </Col>
  </Row>

ErrorOutput.propTypes = {
  error: PropTypes.string.isRequired,
}

export default ErrorOutput
