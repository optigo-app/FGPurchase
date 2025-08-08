import React, { useEffect, useState } from 'react'
import "./reorder.css"
import { handleSaveAndNextFlag, handleShowImgListPopUp } from '../../../../redux/slices/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, AvatarGroup, Box, Button, FormControlLabel, Modal, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import FileUploaderMultiple from '../savennext/FileUploaderMultiple';
import MarkUpModal from '../../../../ShortcutComponent/MarkUpModal';
import AddWtModal from '../../../../ShortcutComponent/AddWtModal';

const ReOrder = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector(state => state?.fgp?.mode);
  const uploadImage = useSelector(state => state?.home?.uploadImage);
  const [markUpModal, setMarkUpModal] = useState(false);
  const [addWtModal, setAddWtModal] = useState(false);
  const remainingWt = 15;
  const [wt, setWt] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const markUpModalOpen = () => {
    setMarkUpModal(true);
  }
  const handleWtChange = (e, val) => {
    setWt(val);
    if (val > remainingWt) {
      setAddWtModal(true);
    }
  }

  const [rows, setRows] = useState([
    {
      id: 1,
      material: 'METAL',
      description: 'GOLD 14K YW PRL GREEN MIX DEFAULT / 76 / 10.567',
      issuePcs: '',
      issueWt: '',
      remainingWt: remainingWt,
    },
    {
      id: 2,
      material: 'DIAMOND',
      description: 'RND VVS PD PD / 76 / 10.567',
      issuePcs: '',
      issueWt: '',
      remainingWt: remainingWt,
    },
    {
      id: 3,
      material: 'MISC',
      description: 'RND VVS PD PD / 76 / 10.567',
      issuePcs: '',
      issueWt: '',
      remainingWt: remainingWt,
    },
    {
      id: 4,
      material: 'FINDING',
      description: 'RND VVS PD PD / 76 / 10.567',
      issuePcs: '',
      issueWt: '',
      remainingWt: remainingWt,
    },
  ]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const renderFilePreview = (file, index) => {
    return (
      <Avatar
        src={URL.createObjectURL(file)}
        key={index}
        sx={{
          height: hoveredIndex === index ? 42 : 39,
          width: hoveredIndex === index ? 42 : 39,
          transition: "transform 0.2s ease, height 0.2s ease, width 0.2s ease",
          cursor: "pointer",
          border: hoveredIndex === index ? "2px solid grey !important" : "1px solid #989898",
        }}
        onClick={() => {
          console.log('clicked', index);
          setHoveredIndex(null);
          dispatch(handleShowImgListPopUp(true));
        }}
        onMouseEnter={() => {
          setHoveredIndex(index);
        }}
        onMouseLeave={() => {
          setHoveredIndex(null);
        }}
      />
    );
  };

  useEffect(() => {
    const avatar = document.querySelector('.css-18k2bs-MuiAvatar-root');
    if (avatar) {
      avatar.addEventListener('click', () => {
        dispatch(handleShowImgListPopUp(true));
      })
      avatar.style.height = '28px !important';
      avatar.style.width = '28px !important';
      avatar.style.cursor = 'pointer !important';
    }
  }, [uploadImage]);

  const [selectedValue, setSelectedValue] = useState('job');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="reorder_component fs_fgp">
      <div className='d-flex align-items-end '>
        <div className='mx-1'>
          <select name="jdwise" id="jdwise" className='reorder_dropdwon' style={{ maxWidth: '150px' }}>
            <option value="" selected disabled>Select</option>
            <option value="designno">Design No</option>
            <option value="jobno">Job No</option>
          </select>
        </div>
        <div className="  mx-1">
          <label htmlFor="design" className="form-label pe-2">Design:</label>
          <input type="text" placeholder="design#" autoFocus className="form_input_or" style={{ maxWidth: '150px' }} />
        </div>
      </div>
      <div className="pt-3 pb-0 px-2">

        <RadioGroup row aria-label='sizes' name='sizes' onChange={handleChange} value={selectedValue}>
          <FormControlLabel value='tag' control={<Radio sx={{
            '&.Mui-checked': {
              color: theme?.palette?.customColors?.purple,
            },
          }} />} label='Apply As Tag' className='fs_fgp' />
          <FormControlLabel value='subtag' control={<Radio sx={{
            '&.Mui-checked': {
              color: theme?.palette?.customColors?.purple,
            },
          }} />} label='Add Sub tag' className='fs_fgp' />
        </RadioGroup>
      </div>

      {/* Table Section */}
      <div className="table-container border p-2">
        <div className="table-header d-flex justify-content-between align-items-center flexCol_re pt-1">
          <div className="d-flex justify-content-between align-items-center" style={{ minWidth: '800px', maxWidth: '800px' }}>
            <div>DESIGN NO: L-1245455</div>
            <Button variant='contained' sx={{ fontWeight: 'bold', color: theme?.palette?.customColors?.white, backgroundColor: theme?.palette?.customColors?.purple }} size='small' onClick={() => dispatch(handleSaveAndNextFlag(true))}
              endIcon={<ArrowForwardIcon style={{ color: 'white', }} />}
            >SAVE</Button>
          </div>
          <div className="d-flex align-items-center flexCol_re">
          </div>
        </div>
        <div className='d-flex flex-wrap  align-items-center w-100 justify-content-between'>
          <div className='d-flex flex-column justify-content-center align-items-start '>
            <div style={{ maxWidth: '1200px' }}>
              <TableContainer component={Paper} sx={{
                maxHeight: 440,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  height: '6px',
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                },
                boxShadow: 'none',
                border: '1px solid #e8e8e8',
                mt: 3
              }}>
                <Table>
                  <TableHead stickyHeader aria-label='sticky table' sx={{ boxShadow: 'none' }}>
                    <TableRow style={{ backgroundColor: '#F6F6F7', fontWeight: 'bolder' }} >
                      <TableCell className='fs_fgp text_color'  >Material</TableCell>
                      <TableCell className='fs_fgp text_color'>Description</TableCell>
                      <TableCell className='fs_fgp text_color'>Issue Pcs</TableCell>
                      <TableCell className='fs_fgp text_color'>Issue Wt</TableCell>
                      <TableCell className='fs_fgp text_color'>Mark Up</TableCell>
                      <TableCell className='fs_fgp text_color'>Remaining Wt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.id} hover >
                          <TableCell sx={{ p: 1, fontSize: '0.75rem', verticalAlign: 'middle' }} className='fs_fgp' >{row.material}</TableCell>
                          <TableCell sx={{ p: 1, fontSize: '0.75rem', verticalAlign: 'middle' }} className='fs_fgp' >{row.description}</TableCell>
                          <TableCell sx={{ p: 1, fontSize: '0.75rem', verticalAlign: 'middle' }} align='center'>
                            <input
                              type="text"
                              className='onfocus_snv fs_fgp'
                              value={row.issuePcs || ''}
                              style={{ maxWidth: '60px' }}
                              onChange={(e) => {
                                const value = e.target.value;
                                setRows((prevRows) =>
                                  prevRows?.map((r) =>
                                    r.id === row.id
                                      ? { ...r, issuePcs: value }
                                      : r
                                  )
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ p: 1, fontSize: '0.75rem', verticalAlign: 'middle' }} align='center'>
                            <input
                              type="text"
                              value={wt}
                              className='onfocus_snv fs_fgp'
                              // value={row.issueWt || ''}
                              onChange={(e) => handleWtChange(row.id, e.target.value)}
                              style={{ maxWidth: '80px' }}
                            />
                          </TableCell>
                          <TableCell sx={{ p: 1, fontSize: '0.75rem', verticalAlign: 'middle' }} align='center'>
                            <VisibilityIcon style={{ cursor: 'pointer' }} onClick={markUpModalOpen} className='fs_fgp' />
                          </TableCell>
                          <TableCell sx={{ p: 1, fontSize: '0.75rem', verticalAlign: 'middle' }} align='center' className='fs_fgp' >{row.remainingWt}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className='w-100 d-flex justify-content-end align-items-center'>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  className='fs_fgp text_color'
                />
              </div>
            </div>

          </div>
          <div style={{ minWidth: '200px' }} className='d-flex align-items-center ms-1'>

            {mode !== 'alteration_receive' && <div className='uploadImgBlock me-2'>
              <FileUploaderMultiple fs="40px" classApply="uploadImgBlock" />
            </div>
            }
            <div style={{ marginBottom: '20px' }}>
              <AvatarGroup className='pull-up snv_custom'>
                {
                  uploadImage?.map((file, index) => (
                    renderFilePreview(file, index)
                  ))}
              </AvatarGroup>
            </div>
          </div>
          <div className="me-4 d-flex flex-column justify-content-center align-items-start ms-1">
            <label className="remakrTitle text_color" htmlFor="printremark">Print Remarks :</label>
            <textarea className="summury_textArea" id="printremark" />
          </div>
        </div>
      </div>
      <MarkUpModal open={markUpModal} onClose={() => setMarkUpModal(false)} />
      <AddWtModal open={addWtModal} onClose={() => setAddWtModal(false)} />
    </div>
  )
}

export default ReOrder;
