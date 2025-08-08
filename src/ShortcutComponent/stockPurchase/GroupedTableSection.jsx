import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ShowMaterialDetailsGrid from './ShowMaterialDetailsGrid';

const isRowEmpty = (row) => {
    const fieldsToCheck = [
        'material'
    ];
    return fieldsToCheck.every(key => !row[key] || row[key] === "");
};

const GroupedTableSection = ({ title, rows, type, mode }) => {
    const [open, setOpen] = useState(true);
    const validRows = rows?.filter(e => !isRowEmpty(e)) || [];

    if (!validRows.length) return null;

    return (
        <>
            <tr>
                <td colSpan="15" style={{
                    backgroundColor: '#f0f0f0',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
                    onClick={() => setOpen(!open)}
                >
                    <IconButton size="small">
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    {title} ({rows.length} items)
                </td>
            </tr>
            {open && rows.map((e, i) => (
                <ShowMaterialDetailsGrid key={`${type}-${i}`} data={e} index={i} type={type} mode={mode} />
            ))}
        </>
    );
};

export default GroupedTableSection;
