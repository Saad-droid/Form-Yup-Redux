import { SUBMIT_FORM_DATA } from "./types";

export const submitFormData = (formData:any) => ({
  type: SUBMIT_FORM_DATA,
  payload: formData,
});