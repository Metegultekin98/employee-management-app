import {expect} from '@open-wc/testing';
import {formatPhone} from '../../src/utils/formatPhone.js';

describe('formatPhone()', () => {
  it('formats full 11-digit phone number correctly', () => {
    const input = '55544433221';
    const result = formatPhone(input);
    expect(result).to.equal('555 444 33 22');
  });

  it('formats 10-digit input correctly (trims last digit)', () => {
    const input = '5554443322';
    const result = formatPhone(input);
    expect(result).to.equal('555 444 33 22');
  });

  it('truncates input longer than 11 digits', () => {
    const input = '55544433221999';
    const result = formatPhone(input);
    expect(result).to.equal('555 444 33 22');
  });

  it('ignores non-numeric characters', () => {
    const input = '+555-444_33a22';
    const result = formatPhone(input);
    expect(result).to.equal('555 444 33 22');
  });

  it('returns partial formats for shorter input', () => {
    expect(formatPhone('5')).to.equal('5');
    expect(formatPhone('55')).to.equal('55');
    expect(formatPhone('555')).to.equal('555');
    expect(formatPhone('5554')).to.equal('555 4');
    expect(formatPhone('55544')).to.equal('555 44');
    expect(formatPhone('555444')).to.equal('555 444');
    expect(formatPhone('5554443')).to.equal('555 444 3');
    expect(formatPhone('55544433')).to.equal('555 444 33');
  });

  it('returns empty string if input is empty or undefined', () => {
    expect(formatPhone('')).to.equal('');
    expect(formatPhone(null)).to.equal('');
    expect(formatPhone(undefined)).to.equal('');
  });
});
