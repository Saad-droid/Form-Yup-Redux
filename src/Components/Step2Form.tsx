import React, { useState, ChangeEvent } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { submitFormData } from "../redux/action";
import DatabaseList from "../DatabaseList";
import { TextField, Button } from "@mui/material";
import { RootState } from "../redux/store";

interface FormData {
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;

}
const FormWithYup2: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: "",
  });



  const dispatch = useDispatch();
  const personalDetails = useSelector((state: RootState) => state.formData.submittedData);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countryOptions, setCountryOptions] = useState<string[]>([])


  const validationSchema = Yup.object({
    firstName: Yup.string().optional(),
    state: Yup.string().optional(),
    city: Yup.string().optional(),
    country: Yup.string().optional(),
    pincode: Yup.string().optional()
      .matches(/^\d*$/, 'Pincode must contain only numeric characters'),



  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);

      const index = personalDetails.length - 1
      const mergedData = { ...personalDetails[index], ...formData };

      dispatch(submitFormData(mergedData));


    } catch (error) {
      console.log(error)
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};

        error.inner.forEach((err) => {
          const path = err.path || "generic"; // If err.path is undefined, use a fallback key
          newErrors[path] = err.message;
        });

        setErrors(newErrors);
      } else {
        console.error(error); // Log the error for debugging purposes
        // Handle other types of errors here
      }
    }
  };


  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


    fetchCountryOptions(value);
  };

  const fetchCountryOptions = async (input: string) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${input}`);
      const data = await response.json();
      const countries = data.map((country: any) => country.name.common);
      setCountryOptions(countries);
    } catch (error) {
      console.error('Error fetching country options:', error);
    }
  };
  const handleSelectCountry = (country: string) => {
    setFormData({ ...formData, country });
    setCountryOptions([]);
  };

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <h3>Address Details</h3>
        <TextField id="outlined-basic" label="Address" variant="outlined" onChange={handleChangeText}
          type="text"
          name="address"
          value={formData.address}
          placeholder="Enter your address" />
        {errors.address && <div className="error">{errors.address}</div>}
      </div>
      <div>
        <TextField id="outlined-basic" label="State" variant="outlined" onChange={handleChangeText}
          type="text"
          name="state"
          value={formData.state}
          placeholder="Enter your state"
        />

        {errors.state && <div className="error">{errors.state}</div>}
      </div>
      <div>
        <TextField id="outlined-basic" label="City" variant="outlined" onChange={handleChangeText}

          type="text"
          name="city"
          value={formData.city}
          placeholder="Enter your city"
        />
        {errors.city && <div className="error">{errors.city}</div>}
      </div>
      <div>
        <TextField id="outlined-basic" label="Country" variant="outlined" onChange={handleCountryChange}
          type="text"
          name="country"
          value={formData.country}
          placeholder="Enter your country"
        />
        {countryOptions.length > 0 && (
          <ul>
            {countryOptions.map((country) => (
              <li key={country} onClick={() => handleSelectCountry(country)} >{country}</li>
            ))}
          </ul>
        )}
        {errors.country && <div className="error">{errors.country}</div>}
      </div>
      <div>
        <TextField id="outlined-basic" label="Pincode" variant="outlined"
          type="text"
          name="pincode"
          value={formData.pincode}
          placeholder="Enter your pincode"
          onChange={handleChangeText}
        />
        {errors.pincode && <div className="error">{errors.pincode}</div>}
      </div>
      <Button type="submit" variant="contained">Submit</Button>
      <DatabaseList />
    </form>
  );
};

export default FormWithYup2;
