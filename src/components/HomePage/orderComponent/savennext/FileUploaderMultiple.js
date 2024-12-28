// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel';
// ** Icon Imports
// import Icon from 'src/@core/components/icon'
// import Icon from '../../../../components/Core'
import { Icon } from '@iconify/react';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import "./fileUpload.css"
import { Tooltip, Modal,  } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { TbEye, TbEyeBitcoin } from 'react-icons/tb'

const FileUploaderMultiple = () => {
  // ** State
  const [files, setFiles] = useState([]);
  const [showImgListPopUp, setShowImgPopUp] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 === files.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? files.length - 1 : prevIndex - 1
    );
  };

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: acceptedFiles => {
      setFiles(prevFiles => [
        ...prevFiles,
        ...acceptedFiles.filter(
          newFile => !prevFiles.some(existingFile => existingFile.name === newFile.name)
        )
      ])
    }
    // onDrop: acceptedFiles => {
    //   setFiles(acceptedFiles.map(file => Object.assign(file)))
    // }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={28} height={28} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
    //   return <Icon icon='tabler:file-description' />
      return ''
    }
  }
  const renderFilePreview2 = file => {
    if (file.type.startsWith('image')) {
      return <img alt={file.name} style={{ width:'100%', objectFit:'cover', height:"300px",  padding:'5px', boxSizing:'border-box', borderRadius:'10px'}} src={URL.createObjectURL(file)} />
    } else {
    //   return <Icon icon='tabler:file-description' />
      return ''
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    // <ListItem key={file.name}>
    // <div key={file.name}>
      <div className='file-details'>
        <div className='file-preview   d-flex justify-content-center align-items-center p-0 me-2'>{renderFilePreview(file)}</div>
        {/* <div className='d-flex flex-column justify-content-center align-items-center'>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div> */}
      </div>
      // <IconButton onClick={() => handleRemoveFile(file)}>
      //   <Icon icon='tabler:x' fontSize={20} />
      // </IconButton>
    // </div>
  ))
  const fileList2 = files.map(file => (
    // <ListItem key={file.name}>
    // <div key={file.name}>
      <div className='file-details'>
        <div className='file-preview   d-flex justify-content-center align-items-center p-0 '>{renderFilePreview2(file)}</div>
        {/* <div className='d-flex flex-column justify-content-center align-items-center'>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div> */}
      </div>
      // <IconButton onClick={() => handleRemoveFile(file)}>
      //   <Icon icon='tabler:x' fontSize={20} />
      // </IconButton>
    // </div>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }
  const renderFilePreviewLarge = file => {
    if (file.type.startsWith('image')) {
      return (
        <>
        <img
          alt={file.name}
          style={{
            width: '100%',
            objectFit: 'contain',
            height: '290px',
            padding: '5px',
            boxSizing: 'border-box',
            borderRadius: '10px',
          }}
          src={URL.createObjectURL(file)}
        />
        <div className='d-flex justify-content-center' style={{paddingTop:'10px'}}><Button size='small' variant='contained' color='error' onClick={() => handleRemoveFile(file)}>Remove</Button></div>

        </>
      )
    } else {
      return ''
    }
  }

  return (
    <Fragment>
    {/* <div className='d-flex align-items-center minHeight_file'> */}
    <div className='d-flex align-items-center '>
      <div {...getRootProps({ className: 'dropzone' })} className='me-2'>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column',  }}>
          <Box
            sx={{
                mt:0,
                mb:0,
                width: 28,
                height: 28,
                display: 'flex',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: '#e8e8e8'
                //   backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
            }}
          >
            {/* <Tooltip title="Upload Image" style={{cursor:'pointer'}}><Icon icon='tabler:upload' fontSize='1.75rem' /></Tooltip> */}
            <Tooltip title="Upload Image" style={{cursor:'pointer'}}><UploadFileIcon  /></Tooltip>
          </Box>
          {/* <Typography variant='h6' sx={{ mb: 1.5, minWidth:50, fontSize:'10px' }}>
            Upload Image
          </Typography> */}
            {/* Drop files here or click to upload. */}
          {/* <Typography sx={{ color: 'text.secondary' }}>
            (This is just a demo drop zone. Selected files are not actually uploaded.)
          </Typography> */}
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          {/* <List >{fileList}</List> */}
          <Tooltip title="Preview Uploaded Image" style={{cursor:'pointer'}}>
            <div onClick={() => setShowImgPopUp(true)}>
              {/* {fileList} */}
              {/* <TbEyeBitcoin size={30} /> */}
              <TbEye size={30} />
            </div>
            </Tooltip>
          <div className='buttons'>
            {/* <Button variant='contained' size='small' className='me-1'>Upload Image</Button> */}
            {/* <Button color='error' variant='contained' size='small' onClick={handleRemoveAllFiles}  >
              <Tooltip title="Remove Uploaded Image">Remove</Tooltip>
            </Button> */}
          </div>
        </Fragment>
      ) : null}
    </div>
{/* 
    {
          showImgListPopUp && <Modal
            open={showImgListPopUp}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            onClose={() => setShowImgPopUp(false)}
          >
            <Box 
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      // width: "95%",
                      bgcolor: 'background.paper',
                      borderRadius: '12px',
                      boxShadow: 24,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      maxHeight: '500px',
                      // overflowY:'scroll',
                      border: 'none',
                      minWidth:'600px'
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6'>Uploaded Images</Typography></div>
                    <div className='d-flex align-items-center'>
                      <Tooltip title="Close" onClick={() => setShowImgPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip>
                    </div>
                </div>
                <div>
                
                <div className='d-flex flex-wrap'>
              {files?.map(file => (
                <div key={file.name} className='file-preview'>
                  {renderFilePreviewLarge(file)}
                </div>
              ))}
            </div>
                </div>
              </div>
            </Box>

          </Modal>
        } */}
        
      {showImgListPopUp && (
        <Modal
          open={showImgListPopUp}
          onClose={() => setShowImgPopUp(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: '12px',
              boxShadow: 24,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '500px',
              border: 'none',
              minWidth: '600px',
              minHeight:'410px'
            }}
          >
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-between p-1">
                <div></div>
                <Typography variant="h6">Uploaded Images</Typography>
                <Tooltip title="Close" onClick={() => setShowImgPopUp(false)} style={{ cursor: 'pointer' }}>
                  <CancelIcon />
                </Tooltip>
              </div>
              <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                {files?.length > 0 && renderFilePreviewLarge(files[currentImageIndex])}
                <IconButton
                  onClick={handlePrevImage}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <Icon icon="tabler:chevron-left" />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <Icon icon="tabler:chevron-right" />
                </IconButton>
              </div>
            </div>
          </Box>
        </Modal>
      )}

    </Fragment>
  )
}

export default FileUploaderMultiple
