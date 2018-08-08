/* eslint-env jest */

import React from 'react'
import { mount, configure } from 'enzyme'
import { Input } from 'antd'
import Adapter from 'enzyme-adapter-react-16'
import 'mermaid'

import App from '../src/components/App'
import { defaultState } from '../src/utils'

configure({ adapter: new Adapter() })

let wrapper = null
beforeEach(() => {
  wrapper = mount(<App />)
})

const verifyTextArea = (code) => {
  const textArea = wrapper.find(Input.TextArea).first()
  expect(textArea).toBeDefined()
  expect(textArea.props().value).toEqual(code)
}

test('/', () => {
  verifyTextArea(defaultState.scl)
})
