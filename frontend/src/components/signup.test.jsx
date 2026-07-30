import { getErrorMessage } from './authError';

describe('getErrorMessage', () => {
  it('returns the server message when present', () => {
    expect(getErrorMessage({ response: { data: { message: 'Username already exists' } } })).toBe('Username already exists');
  });

  it('falls back to the thrown error message', () => {
    expect(getErrorMessage({ message: 'Network Error' })).toBe('Network Error');
  });

  it('falls back to a default message when no error details are available', () => {
    expect(getErrorMessage()).toBe('Request failed');
  });
});
