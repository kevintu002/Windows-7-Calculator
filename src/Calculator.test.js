import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from './Calculator';

test('renders learn react link', () => {
  render(<Calculator />);
  const button = screen.getByRole('button', {name: '1'})
  fireEvent.click(button)
  expect(screen.getByText('1')).toBeInTheDocument()

  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
