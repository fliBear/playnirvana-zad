import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export function dateFilterValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup: FormGroup = control.parent as FormGroup;
    if(!formGroup) return null;

  const startDate = formGroup.get('createdFrom').value;
  const endDate = formGroup.get('createdTo').value;

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return { dateError: true };
  }

    return null;
}
