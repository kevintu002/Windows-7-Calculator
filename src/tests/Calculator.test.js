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
  if (clearBeforeSeries) {
    clickButton('C')
    clickButton('MC')
  }

  // CE becomes E for string manipulation
  let stringArr = str.toString()
  if (stringArr.includes('CE'))
    stringArr = stringArr.replace(/CE/g, 'E')
  if (stringArr.includes('MR'))
    stringArr = stringArr.replace(/MR/g, 'R')
  if (stringArr.includes('MS'))
    stringArr = stringArr.replace(/MS/g, 'S')
  if (stringArr.includes('pm'))
    stringArr = stringArr.replace(/pm/g, '±')
  
  stringArr.split('').forEach(key => {
    if (key === 'E')
      clickButton('CE')
    else if (key === 'R')
      clickButton('MR')
    else if (key === 'S')
      clickButton('MS')
    else
      clickButton(key)
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

test('handleEqual: MR= cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 9MS1+2MR5=
  clickSeriesOfButtons('9MS1+2MR5=')
  expect(expression.textContent).toBe('1+5')
  expect(lowerVal.textContent).toBe('6')
  // 9MS1+2CEMR=
  clickSeriesOfButtons('9MS1+2CEMR=')
  expect(expression.textContent).toBe('1+9')
  expect(lowerVal.textContent).toBe('10')
  // 9MS1+MR=
  clickSeriesOfButtons('9MS1+MR=')
  expect(expression.textContent).toBe('1+9')
  expect(lowerVal.textContent).toBe('10')
  // 9MS1=MR=
  clickSeriesOfButtons('9MS1=MR=')
  expect(expression.textContent).toBe('9')
  expect(lowerVal.textContent).toBe('9')
  // 9MS0+MR=
  clickSeriesOfButtons('9MS0+MR=')
  expect(expression.textContent).toBe('0+9')
  expect(lowerVal.textContent).toBe('9')
  // 9MS5+MR=
  clickSeriesOfButtons('9MS5+MR=')
  expect(expression.textContent).toBe('5+9')
  expect(lowerVal.textContent).toBe('14')
  // 9MS1=1MR=
  clickSeriesOfButtons('9MS1=1MR=')
  expect(expression.textContent).toBe('9')
  expect(lowerVal.textContent).toBe('9')
  // 9MS0+1MR=
  clickSeriesOfButtons('9MS0+1MR=')
  expect(expression.textContent).toBe('0+9')
  expect(lowerVal.textContent).toBe('9')
  // 9MS1+2=.MR=
  clickSeriesOfButtons('9MS1+2=.MR=')
  expect(expression.textContent).toBe('9+2')
  expect(lowerVal.textContent).toBe('11')
  // 9MS1+2=+MR=
  clickSeriesOfButtons('9MS1+2=+MR=')
  expect(expression.textContent).toBe('3+9')
  expect(lowerVal.textContent).toBe('12')
  // 9MS1+2MR8+MR=
  clickSeriesOfButtons('9MS1+2MR8+MR=')
  expect(expression.textContent).toBe('1+8+9')
  expect(lowerVal.textContent).toBe('18')
})

test('handleEqual: MS= cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 9MS1+2MS5=
  clickSeriesOfButtons('9MS1+2MS5=')
  expect(expression.textContent).toBe('1+5')
  expect(lowerVal.textContent).toBe('6')
  // 9MS1+2CEMS=
  clickSeriesOfButtons('9MS1+2CEMS=')
  expect(expression.textContent).toBe('1+0')
  expect(lowerVal.textContent).toBe('1')
  // 9MS1+MS=
  clickSeriesOfButtons('9MS1+MS=')
  expect(expression.textContent).toBe('1+1')
  expect(lowerVal.textContent).toBe('2')
  // 9MS1=MS=
  clickSeriesOfButtons('9MS1=MS=')
  expect(expression.textContent).toBe('1')
  expect(lowerVal.textContent).toBe('1')
  // 9MS0+MS=
  clickSeriesOfButtons('9MS0+MS=')
  expect(expression.textContent).toBe('0+0')
  expect(lowerVal.textContent).toBe('0')
  // 9MS5+MS=
  clickSeriesOfButtons('9MS5+MS=')
  expect(expression.textContent).toBe('5+5')
  expect(lowerVal.textContent).toBe('10')
  // 9MS1=1MS=
  clickSeriesOfButtons('9MS1=1MS=')
  expect(expression.textContent).toBe('1')
  expect(lowerVal.textContent).toBe('1')
  // 9MS0+1MS=
  clickSeriesOfButtons('9MS0+1MS=')
  expect(expression.textContent).toBe('0+1')
  expect(lowerVal.textContent).toBe('1')
  // 9MS1+2=.MS=
  clickSeriesOfButtons('9MS1+2=.MS=')
  expect(expression.textContent).toBe('0+2')
  expect(lowerVal.textContent).toBe('2')
  // 9MS1+2=+MS=
  clickSeriesOfButtons('9MS1+2=+MS=')
  expect(expression.textContent).toBe('3+3')
  expect(lowerVal.textContent).toBe('6')
  // 9MS1+2MS8+MS=
  clickSeriesOfButtons('9MS1+2MS8+MS=')
  expect(expression.textContent).toBe('1+8+9')
  expect(lowerVal.textContent).toBe('18')
  // 2+MS3=
  clickSeriesOfButtons('2+MS3=')
  expect(expression.textContent).toBe('2+3')
  expect(lowerVal.textContent).toBe('5')
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

test('handleOperator: MRoperator cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 9MS1+2MR5
  clickSeriesOfButtons('9MS1+2MR5')
  expect(expression.textContent).toBe('1+')
  expect(lowerVal.textContent).toBe('5')
  // 9MS1+2CEMR+
  clickSeriesOfButtons('9MS1+2CEMR+')
  expect(expression.textContent).toBe('1+9+')
  expect(lowerVal.textContent).toBe('10')
  // 9MS1+MR-
  clickSeriesOfButtons('9MS1+MR-')
  expect(expression.textContent).toBe('1+9-')
  expect(lowerVal.textContent).toBe('10')
  // 9MS1=MR+
  clickSeriesOfButtons('9MS1=MR+')
  expect(expression.textContent).toBe('9+')
  expect(lowerVal.textContent).toBe('9')
  // 9MS0+MR*
  clickSeriesOfButtons('9MS0+MR*')
  expect(expression.textContent).toBe('0+9*')
  expect(lowerVal.textContent).toBe('9')
  // 9MS5+MR*
  clickSeriesOfButtons('9MS5+MR*')
  expect(expression.textContent).toBe('5+9*')
  expect(lowerVal.textContent).toBe('14')
  // 9MS1=1MR+
  clickSeriesOfButtons('9MS1=1MR+')
  expect(expression.textContent).toBe('9+')
  expect(lowerVal.textContent).toBe('9')
  // 9MS0+1MR/
  clickSeriesOfButtons('9MS0+1MR/')
  expect(expression.textContent).toBe('0+9/')
  expect(lowerVal.textContent).toBe('9')
  // 9MS1+2=.MR-
  clickSeriesOfButtons('9MS1+2=.MR-')
  expect(expression.textContent).toBe('9-')
  expect(lowerVal.textContent).toBe('9')
  // 9MS1+2=+MR+
  clickSeriesOfButtons('9MS1+2=+MR+')
  expect(expression.textContent).toBe('3+9+')
  expect(lowerVal.textContent).toBe('12')
  // 9MS1+2MR8+MR+
  clickSeriesOfButtons('9MS1+2MR8+MR+')
  expect(expression.textContent).toBe('1+8+9+')
  expect(lowerVal.textContent).toBe('18')
})

test('handleOperator: MSoperator cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 9MS1+2MS5
  clickSeriesOfButtons('9MS1+2MS5')
  expect(expression.textContent).toBe('1+')
  expect(lowerVal.textContent).toBe('5')
  // 9MS1+2CEMS+
  clickSeriesOfButtons('9MS1+2CEMS+')
  expect(expression.textContent).toBe('1+0+')
  expect(lowerVal.textContent).toBe('1')
  // 9MS1+MS-
  clickSeriesOfButtons('9MS1+MS-')
  expect(expression.textContent).toBe('1-')
  expect(lowerVal.textContent).toBe('1')
  // 9MS1=MS+
  clickSeriesOfButtons('9MS1=MS+')
  expect(expression.textContent).toBe('1+')
  expect(lowerVal.textContent).toBe('1')
  // 9MS0+MS*
  clickSeriesOfButtons('9MS0+MS*')
  expect(expression.textContent).toBe('0*')
  expect(lowerVal.textContent).toBe('0')
  // 9MS5+MS*
  clickSeriesOfButtons('9MS5+MS*')
  expect(expression.textContent).toBe('5*')
  expect(lowerVal.textContent).toBe('5')
  // 9MS1=1MS+
  clickSeriesOfButtons('9MS1=1MS+')
  expect(expression.textContent).toBe('1+')
  expect(lowerVal.textContent).toBe('1')
  // 9MS0+1MS/
  clickSeriesOfButtons('9MS0+1MS/')
  expect(expression.textContent).toBe('0+1/')
  expect(lowerVal.textContent).toBe('1')
  // 9MS1+2=.MS-
  clickSeriesOfButtons('9MS1+2=.MS-')
  expect(expression.textContent).toBe('0-')
  expect(lowerVal.textContent).toBe('0')
  // 9MS1+2=+MS+
  clickSeriesOfButtons('9MS1+2=+MS+')
  expect(expression.textContent).toBe('3+')
  expect(lowerVal.textContent).toBe('3')
  // 9MS1+2MS8+MS-
  clickSeriesOfButtons('9MS1+2MS8+MS-')
  expect(expression.textContent).toBe('1+8-')
  expect(lowerVal.textContent).toBe('9')
})

test('toggle sign cases', () => {
  render(<Calculator />);
  const expression = screen.getByTestId('expression')
  const lowerVal = screen.getByTestId('lowerVal')

  // 5*9=pm=
  clickSeriesOfButtons('5*9=pm=')
  expect(expression.textContent).toBe('-45*9')
  expect(lowerVal.textContent).toBe('-405')
  // 5*9=pm-
  clickSeriesOfButtons('5*9=pm-')
  expect(expression.textContent).toBe('-45-')
  expect(lowerVal.textContent).toBe('-45')
  // =
  clickSeriesOfButtons('=', false)
  expect(expression.textContent).toBe('-45--45')
  expect(lowerVal.textContent).toBe('0')
})