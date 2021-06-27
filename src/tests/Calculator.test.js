import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from '../Calculator';

function getButton(val) {
  return screen.getByRole('button', {name: val})
}

function clickButton(val) {
  fireEvent.click(getButton(val))
}

test('lowerVal operations', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  clickButton('1')
  expect(lowerVal.textContent).toBe('1')

  clickButton('1')
  expect(lowerVal.textContent).toBe('11')

  clickButton('+');clickButton('3');clickButton('=')
  expect(lowerVal.textContent).toBe('14')
  expect(expression.textContent).toBe('11+3')
});

test('dot operator cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  clickButton('1');clickButton('.')
  expect(lowerVal.textContent).toBe('1.')

  clickButton('1');clickButton('.');clickButton('+')
  expect(lowerVal.textContent).toBe('1')
  expect(expression.textContent).toBe('1+')

  clickButton('C')
  clickButton('1');clickButton('.');clickButton('1');clickButton('1')
  clickButton('.');clickButton('+')
  expect(lowerVal.textContent).toBe('1.11')
  expect(expression.textContent).toBe('1.11+')
})
