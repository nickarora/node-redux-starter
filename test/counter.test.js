import { shallow } from 'enzyme'
import { PureCounter as Counter } from 'containers'
import { Button } from 'react-bootstrap'

import * as actions from 'actions/counter'
import * as types from 'constants'

import reducer from 'reducers/counter'

// COMPONENT

const setup = () => {
  const counter = 0

  const actionsStub = {
    increment: sinon.stub(),
    decrement: sinon.stub(),
  }

  const component = shallow(
    <Counter counter={counter} actions={actionsStub} />
  )

  return {
    component,
    header: component.find('h1'),
    buttons: component.find(Button),
  }
}

describe('<Counter />', () => {
  it('should render the current count', () => {
    const { header } = setup()
    expect(header.text()).to.contain('Count: 0')
  })

  it('should render increment and decrement buttons', () => {
    const { buttons } = setup()
    expect(buttons.length).to.equal(2)
  })
})

// ACTIONS

describe('Counter Actions', () => {
  it('should create an action to increment the counter', () => {
    const expectedAction = {
      type: types.INCREMENT_COUNTER,
    }

    expect(actions.increment()).to.eql(expectedAction)
  })

  it('should create an action to decrement the counter', () => {
    const expectedAction = {
      type: types.DECREMENT_COUNTER,
    }

    expect(actions.decrement()).to.eql(expectedAction)
  })
})

// REDUCER

describe('Counter Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(0)
  })

  it('should handle INCREMENT_COUNTER', () => {
    expect(reducer(10, { type: types.INCREMENT_COUNTER })).to.equal(11)
  })

  it('should handle DECREMENT_COUNTER', () => {
    expect(reducer(10, { type: types.DECREMENT_COUNTER })).to.equal(9)
  })
})
