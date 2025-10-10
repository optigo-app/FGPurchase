import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Checkbox } from '@mui/material';

const ShowMaterialDetailsGrid = ({ data, index, mode, type, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(index);
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{data?.type}</td>
      <td>{data?.shape}</td>
      <td>{data?.clarity}</td>
      <td>{data?.color}</td>
      <td>{data?.size}</td>
      <td>{data?.pcs} / {data?.wt}</td>
      <td>{data?.tunch} / {data?.wastage}</td>
      <td>{data?.supplier}</td>
      <td>{data?.rate}</td>
      <td>{data?.amount}</td>
      <td>
        <Checkbox
          checked={data?.onPcs}
          size="small"
          sx={{ padding: 0 }}
          inputProps={{ readOnly: true }}
        />
      </td>
      <td>
        <Checkbox
          checked={data?.addInGrossWt}
          disabled={type === 'diamond'}
          size="small"
          sx={{ padding: 0 }}
          inputProps={{ readOnly: true }}
        />
      </td>
      <td>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </td>
      <td>
        <IconButton size="small" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  );
};

export default ShowMaterialDetailsGrid;
