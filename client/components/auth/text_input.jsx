import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { Col, Row, Glyphicon } from 'react-bootstrap'

const TextInput = (props) =>
  <Row className='form-group'>
    <Col sm={6}>
      <Field
        name={props.name}
        component={fieldName =>
          <span
            className={
              fieldName.touched &&
              fieldName.error &&
              'has-error'
            }
          >
            <input
              className='form-control' type={props.type}
              placeholder={props.placeholder} {...fieldName}
            />
            {
              fieldName.touched && fieldName.error &&
                <div className='form-field-invalid'>
                  <Glyphicon glyph='exclamation-sign' /> {fieldName.error}
                </div>
            }
          </span>
        }
      />
    </Col>
  </Row>

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}


export default TextInput
