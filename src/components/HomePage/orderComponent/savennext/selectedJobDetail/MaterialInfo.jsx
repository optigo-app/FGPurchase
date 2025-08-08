import { Tooltip, Button, AvatarGroup } from '@mui/material';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import './MaterialInfo.css';
import FileUploaderMultiple from '../FileUploaderMultiple';

const MaterialInfo = ({
  theme,
  showTableEntry,
  setShowTableEntry,
  handleAddRemark,
  setAltReceiveTimeHide,
  setChangeCriteria,
  uploadImage,
  renderFilePreview,
  mode
}) => {
  const btnStyle = {
    color: theme?.palette?.customColors?.titleColor,
    borderColor: theme?.palette?.customColors?.titleColor,
    fontSize: '12px',
    lineHeight: 1.6,
    fontWeight: '600 !important',
    '&:hover': {
      color: theme?.palette?.customColors?.titleColor,
      borderColor: theme?.palette?.customColors?.titleColor,
    },
  }
  return (
    <div className='material-info-container'>
      <div className="material-details">
        <span><strong>Tag No:</strong> 1/12566</span>
        <span><strong>Net Wt:</strong> 2.256 gm</span>
        <span><strong>Pure Wt:</strong> 1.256</span>
        <span><strong>Dia:</strong> 2.256 cts</span>
        <span><strong>Amount:</strong> 12000</span>
        <Button
          variant="outlined"
          size="small"
          style={btnStyle}
          onClick={() => setShowTableEntry(!showTableEntry)}
          startIcon={<ViewKanbanOutlinedIcon />}
        >
          Mat. Details
        </Button>
        <Button
          variant="outlined"
          size="small"
          style={btnStyle}
          onClick={handleAddRemark}
          startIcon={<RateReviewOutlinedIcon />}
        >
          Remark
        </Button>
        {mode === 'alteration_receive' && (
          <>
            <Button
              variant="outlined"
              size="small"
              style={btnStyle}
              onClick={() => setAltReceiveTimeHide(true)}
              startIcon={<InfoIcon />}
            >
              More
            </Button>
            <Button
              variant="outlined"
              size="small"
              style={btnStyle}
              onClick={() => setChangeCriteria(true)}
              startIcon={<SettingsIcon />}
            >
              Criteria
            </Button>
          </>
        )}
      </div>

      <div className="material-actions">

        {mode !== 'alteration_receive' && (
          <FileUploaderMultiple
            fs="30px"
            classApply="upload-btn"
            style={{ color: theme?.palette?.customColors?.titleColor }}
          />
        )}
        {uploadImage?.length > 0 && (
          <div className="material-avatars">
            <AvatarGroup className='pull-up snv_custom'>
              {uploadImage?.map((file, index) => renderFilePreview(file, index))}
            </AvatarGroup>
          </div>
        )}
      </div>

    </div>
  );
};

export default MaterialInfo;
