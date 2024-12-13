// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'
// import Icon from '../../../../components/Core'
import { Icon } from '@iconify/react';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import "./fileUpload.css"
import { Tooltip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileUploaderMultiple = () => {
  // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={28} height={28} alt={file.name} src={URL.createObjectURL(file)} />
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

  const handleRemoveAllFiles = () => {
    setFiles([])
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
          <Tooltip title="Uploaded Image"><div>{fileList}</div></Tooltip>
          <div className='buttons'>
            {/* <Button variant='contained' size='small' className='me-1'>Upload Image</Button> */}
            <Button color='error' variant='contained' size='small' onClick={handleRemoveAllFiles}  >
              <Tooltip title="Remove Uploaded Image">Remove</Tooltip>
            </Button>
          </div>
        </Fragment>
      ) : null}
    </div>
    </Fragment>
  )
}

export default FileUploaderMultiple
