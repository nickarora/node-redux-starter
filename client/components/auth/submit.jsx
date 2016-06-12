import React, { PropTypes } from 'react'
import { Col, Row, Button } from 'react-bootstrap'

const Submit = (props) =>
  <Row className='form-group'>
    <Col sm={6}>
      <Button
        className='form-control'
        bsStyle='success'
        type='submit'
      >{props.label}</Button>
    </Col>
  </Row>

Submit.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Submit
