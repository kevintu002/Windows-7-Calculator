import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from '../Calculator';

function getButton(val) {
  return screen.getByRole('button', {name: val})
}

function clickButton(val) {
  fireEvent.click(getButton(val))
}

function clickSeriesOfButtons(str) {
  str.split('').forEach(key => {
    clickButton(key)
  });
}

test('lowerVal operations', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  clickButton('C')
  clickButton('1')
  expect(lowerVal.textContent).toBe('1')

  clickButton('1')
  expect(lowerVal.textContent).toBe('11')

  clickButton('+');clickButton('3');clickButton('=')
  expect(expression.textContent).toBe('11+3')
  expect(lowerVal.textContent).toBe('14')
});

test('dot operator cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 1.+
  clickButton('C')
  clickButton('1');clickButton('.');clickButton('+')
  expect(expression.textContent).toBe('1+')
  expect(lowerVal.textContent).toBe('1')

  // 1.1.+
  clickButton('C')
  clickButton('1');clickButton('.')
  clickButton('1');clickButton('.');clickButton('+')
  expect(expression.textContent).toBe('1.1+')
  expect(lowerVal.textContent).toBe('1.1')

  // 1+CE-
  clickButton('C')
  clickButton('1');clickButton('+');clickButton('CE');clickButton('-')
  expect(expression.textContent).toBe('1+0-')
  expect(lowerVal.textContent).toBe('1')

  // 1.11.+
  clickButton('C')
  clickButton('1');clickButton('.');clickButton('1');clickButton('1')
  clickButton('.');clickButton('+')
  expect(expression.textContent).toBe('1.11+')
  expect(lowerVal.textContent).toBe('1.11')

  // +.=
  clickButton('C')
  clickButton('+');clickButton('.');clickButton('=')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')

  // 1+2=CE=
  clickButton('C')
  clickButton('1');clickButton('+');clickButton('2');clickButton('=');clickButton('CE');clickButton('=')
  expect(expression.textContent).toBe('0+2')
  expect(lowerVal.textContent).toBe('2')

  // 1+2=.=
  clickButton('C')
  clickButton('1');clickButton('+');clickButton('2');clickButton('=');clickButton('.');clickButton('=')
  expect(expression.textContent).toBe('0+2')
  expect(lowerVal.textContent).toBe('2')

  // 1+.=
  clickButton('C')
  clickButton('1');clickButton('+');clickButton('.');clickButton('=');
  expect(expression.textContent).toBe('1+0')
  expect(lowerVal.textContent).toBe('1')
  
  // 1+.1.=
  clickButton('C')
  clickButton('1');clickButton('+');clickButton('.');clickButton('1');clickButton('.');clickButton('=')
  expect(expression.textContent).toBe('1+0.1')
  expect(lowerVal.textContent).toBe('1.1')
})

test('CE cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 1+CE-
  clickButton('C')
  clickButton('1');clickButton('+');clickButton('CE');clickButton('-')
  expect(expression.textContent).toBe('1+0-')
  expect(lowerVal.textContent).toBe('1')

  // 1+2=CE=
  clickButton('C')
  clickButton('1');clickButton('+');clickButton('2');clickButton('=');clickButton('CE');clickButton('=')
  expect(expression.textContent).toBe('0+2')
  expect(lowerVal.textContent).toBe('2')
})

// 1=+

test('handleEqual', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // .= cases
  // 0+1.=
  clickSeriesOfButtons('C0+1.=')
  expect(expression.textContent).toBe('0+1')
  expect(lowerVal.textContent).toBe('1')
  // 0+.=
  clickSeriesOfButtons('C0+.=')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')
  // 0+1.1.=
  clickSeriesOfButtons('C0+1.1.=')
  expect(expression.textContent).toBe('0+1.1')
  expect(lowerVal.textContent).toBe('1.1')
  // 1+2=.=
  clickSeriesOfButtons('C1+2=.=')
  expect(expression.textContent).toBe('0+2')
  expect(lowerVal.textContent).toBe('2')
})