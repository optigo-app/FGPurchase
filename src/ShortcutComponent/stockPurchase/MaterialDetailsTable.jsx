import React from 'react';
import { Button, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputField from './InputField';
import CriteriaInputs from './CriteriaInputs';

const MaterialDetailsTable = ({
    rows,
    onInputChange,
    onAddRow,
    onKeyDown,
    config,
    theme,
    markUpModalOpen,
    focusRef
}) => {
    return (
        <div className='w-100'>
            <table className='table'>
                <thead>
                    <tr>
                        <th align='center' className='text_color fs_fgp'>Sr</th>
                        <th align='center' className='text_color fs_fgp'>Material</th>
                        <th align='center' className='text_color fs_fgp'>Type</th>
                        <th align='center' className='text_color fs_fgp'>Criteria</th>
                        <th align='center' className='text_color fs_fgp'>Pcs/Wt</th>
                        {config.showTunchWastage && (
                            <th align='center' className='text_color fs_fgp'>Tunch/Wastage</th>
                        )}
                        <th align='center' className='text_color fs_fgp'>Supplier</th>
                        <th align='center' className='text_color fs_fgp'>Rate</th>
                        <th align='center' className='text_color fs_fgp'>Sale Rate</th>
                        <th align='center' className='text_color fs_fgp'>Mark Up</th>
                        <th align='center' className='text_color fs_fgp'>On Pcs</th>
                        {config.showAddInGrossWt && (
                            <th align='center' className='text_color fs_fgp'>AddIn GrossWt</th>
                        )}
                        <th align='center' className='text_color fs_fgp'>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {rows?.map((rowData, i) => (
                        <tr key={i} className='fs_fgp'>
                            <td align="center" width={"50px"}>{i + 1}</td>

                            {/* Material */}
                            <td align='center' width={"80px"}>
                                <InputField
                                    name="material"
                                    value={rowData.material}
                                    onChange={(e) => onInputChange(e, i)}
                                    width="80px"
                                    placeholder="Material"
                                    ref={i === 0 ? focusRef : null}
                                />
                            </td>

                            {/* Type */}
                            <td align='center' width={"80px"}>
                                <InputField
                                    name="type"
                                    value={rowData.type}
                                    onChange={(e) => onInputChange(e, i)}
                                    width="80px"
                                    placeholder="Type"
                                />
                            </td>

                            {/* Criteria */}
                            <td align="left" width={"350px"}>
                                <CriteriaInputs
                                    rowData={rowData}
                                    onChange={(e) => onInputChange(e, i)}
                                    config={config}
                                />
                            </td>

                            {/* Pcs/Wt */}
                            <td align="center" width={"130px"}>
                                <div>
                                    <InputField
                                        name="pcs"
                                        value={rowData.pcs}
                                        onChange={(e) => onInputChange(e, i)}
                                        width="40px"
                                        placeholder="pcs"
                                        style={{ marginRight: '2px' }}
                                    />
                                    <InputField
                                        name="wt"
                                        value={rowData.wt}
                                        onChange={(e) => onInputChange(e, i)}
                                        width="60px"
                                        placeholder="wt"
                                    />
                                </div>
                            </td>

                            {/* Tunch/Wastage (only for Finding) */}
                            {config.showTunchWastage && (
                                <td align="center" width={"130px"}>
                                    <div>
                                        <InputField
                                            name="tunch"
                                            value={rowData.tunch}
                                            onChange={(e) => onInputChange(e, i)}
                                            width="40px"
                                            placeholder="tunch"
                                            style={{ marginRight: '2px' }}
                                        />
                                        <InputField
                                            name="wastage"
                                            value={rowData.wastage}
                                            onChange={(e) => onInputChange(e, i)}
                                            width="60px"
                                            placeholder="wastage"
                                        />
                                    </div>
                                </td>
                            )}

                            {/* Supplier */}
                            <td align="left" width={"100px"}>
                                <InputField
                                    name="supplier"
                                    value={rowData.supplier}
                                    onChange={(e) => onInputChange(e, i)}
                                    width="100px"
                                    placeholder="supplier"
                                />
                            </td>

                            {/* Rate */}
                            <td align="right" width={"80px"}>
                                <InputField
                                    name="rate"
                                    value={rowData.rate}
                                    onChange={(e) => onInputChange(e, i)}
                                    width="100px"
                                    placeholder="rate"
                                />
                            </td>

                            {/* Sale Rate */}
                            <td align="right" width={"80px"}>
                                <InputField
                                    name="amount"
                                    value={rowData.amount}
                                    onChange={(e) => onInputChange(e, i)}
                                    width="100px"
                                    placeholder="amount"
                                />
                            </td>

                            {/* Mark Up */}
                            <td align="center" width={"60px"}>
                                <Tooltip title="Mark Up Details">
                                    <Button
                                        onClick={markUpModalOpen}
                                        sx={{ width: '50px', color: 'black' }}
                                    >
                                        <VisibilityIcon />
                                    </Button>
                                </Tooltip>
                            </td>

                            {/* On Pcs */}
                            <td align="left" width={"80px"}>
                                <input
                                    type="checkbox"
                                    name="onPcs"
                                    checked={rowData.onPcs}
                                    onChange={(e) => onInputChange(e, i)}
                                    className='onfocus_snv'
                                />
                            </td>

                            {/* AddIn GrossWt (only for Misc) */}
                            {config.showAddInGrossWt && (
                                <td align="right" width={"50px"}>
                                    <input
                                        type="checkbox"
                                        name="addInGrossWt"
                                        checked={rowData?.addInGrossWt}
                                        onChange={(e) => onInputChange(e, i)}
                                        className='onfocus_snv'
                                    />
                                </td>
                            )}

                            {/* Add Button */}
                            <td align="center" width={"80px"}>
                                <Button sx={{ width: '50px' }} onKeyDown={onKeyDown}>
                                    <AddCircleIcon
                                        titleAccess="Add Entry"
                                        onClick={onAddRow}
                                        style={{
                                            cursor: "pointer",
                                            color: theme?.palette?.customColors?.purple
                                        }}
                                    />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialDetailsTable;