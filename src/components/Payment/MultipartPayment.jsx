import React, { useRef, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Typography,
    useTheme,
    Divider,
    IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { handleMultiPartPayFlag } from '../../redux/slices/HomeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function MultipartPayment({ multiPartPayFlag }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const metalRefs = useRef({});
    const amountRefs = useRef({});

    const [metalRows, setMetalRows] = useState([
        { id: 1, metal: '4.089', dueDays: '0', date: '08 Aug 2024' },
    ]);
    const [amountRows, setAmountRows] = useState([
        { id: 1, amount: '2,588.91', dueDays: '0', date: '08 Aug 2024' },
    ]);

    const generateId = () => Date.now() + Math.floor(Math.random());

    const handleInputChange = (id, type, key, value) => {
        const updater = type === 'metal' ? setMetalRows : setAmountRows;
        const rows = type === 'metal' ? metalRows : amountRows;

        updater(rows.map(row => row.id === id ? { ...row, [key]: value } : row));
    };

    const handleRowRemove = (id, type) => {
        if (type === 'metal') {
            setMetalRows(prev => prev.filter(row => row.id !== id));
        } else {
            setAmountRows(prev => prev.filter(row => row.id !== id));
        }
    };

    const addMetalRow = () => {
        const newId = generateId();
        setMetalRows(prev => [
            ...prev,
            { id: newId, metal: '', dueDays: '', date: '08 Aug 2024' },
        ]);
        setTimeout(() => {
            metalRefs.current[newId]?.focus();
        }, 50);
    };
    

    const addAmountRow = () => {
        const newId = generateId();
        setAmountRows([...amountRows, {
            id: newId,
            amount: '',
            dueDays: '',
            date: '08 Aug 2024',
        }]);
        setTimeout(() => {
            amountRefs.current[newId]?.focus();
        }, 50);
    };

    const handleEnterKey = (e, type) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            type === 'metal' ? addMetalRow() : addAmountRow();
        }
    };

    const handleCloseMultiPartPay = () => {
        dispatch(handleMultiPartPayFlag(false));
    };

    if (!multiPartPayFlag) return null;

    return (
        <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2 }} className="w-75">
            <Box mb={2}>
                <Grid container justifyContent="space-between">
                    <Typography color="text.secondary" fontSize="0.95rem">
                        Total Metal: <strong>4.089</strong>
                    </Typography>
                    <Typography color="text.secondary" fontSize="0.95rem">
                        Total Amount: <strong>2,588.91</strong>
                    </Typography>
                </Grid>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Metal Section */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Metal Payments
            </Typography>

            {metalRows.map((row) => (
                <Grid container spacing={2} alignItems="center" key={row.id} sx={{ mb: 1 }}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Metal</Typography>
                        <input
                            type="text"
                            value={row.metal}
                            onChange={(e) => handleInputChange(row.id, 'metal', 'metal', e.target.value)}
                            className="focus_pay"
                            style={{ width: '100%' }}
                            ref={el => metalRefs.current[row.id] = el}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">Due Days</Typography>
                        <input
                            type="text"
                            value={row.dueDays}
                            onKeyDown={(e) => handleEnterKey(e, 'metal')}
                            onChange={(e) => handleInputChange(row.id, 'metal', 'dueDays', e.target.value)}
                            className="focus_pay"
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">Date</Typography>
                        <Box>{row.date}</Box>
                    </Grid>
                    <Grid item xs={12} sm={2} display="flex" gap={1}>
                        <IconButton
                            onClick={addMetalRow}
                            sx={{ color: theme.palette.customColors?.purple }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleRowRemove(row.id, 'metal')}
                            sx={{ color: theme.palette.customColors?.red }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}

            <Divider sx={{ mb: 3, mt: 4 }} />

            {/* Amount Section */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Amount Payments
            </Typography>

            {amountRows.map((row) => (
                <Grid container spacing={2} alignItems="center" key={row.id} sx={{ mb: 1 }}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Amount</Typography>
                        <input
                            type="text"
                            value={row.amount}
                            onChange={(e) => handleInputChange(row.id, 'amount', 'amount', e.target.value)}
                            className="focus_pay"
                            style={{ width: '100%' }}
                            ref={el => amountRefs.current[row.id] = el}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">Due Days</Typography>
                        <input
                            type="text"
                            value={row.dueDays}
                            onKeyDown={(e) => handleEnterKey(e, 'amount')}
                            onChange={(e) => handleInputChange(row.id, 'amount', 'dueDays', e.target.value)}
                            className="focus_pay"
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">Date</Typography>
                        <Box>{row.date}</Box>
                    </Grid>
                    <Grid item xs={12} sm={2} display="flex" gap={1}>
                        <IconButton
                            onClick={addAmountRow}
                            sx={{ color: theme.palette.customColors?.purple }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleRowRemove(row.id, 'amount')}
                            sx={{ color: theme.palette.customColors?.red }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}

            <Divider sx={{ mb: 3, mt: 4 }} />

            {/* Footer */}
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                <Typography color="text.secondary">
                    Remaining Metal: <strong>0.0000</strong> | Remaining Amount: <strong>0.00</strong>
                </Typography>

                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        onClick={handleCloseMultiPartPay}
                        sx={{
                            background: theme.palette.customColors?.primary,
                            color: theme.palette.customColors?.white,
                        }}
                    >
                        Save & Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default MultipartPayment;
