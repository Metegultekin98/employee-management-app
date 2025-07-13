/**
 * Validates the employee form data.
 * @param formData {Object} The form data to validate.
 * @param translation {Object} The translation object for error messages.
 * @returns {Object} An object containing validation errors, if any.
 */
export function validateEmployeeForm(formData, translation) {
  const errors = {};
  if (!formData.firstName?.trim())
    errors.firstName = translation.inputs.firstName + translation.form.required;
  if (!formData.lastName?.trim())
    errors.lastName =
      this.translation.inputs.lastName + this.translation.form.required;
  if (!formData.dateOfEmployment)
    errors.dateOfEmployment =
      this.translation.inputs.dateOfEmployment + this.translation.form.required;
  if (!formData.dateOfBirth)
    errors.dateOfBirth =
      this.translation.inputs.dateOfBirth + this.translation.form.required;

  const rawPhone = formData.phone?.replace(/\s+/g, '') || '';

  if (!rawPhone)
    errors.phone =
      this.translation.inputs.phone + this.translation.form.required;
  else if (!/^\+?\d{10,15}$/.test(rawPhone))
    errors.phone = this.translation.form.invalidPhone;

  if (!formData.email?.trim())
    errors.email =
      this.translation.inputs.email + this.translation.form.required;
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = this.translation.form.invalidEmail;

  if (!formData.department?.trim())
    errors.department =
      this.translation.inputs.department + this.translation.form.required;
  if (!formData.position)
    errors.position =
      this.translation.inputs.position + this.translation.form.required;
  return errors;
}
