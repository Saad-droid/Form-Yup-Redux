import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from './redux/store';



// Define types for props
type PropsFromRedux = ConnectedProps<typeof connector>;

// Define component props
type Props = PropsFromRedux;

const SubmittedDataTable: React.FC<Props> = ({ submittedData }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>age</th>
                    <th>gender</th>
                    <th>mobile</th>
                    <th>Address</th>
                    <th>id type</th>
                    <th>id</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Pincode</th>
                </tr>
            </thead>
            <tbody>
                {submittedData.map((data, index) => (
                    <tr key={index}>
                        {data.address!=="" ?
                        <>
                        <td>{data.firstName}</td>
                        <td>{data.age}</td>
                        <td>{data.gender}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.idtype}</td>
                        <td>{data.GovtId}</td>
                        <td>{data.address}</td>
                        <td>{data.state}</td>
                        <td>{data.city}</td>
                        <td>{data.country}</td>
                       
                        <td>{"saad"}</td> 

                        </>
                        :
                        <>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        
                        <td>{"saad1"}</td> 
                        </>}
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Map state from Redux store to component props
const mapStateToProps = (state: RootState) => ({
     submittedData: state.formData.submittedData,
});

// Connect the component to Redux store
const connector = connect(mapStateToProps);

// Export the connected component
export default connector(SubmittedDataTable);
