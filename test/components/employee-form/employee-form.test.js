import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../../../src/components/employee-form/employee-form.js';

describe('<employee-form>', () => {
  const translationMock = {
    inputs: {
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfEmployment: 'Date of Employment',
      dateOfBirth: 'Date of Birth',
      phone: 'Phone',
      email: 'Email',
      department: 'Department',
      position: 'Position',
    },
    form: {
      pleaseSelect: 'Please select...',
      required: ' is required.',
      invalidPhone: 'Invalid phone number.',
      invalidEmail: 'Invalid email address.',
    },
  };

  const commonMock = {
    submit: 'Submit',
    cancel: 'Cancel',
  };

  it('renders all form fields', async () => {
    const el = await fixture(html`
      <employee-form
        .translation=${translationMock}
        .common=${commonMock}
        .value=${{
          firstName: 'Alice',
          lastName: 'Smith',
          phone: '5554443322',
          email: 'alice@example.com',
          department: 'Engineering',
          position: 'Medior',
        }}
      ></employee-form>
    `);

    const inputs = el.shadowRoot.querySelectorAll('input');
    expect(inputs.length).to.equal(7);

    const select = el.shadowRoot.querySelector('select');
    expect(select).to.exist;

    const button = el.shadowRoot.querySelector('button[type="submit"]');
    expect(button.textContent).to.include('Submit');
  });

  it('formats phone number on input', async () => {
    const el = await fixture(html`
      <employee-form
        .translation=${translationMock}
        .common=${commonMock}
      ></employee-form>
    `);

    const phoneInput = el.shadowRoot.querySelector('input[name="phone"]');
    phoneInput.value = '5554443322';
    phoneInput.dispatchEvent(new InputEvent('input'));

    expect(phoneInput.value).to.equal('555 444 33 22');
  });

  it('shows validation errors when required fields are missing', async () => {
    const el = await fixture(html`
      <employee-form
        .translation=${translationMock}
        .common=${commonMock}
      ></employee-form>
    `);

    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(
      new SubmitEvent('submit', {cancelable: true, bubbles: true})
    );

    await el.updateComplete;

    const errors = el.shadowRoot.querySelectorAll('.error');
    expect(errors.length).to.be.above(0);
  });

  it('dispatches form-submit event with valid data', async () => {
    const el = await fixture(html`
      <employee-form
        .translation=${translationMock}
        .common=${commonMock}
        .value=${{
          firstName: 'John',
          lastName: 'Doe',
          dateOfEmployment: '2023-01-01',
          dateOfBirth: '1990-01-01',
          phone: '555 444 33 22',
          email: 'john@example.com',
          department: 'Finance',
          position: 'Senior',
        }}
      ></employee-form>
    `);

    const form = el.shadowRoot.querySelector('form');
    const eventPromise = oneEvent(el, 'form-submit');
    form.dispatchEvent(
      new SubmitEvent('submit', {cancelable: true, bubbles: true})
    );

    const e = await eventPromise;
    expect(e.detail).to.be.an('object');
    expect(e.detail.firstName).to.equal('John');
    expect(e.detail.phone).to.include(' ');
  });

  it('uses formatted phone on load', async () => {
    const el = await fixture(html`
      <employee-form
        .translation=${translationMock}
        .common=${commonMock}
        .value=${{phone: '5554443322'}}
      ></employee-form>
    `);

    const phoneInput = el.shadowRoot.querySelector('input[name="phone"]');
    expect(phoneInput.value).to.equal('555 444 33 22');
  });
});
