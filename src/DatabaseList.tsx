import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { connect, ConnectedProps } from 'react-redux';

import { RootState } from './redux/store';



// Define types for props
type PropsFromRedux = ConnectedProps<typeof connector>;

// Define component props
type Props = PropsFromRedux;



const DatabaseList: React.FC<Props> = ({ submittedData }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">phoneNumber</TableCell>
            <TableCell align="right">Id Type</TableCell>
            <TableCell align="right">Govt id</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">state</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Pincode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submittedData.map((data,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >

             { data.address? <>
              <TableCell component="th" scope="row"> {data.firstName} </TableCell>
              <TableCell align="right">{data.age}</TableCell>
              <TableCell align="right">{data.gender}</TableCell>
              <TableCell align="right">{data.phoneNumber}</TableCell>
              <TableCell align="right">{data.idtype}</TableCell>
              <TableCell align="right">{data.GovtId}</TableCell>
              <TableCell align="right">{data.address}</TableCell>
              <TableCell align="right">{data.state}</TableCell>
              <TableCell align="right">{data.city}</TableCell>
              <TableCell align="right">{data.country}</TableCell>
              
              <TableCell align="right">{data.pincode}</TableCell>
             </>  : <>
             
             </>}

              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const mapStateToProps = (state: RootState) => ({
  submittedData: state.formData.submittedData,
});

// Connect the component to Redux store
const connector = connect(mapStateToProps);

// Export the connected component
export default connector(DatabaseList);
