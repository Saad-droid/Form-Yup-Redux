import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';

const ParentComponent: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formDataStep1, setFormDataStep1] = useState<any>({});

  const handleStep1Submit = (data: any) => {
    setFormDataStep1(data);
    setStep(2);
  };

  const handleStep2Submit = (data: any) => {
    // Combine Step 1 and Step 2 data and submit
    const formData = { ...formDataStep1, ...data };
    console.log('Form Data:', formData);
    // Dispatch action to submit form data or perform further operations
  };

  return (
    <div>
     
    </div>
  );
};

export default ParentComponent