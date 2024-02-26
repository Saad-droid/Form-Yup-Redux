// reducer.ts
import { SUBMIT_FORM_DATA } from "./types";

interface FormData {
  firstName: string;
  phoneNumber: string;
  age: string;
  gender: string;
  idtype: string;
  GovtId: string;
  GovtIdPan: string;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

interface State {
  submittedData: FormData[];
}

const initialState: State = {
  submittedData: [],
};

export const formReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SUBMIT_FORM_DATA:
      // Merge the existing submitted data with the new form data
      return {
        ...state,
        submittedData: [...state.submittedData, action.payload],
      };
    default:
      return state;
  }
};
