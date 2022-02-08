import React from 'react';
import renderer from 'react-test-renderer';
import SignupScreen from './SignupScreen';
import {Provider as AuthProvider} from '../context/AuthContext.js';
import {Context as AuthContext} from '../context/AuthContext';

test('renders correctly', () => {
  const tree = renderer.create(
    <AuthProvider>
      <SignupScreen />
    </AuthProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});