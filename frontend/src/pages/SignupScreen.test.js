/**
 * @jest-environment jsdom
 */

import React from 'react';
import SignupScreen from './SignupScreen';
import {Provider as AuthProvider} from '../context/AuthContext.js';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('signup screen', () => {

  it('should match to snapshot', () => {
    const component = shallow(    
      <AuthProvider>
        <SignupScreen/>
      </AuthProvider>
    )
    expect(component).toMatchSnapshot()
  });

  it('should have a username, email and password field', () => {
    const component = mount(    
      <AuthProvider>
        <SignupScreen />
      </AuthProvider>
    )
    expect(component.find('TextInput').first().prop('placeholder')).toEqual('Username')
    expect(component.find('TextInput').at(2).prop('placeholder')).toEqual('Email')
    expect(component.find('TextInput').at(4).prop('placeholder')).toEqual('Password')
  });

  it('should have a signup button', () => {
    const component = mount(    
      <AuthProvider>
        <SignupScreen/>
      </AuthProvider>
    )
    expect(component.find('Button').first().prop('title')).toEqual('Sign Up')
  });

});