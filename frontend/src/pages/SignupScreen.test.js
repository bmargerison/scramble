/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import SignupScreen from './SignupScreen';
import {Provider as AuthProvider} from '../context/AuthContext.js';
import {cleanup, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup);

test('renders correctly', () => {
  const tree = renderer.create(
    <AuthProvider>
      <SignupScreen />
    </AuthProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('renders individual elements', async () => {
  const { findAllByText, findAllByPlaceholderText } = render(
    <AuthProvider>
      <SignupScreen />
    </AuthProvider>
  )

  const signup = await findAllByText('Sign Up')
  expect(signup.length).toBe(1)

  const username = await findAllByPlaceholderText('Username')
  expect(username.length).toBe(1)

  const email = await findAllByPlaceholderText('Email')
  expect(email.length).toBe(1)

  const password = await findAllByPlaceholderText('Password')
  expect(password.length).toBe(1)
});