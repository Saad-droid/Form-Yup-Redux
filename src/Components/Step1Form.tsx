import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import DataTable from 'datatables.net-dt';
import DatabaseList from "../DatabaseList";
import { TextField, Button } from "@mui/material";
import { submitFormData } from "../redux/action";
import { useDispatch } from "react-redux";

interface FormData {
    firstName: string;
    phoneNumber: string;
    age: string;
    gender: string;
    idtype: string;
    GovtId: string;
    GovtIdPan: string;
}

const FormWithYup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        phoneNumber: "",
        age: "",
        gender: "",
        idtype: "",
        GovtId: "",
        GovtIdPan: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is Required").min(3, "Min 3 characters required"),
        phoneNumber: Yup.string()
            .matches(/^\d{10}$/, "Phone Number must be 10 digits")
            .required(),

        age: Yup.number()
            .typeError("Age must be a number")
            .min(0, "must be postive number")
            .max(100, "You cannot be older than 100 years")
            .required("Age is required"),
        gender: Yup.string().required("Gender is required"),

        idtype: Yup.string().required('Govt issue Id type is required'),
        GovtId: Yup.string().when('idtype', {
            is: 'pan',
            then: Yup.string()
                .required('Please Enter PAN')
                .matches(/^[A-Za-z0-9]{10}$/, 'It should be ten-character long alpha-numeric string.')
                .label('PAN'),
            otherwise: Yup.string()
                .required('Please Enter Aadhaar')
                .matches(/^[2-9][0-9]{11}$/, 'Should have 12 numeric digits and should not start with 0 and 1.')
                .label('Aadhaar'),
        }),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log("Form Submitted", formData);
            dispatch(submitFormData(formData));
            navigate("/step2", { state: formData });
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
                console.error(error);
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <h3>Personal Details</h3>
                    <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={handleChangeText}
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                </div>
                <div>
                    <TextField id="outlined-basic" label="Age" variant="outlined" onChange={handleChangeText}
                        type="number"
                        name="age"
                        value={formData.age}
                        placeholder="Enter your age"
                    />
                    {errors.age && <div className="error">{errors.age}</div>}
                </div>
                <div>
                    <label>Sex:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    {errors.gender && <div className="error">{errors.gender}</div>}
                </div>
                <div>
                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" onChange={handleChangeText}
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && (
                        <div className="error">{errors.phoneNumber}</div>
                    )}
                </div>
                <div>
                    <label>Govt issue Id type:</label>

                    <select name="idtype" value={formData.idtype} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="pan">PAN</option>
                        <option value="adhaar">Adhaar</option>

                    </select>
                    {errors.idtype && <div className="error">{errors.idtype}</div>}
                </div>
                <div>
                    <TextField id="outlined-basic" label={formData.idtype === 'pan' ? 'PAN' : 'Aadhaar'} variant="outlined" onChange={handleChangeText}
                        type="text"
                        name="GovtId"
                        value={formData.GovtId}
                        placeholder={`Enter ${formData.idtype === 'pan' ? 'PAN' : 'Aadhaar'}`}
                    />

                    {errors.GovtId && <div className="error">{errors.GovtId}</div>}
                </div>
                <Button type="submit" variant="contained">Next</Button>
            </form>
            <DatabaseList />
        </>
    );
};

export default FormWithYup;
