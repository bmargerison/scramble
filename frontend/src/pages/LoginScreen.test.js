/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import LoginScreen from './LoginScreen';
 import {Provider as AuthProvider} from '../context/AuthContext.js';
 import { shallow, mount } from 'enzyme';
 import Enzyme from 'enzyme';
 import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
 
 Enzyme.configure({ adapter: new Adapter() });
 
 describe('login screen', () => {
 
   it('should match to snapshot', () => {
     const component = shallow(    
       <AuthProvider>
         <LoginScreen/>
       </AuthProvider>
     )
     expect(component).toMatchSnapshot()
   });
 
   it('should have a email and password field', () => {
     const component = mount(    
       <AuthProvider>
         <LoginScreen />
       </AuthProvider>
     )
     expect(component.find('TextInput').first().prop('placeholder')).toEqual('Email')
     expect(component.find('TextInput').at(2).prop('placeholder')).toEqual('Password')
   });
 
   it('should have a login button', () => {
     const component = mount(    
       <AuthProvider>
         <LoginScreen/>
       </AuthProvider>
     )
     expect(component.find('Button').first().prop('title')).toEqual('Login')
   });
 
 });