import { render, screen } from '@testing-library/react';
import {Calendar} from './Calendar';

test('renders the landing page', () => {
  render(<Calendar date='2023-03-03' />);
  expect(document.getElementById('3')?.classList[1]).toBe('selected');
});