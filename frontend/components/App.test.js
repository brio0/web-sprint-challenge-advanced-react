// Write your tests here
import React from 'react'
import AppClass from './AppClass'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'



// test('sanity', () => {
//   expect(true).toBe(false)
// })

test('Renders without errors', () => {
  render(<AppClass />);
})

test('Renders coordinates', () => {
  render(<AppClass />);
  const headerElement = screen.queryByText(/Coordinates/i);
  expect(headerElement).toBeInTheDocument();

})

test('Renders up button', () => {
  render(<AppClass />);
  const upButton = screen.getByRole('button', {
    name: /up/i
  });
  expect(upButton).toBeInTheDocument();

})

test('Renders left button', () => {
  render(<AppClass />);
  const leftButton = screen.getByRole('button', {
    name: /left/i
  });
  expect(leftButton).toBeInTheDocument();

})

test('Renders right button', () => {
  render(<AppClass />);
  const rightButton = screen.getByRole('button', {
    name: /right/i
  });
  expect(rightButton).toBeInTheDocument();

})

test('Renders down button', () => {
  render(<AppClass />);
  const downButton = screen.getByRole('button', {
    name: /down/i
  });
  expect(downButton).toBeInTheDocument();

})

test('Renders reset button', () => {
  render(<AppClass />);
  const resetButton = screen.getByRole('button', {
    name: /reset/i
  });
  expect(resetButton).toBeInTheDocument();

})

test('Renders submit button', () => {
  render(<AppClass />);
  const submitButton = screen.getByRole('button', {
    name: /submit/i
  });
  expect(submitButton).toBeInTheDocument();

})

test('Error message displays when submitting without filling out email input', async () => {
  render(<AppClass />);
  const submitButton = document.querySelector('#submit');
  fireEvent.click(submitButton);

  await waitFor(() => {
    const errorMessage = screen.queryByText(/ouch: email is required/i);
    expect(errorMessage).toBeInTheDocument();
  });
})

test('You cannot go up message displays when you are at the upper grid', async () => {
  render(<AppClass />);
  const upButton = document.querySelector('#up');
  fireEvent.click(upButton);
  fireEvent.click(upButton);

  await waitFor(() => {
    const cannotMessage = screen.queryByText(/you can't go/i)
    expect(cannotMessage).toBeInTheDocument();
  })
})

test('Win message displays when submitting a valid email', async () => {
  render(<AppClass />);
  const submitButton = document.querySelector('#submit');
  const emailInput = document.querySelector("#email");
  fireEvent.change(emailInput, { target: { value: 'lady@gaga.com' } })
  fireEvent.click(submitButton);

  await waitFor(() => {
    const winMessage = screen.queryByText(/win/i);
    expect(winMessage).toBeInTheDocument();
  })
})







