import { useEffect, useState } from 'react';
import { Box, Modal, Typography, useTheme, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { handlePopUpJobDetails } from "../../redux/slices/FgpSlice";

const JobGrid = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const PopUpJobDetails = useSelector(state => state?.fgp?.PopUpJobDetails);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [summaryData, setSummaryData] = useState({
    grosswt: 0,
    netwt: 0,
    net24K: 0,
    amount: 0,
    diactw: 0,
    diarate: 0,
    diaamt: 0,
    csctw: 0,
    csrate: 0,
    csamt: 0,
    miscctw: 0,
    miscrate: 0,
    miscamt: 0,
    makerate: 0,
    makeamt: 0,
    totalamt: 0,
  });

  const data = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    details: `1/271928`,
    group: index + 1,
    quality: "PD 18K",
    ['Wt(G+D)']: 10.4,
    grosswt: 10,
    netwt: 2.7,
    ['net(24k)']: 2.9,
    amount: 20000,
    metal: "Gold 18K",
    diactw: 1.04,
    diarate: 670,
    diaamt: 3400,
    csctw: 2.809,
    csrate: 120,
    csamt: 680,
    miscctw: 1.234,
    miscrate: 230,
    miscamt: 4500,
    makerate: 10000,
    makeamt: 12000,
    makeon: "Pcs",
    totalamt: 20000,
  }));

  useEffect(() => {
    const totals = data.reduce((acc, row) => {
      Object.keys(summaryData).forEach(key => {
        acc[key] += +row[key] || 0;
      });
      return acc;
    }, { ...summaryData });

    setSummaryData(totals);
  }, []);

  const columns = [
    { field: 'details', headerName: 'Details', minWidth: 100, flex: 1 },
    { field: 'group', headerName: 'Group#', minWidth: 80, flex: 0.7 },
    { field: 'quality', headerName: 'Quality', minWidth: 100, flex: 1 },
    { field: 'Wt(G+D)', headerName: 'Wt(G+D)', minWidth: 100, flex: 1 },
    { field: 'grosswt', headerName: 'GrossWt', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'netwt', headerName: 'NetWt', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'net(24k)', headerName: 'Net(24K)', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'amount', headerName: 'Amount', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'metal', headerName: 'Metal', minWidth: 100, flex: 1 },
    { field: 'diactw', headerName: 'DiaCtw', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'diarate', headerName: 'DiaRate', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'diaamt', headerName: 'DiaAmt', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'csctw', headerName: 'CSCtw', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'csrate', headerName: 'CSRate', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'csamt', headerName: 'CSAmt', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'miscctw', headerName: 'MiscCtw', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'miscrate', headerName: 'MiscRate', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'miscamt', headerName: 'MiscAmt', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'makerate', headerName: 'MakeRate', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'makeamt', headerName: 'MakeAmt', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) },
    { field: 'makeon', headerName: 'MakeOn', minWidth: 100, flex: 1 },
    { field: 'totalamt', headerName: 'TotalAmt', minWidth: 100, flex: 1, valueFormatter: ({ value }) => value?.toFixed(2) }
  ];

  const summaryBoxes = [
    { id: 1, label: 'GrossWt', value: summaryData?.grosswt },
    { id: 2, label: 'NetWt', value: summaryData?.netwt },
    { id: 3, label: 'Net(24K)', value: summaryData?.net24K },
    { id: 4, label: 'Amount', value: summaryData?.amount },
    { id: 5, label: 'DiaCTW', value: summaryData?.diactw },
    { id: 6, label: 'DiaAmt', value: summaryData?.diaamt },
    { id: 7, label: 'CSCTW', value: summaryData?.csctw },
    { id: 8, label: 'CSAmt', value: summaryData?.csamt },
    { id: 9, label: 'MiscCTW', value: summaryData?.miscctw },
    { id: 10, label: 'MiscAmt', value: summaryData?.miscamt },
    { id: 11, label: 'MakingAmt', value: summaryData?.makeamt },
    { id: 12, label: 'Total Amount', value: summaryData?.totalamt }
  ];

  return (
    <Modal
      open={PopUpJobDetails}
      onClose={() => dispatch(handlePopUpJobDetails(false))}
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '99%',
        bgcolor: "background.paper",
        pt: 2,
        px: 4,
        pb: 3,
        borderRadius: "8px",
        boxShadow: 'none',
        outline: 'none'
      }}
        className="boxShadow_hp"
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>&nbsp;</div>
          <div className="fs-6 fw-bold fs_fgp" style={{ color: theme?.palette?.customColors?.purple }}>
            Jobs Detail
          </div>
          <div>
            <Tooltip title="Close" onClick={() => dispatch(handlePopUpJobDetails(false))}>
              <CancelIcon style={{ cursor: 'pointer' }} />
            </Tooltip>
          </div>
        </div>

        <div className='mb-2 d-flex justify-content-between align-items-center overflow-auto'>
          {summaryBoxes.map(box => (
            <div key={box.id} className='boxMinHeight fs_fgp'>
              <Typography variant='body1' sx={{ color: 'grey' }}>{box.label}</Typography>
              <Typography>{box.value?.toFixed(3)}</Typography>
            </div>
          ))}
        </div>

        <Box sx={{
          height: 450,
          width: '100%',
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#F6F6F7'
          }
        }}>
          <DataGrid
            rows={data}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => setPaginationModel(model)}
            pageSizeOptions={[10, 20, 30, 50]}
            pagination
            disableColumnMenu
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default JobGrid;
