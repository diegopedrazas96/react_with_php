import { render, screen } from '@testing-library/react';
import App from './App';


test('first load renders with button hidden', () => {
  render(<App />);
  const sectionButtons = screen.queryByTestId('buttonSection');
  expect(sectionButtons).not.toBeInTheDocument();
});

