import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from './Calculator';

function getButton(val) {
  return screen.getByRole('button', {name: val})
}

test('lowerVal operations', () => {
  render(<Calculator />);

  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  fireEvent.click(getButton('1'))
  expect(lowerVal.textContent).toBe('1')

  fireEvent.click(getButton('1'))
  expect(lowerVal.textContent).toBe('11')

  fireEvent.click(getButton('+'))
  fireEvent.click(getButton('3'))
  fireEvent.click(getButton('='))
  expect(lowerVal.textContent).toBe('14')
  expect(expression.textContent).toBe('11+3')
});

// test('displays: 11', () => {
//   render(<Calculator />);
//   const lowerVal = screen.getByTestId('lowerVal')
//   fireEvent.click(getButton('1'))
// });
