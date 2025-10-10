const getInputValue = (inputElement) => {
  if (!inputElement) return '';
  if (typeof inputElement === 'string') return inputElement;
  if (inputElement.props && inputElement.props.value) return inputElement.props.value;
  return '';
};

export const mapIssuedToMaterialDetails = (issuedRow, materialType) => {
  const receivePcs = issuedRow.receivepcsValue || getInputValue(issuedRow.receivepcs);
  const receiveWt = issuedRow.receivectwValue || issuedRow.receivegmValue || issuedRow.receivewtValue ||
                    getInputValue(issuedRow.receivectw) || getInputValue(issuedRow.receivegm) || getInputValue(issuedRow.receivewt);
  
  const baseMapping = {
    material: issuedRow.type || '',
    type: issuedRow.type || '',
    shape: issuedRow.shape || '',
    clarity: issuedRow.clarity || '',
    color: issuedRow.color || '',
    size: issuedRow.size || '',
    pcs: receivePcs || '',
    wt: receiveWt || '',
    supplier: issuedRow.supplier || issuedRow.customer || '',
    rate: issuedRow.rate || '',
    amount: issuedRow.amount || '',
    onPcs: false,
    addInGrossWt: null,
    tunch: 0,
    wastage: 0
  };

  switch (materialType) {
    case 'diamond':
      return {
        ...baseMapping,
        wt: receiveWt || getInputValue(issuedRow.receivectw) || '',
      };
    
    case 'colorstone':
      return {
        ...baseMapping,
        wt: receiveWt || getInputValue(issuedRow.receivectw) || '',
      };
    
    case 'misc':
      return {
        ...baseMapping,
        wt: receiveWt || getInputValue(issuedRow.receivegm) || '',
      };
    
    case 'finding':
      return {
        ...baseMapping,
        wt: receiveWt || getInputValue(issuedRow.receivegm) || '',
        accessories: issuedRow.accessories || '',
        ftype: issuedRow.ftype || '',
        mtype: issuedRow.mtype || '',
        purity: issuedRow.purity || ''
      };
    
    default:
      return baseMapping;
  }
};

export const mapMultipleIssuedToMaterialDetails = (issuedRows, materialType) => {
  return issuedRows.map(row => mapIssuedToMaterialDetails(row, materialType));
};

export const mergeWithExistingRows = (existingRows, newRows) => {
  const validExistingRows = existingRows.filter(row => 
    Object.values(row).some(value => value !== '' && value !== null && value !== 0)
  );
  
  return [...validExistingRows, ...newRows];
};

export const validateReceivedData = (rowData, materialType) => {
  const receivePcs = rowData.receivepcsValue || getInputValue(rowData.receivepcs);
  const receiveWt = rowData.receivectwValue || rowData.receivegmValue || rowData.receivewtValue || 
                    getInputValue(rowData.receivectw) || getInputValue(rowData.receivegm) || getInputValue(rowData.receivewt);
  
  return receivePcs && receivePcs.toString().trim() !== '' && 
         receiveWt && receiveWt.toString().trim() !== '';
};

export const validateMultipleRows = (selectedRows) => {
  const validRows = [];
  const invalidRows = [];
  
  Object.entries(selectedRows).forEach(([materialType, rows]) => {
    rows.forEach(row => {
      if (validateReceivedData(row, materialType)) {
        validRows.push({ ...row, materialType });
      } else {
        invalidRows.push({ ...row, materialType, rowId: row.id });
      }
    });
  });
  
  return { validRows, invalidRows };
};
