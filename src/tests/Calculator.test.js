import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from '../Calculator';

function getButton(val) {
  return screen.getByRole('button', {name: val})
}

function clickButton(val) {
  fireEvent.click(getButton(val))
}

function clickSeriesOfButtons(str, clearBeforeSeries=true) {
  // C before executing
  if (clearBeforeSeries)
    clickButton('C')

  // CE becomes E for string manipulation
  let stringArr = str.toString()
  if (stringArr.includes('CE'))
    stringArr = stringArr.replace(/CE/g, 'E')
  
  stringArr.split('').forEach(key => {
    clickButton(key === 'E' ? 'CE' : key)
  });
}

test('basic operations', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  clickSeriesOfButtons('1')
  expect(lowerVal.textContent).toBe('1')

  clickSeriesOfButtons('1', false)
  expect(lowerVal.textContent).toBe('11')

  clickSeriesOfButtons('+3=', false)
  expect(expression.textContent).toBe('11+3')
  expect(lowerVal.textContent).toBe('14')
});

test('handleEqual: existing expression cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 1+2=C=
  clickSeriesOfButtons('1+2=C=')
  expect(expression.textContent).toBe('0')
  expect(lowerVal.textContent).toBe('0')
  // 1+2=8= //
  clickSeriesOfButtons('1+2=8=')
  expect(expression.textContent).toBe('8')
  expect(lowerVal.textContent).toBe('8')
})

test('handleEqual: .= cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 0+.=
  clickSeriesOfButtons('0+.=')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')
  // 0+1.=
  clickSeriesOfButtons('0+1.=')
  expect(expression.textContent).toBe('0+1')
  expect(lowerVal.textContent).toBe('1')
  // 0+1.1.=
  clickSeriesOfButtons('0+1.1.=')
  expect(expression.textContent).toBe('0+1.1')
  expect(lowerVal.textContent).toBe('1.1')
  // 1+2=8.= //
  clickSeriesOfButtons('1+2=8.=')
  expect(expression.textContent).toBe('8')
  expect(lowerVal.textContent).toBe('8')
  // +.=
  clickSeriesOfButtons('+.=')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')
  // 1+2=.=
  clickSeriesOfButtons('1+2=.=')
  expect(expression.textContent).toBe('0+2')
  expect(lowerVal.textContent).toBe('2')
  // 1+.=
  clickSeriesOfButtons('1+.=')
  expect(expression.textContent).toBe('1+0')
  expect(lowerVal.textContent).toBe('1')
  // 1+.1.=
  clickSeriesOfButtons('1+.1.=')
  expect(expression.textContent).toBe('1+0.1')
  expect(lowerVal.textContent).toBe('1.1')
})

test('handleEqual: == cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 0+==
  clickSeriesOfButtons('0+==')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')
  // 0+1==
  clickSeriesOfButtons('0+1==')
  expect(expression.textContent).toBe('1+1')
  expect(lowerVal.textContent).toBe('2')
  // 0+1.1==
  clickSeriesOfButtons('0+1.1==')
  expect(expression.textContent).toBe('1.1+1.1')
  expect(lowerVal.textContent).toBe('2.2')
  // 1+2===
  clickSeriesOfButtons('1+2===')
  expect(expression.textContent).toBe('5+2')
  expect(lowerVal.textContent).toBe('7')
  // 1+2=8== //
  clickSeriesOfButtons('1+2=8.=')
  expect(expression.textContent).toBe('8')
  expect(lowerVal.textContent).toBe('8')
})

test('handleEqual: CE cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 0+CE=
  clickSeriesOfButtons('0+CE=')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')
  // 0+1CE=
  clickSeriesOfButtons('0+1CE=')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')
  // 0+1.1CE=
  clickSeriesOfButtons('0+1.1CE=')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')
  // 1+2CECE=
  clickSeriesOfButtons('1+2CECE=')
  expect(expression.textContent).toBe('1+0')
  expect(lowerVal.textContent).toBe('1')
  // 1+2=8CE= // 
  clickSeriesOfButtons('1+2=8CE=')
  expect(expression.textContent).toBe('0')
  expect(lowerVal.textContent).toBe('0')
  // 1+2=CE=
  clickSeriesOfButtons('1+2=CE=')
  expect(expression.textContent).toBe('0+2')
  expect(lowerVal.textContent).toBe('2')
})

test('handleOperator: existing operator cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // existing operator cases
  // +-
  clickSeriesOfButtons('+-')
  expect(expression.textContent).toBe('0-')
  expect(lowerVal.textContent).toBe('0')
})

test('handleOperator: .operator cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 1.+
  clickSeriesOfButtons('1.+')
  expect(expression.textContent).toBe('1+')
  expect(lowerVal.textContent).toBe('1')
  // 0+.*
  clickSeriesOfButtons('0+.*')
  expect(expression.textContent).toBe('0+0*')
  expect(lowerVal.textContent).toBe('0')
  // 1.1.+
  clickSeriesOfButtons('1.1.+')
  expect(expression.textContent).toBe('1.1+')
  expect(lowerVal.textContent).toBe('1.1')
  // 0+1./
  clickSeriesOfButtons('0+1./')
  expect(expression.textContent).toBe('0+1/')
  expect(lowerVal.textContent).toBe('1')
  // 1+2..+
  clickSeriesOfButtons('1+2..+')
  expect(expression.textContent).toBe('1+2+')
  expect(lowerVal.textContent).toBe('3')
  // 1+2=.+
  clickSeriesOfButtons('1+2=.+')
  expect(expression.textContent).toBe('0+')
  expect(lowerVal.textContent).toBe('0')
  // 1+2=8.+
  clickSeriesOfButtons('1+2=8.+')
  expect(expression.textContent).toBe('8+')
  expect(lowerVal.textContent).toBe('8')
  // 1.+2.-
  clickSeriesOfButtons('1.+2.-')
  expect(expression.textContent).toBe('1+2-')
  expect(lowerVal.textContent).toBe('3')
  // 1+.+
  clickSeriesOfButtons('1+.+')
  expect(expression.textContent).toBe('1+0+')
  expect(lowerVal.textContent).toBe('1')
})

test('handleOperator: =operator cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 1=+
  clickSeriesOfButtons('1=+')
  expect(expression.textContent).toBe('1+')
  expect(lowerVal.textContent).toBe('1')
  // 0+=*
  clickSeriesOfButtons('0+=*')
  expect(expression.textContent).toBe('0*')
  expect(lowerVal.textContent).toBe('0')
  // 5+=*
  clickSeriesOfButtons('5+=*')
  expect(expression.textContent).toBe('10*')
  expect(lowerVal.textContent).toBe('10')
  // 1=1=+
  clickSeriesOfButtons('1=1=+')
  expect(expression.textContent).toBe('1+')
  expect(lowerVal.textContent).toBe('1')
  // 0+1=/
  clickSeriesOfButtons('0+1=/')
  expect(expression.textContent).toBe('1/')
  expect(lowerVal.textContent).toBe('1')
  // 1+2=..-
  clickSeriesOfButtons('1+2=..-')
  expect(expression.textContent).toBe('0-')
  expect(lowerVal.textContent).toBe('0')
  // 1+2=+=+
  clickSeriesOfButtons('1+2=+=+')
  expect(expression.textContent).toBe('6+')
  expect(lowerVal.textContent).toBe('6')
  // 1+2=8+=+
  clickSeriesOfButtons('1+2=8+=+')
  expect(expression.textContent).toBe('16+')
  expect(lowerVal.textContent).toBe('16')
})

test('handleOperator: CEoperator cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 1+CE-
  clickSeriesOfButtons('1+CE-')
  expect(expression.textContent).toBe('1+0-')
  expect(lowerVal.textContent).toBe('1')
  // 1=CE+
  clickSeriesOfButtons('1=CE+')
  expect(expression.textContent).toBe('0+')
  expect(lowerVal.textContent).toBe('0')
  // 0+CE*
  clickSeriesOfButtons('0+CE*')
  expect(expression.textContent).toBe('0+0*')
  expect(lowerVal.textContent).toBe('0')
  // 5+CE*
  clickSeriesOfButtons('5+CE*')
  expect(expression.textContent).toBe('5+0*')
  expect(lowerVal.textContent).toBe('5')
  // 1=1CE+
  clickSeriesOfButtons('1=1CE+')
  expect(expression.textContent).toBe('0+')
  expect(lowerVal.textContent).toBe('0')
  // 0+1CE/
  clickSeriesOfButtons('0+1CE/')
  expect(expression.textContent).toBe('0+0/')
  expect(lowerVal.textContent).toBe('0')
  // 1+2=.CE-
  clickSeriesOfButtons('1+2=.CE-')
  expect(expression.textContent).toBe('0-')
  expect(lowerVal.textContent).toBe('0')
  // 1+2=+CE+
  clickSeriesOfButtons('1+2=+CE+')
  expect(expression.textContent).toBe('3+0+')
  expect(lowerVal.textContent).toBe('3')
  // 1+2CE8+CE+
  clickSeriesOfButtons('1+2CE8+CE+')
  expect(expression.textContent).toBe('1+8+0+')
  expect(lowerVal.textContent).toBe('9')
})