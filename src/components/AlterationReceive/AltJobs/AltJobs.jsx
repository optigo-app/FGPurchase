import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';
import "./altjobs.css"
import { useDispatch } from 'react-redux';
import { handleSaveAndNextFlag, handleSelectedButton } from '../../../redux/slices/HomeSlice';




const AltJobs = () => {
  const dispatch = useDispatch();
  const rows = [
    { id: 1, design: 'New-CP', unique: '2TXF2', job: '1/267631', metal: 'GOLD 18K TMCol', netWt: 5.000, grossWt: 5.000, net24k: 3.800, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 2, design: 'New-CP', unique: '8QYD3', job: '1/267632', metal: 'GOLD 18K TMCol', netWt: 3.837, grossWt: 3.888, net24k: 2.916, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 3, design: 'New-CP', unique: '1SHN2', job: '1/267600', metal: 'GOLD 18K TMCol', netWt: 6.250, grossWt: 6.250, net24k: 4.750, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 4, design: 'New-CP', unique: '4QG6X', job: '1/267633', metal: 'GOLD 18K TMCol', netWt: 3.600, grossWt: 3.600, net24k: 2.736, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 5, design: 'New-CP', unique: '2TXF2', job: '1/268037', metal: 'GOLD 18K TMCol', netWt: 2.950, grossWt: 3.000, net24k: 2.242, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 6, design: 'abcdef-24', unique: '4MBRN', job: '1/262130', metal: 'GOLD 22K Yellow', netWt: 30.000, grossWt: 36.000, net24k: 27.480, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 7, design: 'abcdef-23', unique: '1WBTJ', job: '1/262129', metal: 'GOLD 22K Yellow', netWt: 20.000, grossWt: 24.400, net24k: 18.320, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 8, design: 'abcdef-22', unique: '8QYD3', job: '1/262128', metal: 'GOLD 22K Yellow', netWt: 10.000, grossWt: 11.200, net24k: 9.160, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 9, design: 'abcdef-21', unique: '1SHN2', job: '1/262127', metal: 'GOLD 22K Yellow', netWt: 30.000, grossWt: 34.400, net24k: 27.480, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 10, design: 'abcdef-20', unique: '4QG6X', job: '1/262126', metal: 'GOLD 24k Yellow', netWt: 20.000, grossWt: 25.000, net24k: 19.900, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 11, design: 'abcdef-10', unique: '8EKGD', job: '1/262116', metal: 'GOLD 22K Yellow', netWt: 10.000, grossWt: 11.800, net24k: 9.160, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 12, design: 'abcdef-9', unique: '2HPUX', job: '1/261985', metal: 'GOLD 22K Yellow', netWt: 5.000, grossWt: 6.200, net24k: 4.580, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 13, design: 'abcdef-8', unique: '2PKNP', job: '1/261984', metal: 'GOLD 22K Yellow', netWt: 15.000, grossWt: 19.400, net24k: 13.740, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 14, design: 'abcdef-7', unique: '2PUUH', job: '1/261983', metal: 'GOLD 22K Yellow', netWt: 25.000, grossWt: 29.000, net24k: 22.900, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 15, design: 'abcdef-6', unique: '8CFGR', job: '1/261982', metal: 'GOLD 22K Yellow', netWt: 20.000, grossWt: 24.000, net24k: 18.320, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 16, design: 'abcdef-5', unique: '3U6Q9', job: '1/261981', metal: 'GOLD 22K Yellow', netWt: 10.000, grossWt: 14.800, net24k: 9.160, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
    { id: 17, design: 'abcdef-4', unique: '7DDNA', job: '1/261980', metal: 'GOLD 22K Yellow', netWt: 20.000, grossWt: 32.400, net24k: 18.320, returnValue: 'http://zen/lib/jo/28/images/return.png', returnCheck: false, designImg: 'http://zen/R50B3/UFSImage/orail25TNBVD0LO2UFPRZ4YH_Image/Design_Image/Design_Thumb/2924~1.jpg?0.508774' },
  ];
  

const columns = [
  { field: 'id', headerName: 'Sr#', width: 80 },
  { field: 'design', headerName: 'Design#', width: 130 },
  {
    field: 'designImg',
    headerName: 'DesignImage#',
    width: 90,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Design"
        style={{ width: 45, height: 45, objectFit: 'cover' }}
      />
    ),
  },
  { field: 'unique', headerName: 'Unique#', width: 130 },
  { field: 'job', headerName: 'Job#', width: 130 },
  { field: 'metal', headerName: 'Metal', width: 150 },
  { field: 'netWt', headerName: 'Net Wt.', width: 100 },
  { field: 'grossWt', headerName: 'Gross Wt.', width: 100 },
  { field: 'net24k', headerName: 'Net (24k)', width: 100 },
  {
    field: 'returnValue',
    headerName: 'Return',
    width: 80,
    align:"center",
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Design"
        style={{  objectFit: 'contain', cursor:'pointer' }}
        onClick={() => handleReturnManual(params?.row)}
      />
    ),
  },
];
  
const handleReturnAll = () => {
  console.log("Return All");
  dispatch(handleSaveAndNextFlag(true));
  dispatch(handleSelectedButton('add'));  
}
const handleReturnManual = () => {
  console.log("Return All");
  dispatch(handleSaveAndNextFlag(true));
  dispatch(handleSelectedButton('add'));  
}
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center mb-2'>
      <Typography variant="h6" gutterBottom>
        Alteration Jobs
      </Typography>
      <Button color='error' variant='contained' onClick={() => handleReturnAll()}>Return</Button>
      </div>
      <div >
        {/* <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          
        /> */}
        <DataGrid
        className='fs_analytics_l'
        pagination
        rows={rows}
        rowHeight={62}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{
          height: '421px',
          overflow:'auto',
          '& .MuiDataGrid-cell:focus': {
            outline: 'none', // Removes the outline when a cell is focused
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f0f0f0', // Light grey background for column headers
            color: '#333', // Darker text color for better contrast
          },
          '& .MuiDataGrid-cell:focus-visible': {
            outline: 'none', // Ensures no outline when the cell is clicked or focused
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none', // Removes the outline from the column header when focused
          },
          '& .MuiDataGrid-columnHeader:focus-visible': {
            outline: 'none', // Ensures no outline when the column header is clicked or focused
          },
          '& .MuiDataGrid-root::-webkit-scrollbar': {
            width: '8px', // Custom scrollbar width (horizontal and vertical)
          },
          '& .MuiDataGrid-root::-webkit-scrollbar-thumb': {
            backgroundColor: '#1976d2', // Custom color for the scrollbar thumb
            borderRadius: '4px', // Optional: make the thumb rounded
          },
          '& .MuiDataGrid-root::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0', // Custom background for the scrollbar track
          },
        }}
      />
      </div>
    </Container>
  );
};
export default AltJobs;