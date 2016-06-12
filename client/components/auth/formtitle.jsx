import React, { PropTypes } from 'react'
import { Col, Row } from 'react-bootstrap'

const FormTitle = (props) =>
  <Row className='form-group'>
    <Col sm={6}>
      <h3>{props.title}</h3>
    </Col>
  </Row>

FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default FormTitle
