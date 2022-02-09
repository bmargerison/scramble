
import React from 'react';
import renderer from 'react-test-renderer';
import SignupScreen from './SignupScreen';
import {Provider as AuthProvider} from '../context/AuthContext.js';
import {Context as AuthContext} from '../context/AuthContext';
import {cleanup, fireEvent, render} from '@testing-library/react';

import ReactDOM from 'react-dom';
afterEach(cleanup);

test('renders correctly', () => {
  const tree = renderer.create(
    <AuthProvider>
      <SignupScreen />
    </AuthProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('renders individual elements', () => {
  const {queryByLabelText} = render(
    <AuthProvider>
      <SignupScreen />
    </AuthProvider>
  )
  console.log(queryByLabelText('Sign up'))
});