import { useState, Fragment } from 'react'
import {
  Box,
  Button,
  Modal,
  Tooltip,
  Typography,
  IconButton,
  useTheme
} from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CancelIcon from '@mui/icons-material/Cancel'
import { useDropzone } from 'react-dropzone'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  handleShowImgListPopUp,
  handleUploadImageList
} from '../../../../redux/slices/HomeSlice'



const FileUploaderMultiple = ({ fs = 28, classApply = '' }) => {
  const [files, setFiles] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const dispatch = useDispatch()
  const theme = useTheme()
  const showImgListPopUp = useSelector(state => state.home.showImgListPopUp)

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: acceptedFiles => {
      const updatedFiles = [...files, ...acceptedFiles]
      const uniqueFiles = updatedFiles.reduce((acc, file) => {
        if (!acc.some(f => f.name === file.name)) acc.push(file)
        return acc
      }, [])

      setFiles(uniqueFiles)
      dispatch(handleUploadImageList(uniqueFiles))
    }
  })

  const handleRemoveFile = fileToRemove => {
    const updated = files.filter(file => file.name !== fileToRemove.name)
    setFiles(updated)
    dispatch(handleUploadImageList(updated))
  }

  const renderPreview = file =>
    file.type.startsWith('image') ? (
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'contain',
          borderRadius: 10
        }}
      />
    ) : null

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      prev + 1 >= files.length ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? files.length - 1 : prev - 1
    )
  }

  const btnStyle = {
    color: theme?.palette?.customColors?.titleColor,
    borderColor: theme?.palette?.customColors?.titleColor,
    fontSize: '12px',
    lineHeight: 1.6,
    fontWeight: '600 !important',
    '&:hover': {
      color: theme?.palette?.customColors?.titleColor,
      borderColor: theme?.palette?.customColors?.titleColor,
    }
  }

  return (
    <Fragment>
      <Box className={`d-flex align-items-center gap-2 ${classApply}`}>
        <div {...getRootProps()} className="upload-trigger">
          <input {...getInputProps()} />
          <Button
            startIcon={<FileUploadOutlinedIcon />}
            variant="outlined"
            size="small"
            sx={btnStyle}
          >
            Upload
          </Button>
        </div>
      </Box>

      <Modal
        open={showImgListPopUp}
        onClose={() => dispatch(handleShowImgListPopUp(false))}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 3,
            p: 3,
            width: '100%',
            maxWidth: 500,
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 24
          }}
        >
          <Box className="d-flex justify-content-between align-items-center mb-2">
            <Typography variant="h6">Uploaded Images</Typography>
            <Tooltip title="Close">
              <IconButton onClick={() => dispatch(handleShowImgListPopUp(false))}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {files.length > 0 && (
            <Box sx={{ position: 'relative' }}>
              {renderPreview(files[currentImageIndex])}
              <IconButton
                onClick={prevImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 10,
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(200, 200, 255, 0.9)',
                    boxShadow: 3,
                    transform: 'translateY(-50%) scale(1.1)'
                  }
                }}
              >
                <Icon icon="tabler:chevron-left" />
              </IconButton>

              <IconButton
                onClick={nextImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 10,
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(200, 200, 255, 0.9)',
                    boxShadow: 3,
                    transform: 'translateY(-50%) scale(1.1)'
                  }
                }}
              >
                <Icon icon="tabler:chevron-right" />
              </IconButton>
              <Box className="d-flex justify-content-center mt-2">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: theme?.palette?.customColors?.red,
                    color: '#fff',
                  }}
                  onClick={() => handleRemoveFile(files[currentImageIndex])}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

    </Fragment>
  )
}

export default FileUploaderMultiple
