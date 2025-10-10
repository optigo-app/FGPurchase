export const calculateNetWeight = (grosswt, diawt = 0, cswt = 0, miscwt = 0, findingwt = 0) => {
  const grosswtNum = parseFloat(grosswt) || 0;
  const diawtNum = parseFloat(diawt) || 0;
  const cswtNum = parseFloat(cswt) || 0;
  const miscwtNum = parseFloat(miscwt) || 0;
  const findingwtNum = parseFloat(findingwt) || 0;
  
  const netwt = grosswtNum - (diawtNum / 5) - (cswtNum / 5) - miscwtNum - findingwtNum;
  return Math.max(0, netwt);
};

export const calculateGrossWeight = (netwt, diawt = 0, cswt = 0, miscwt = 0, findingwt = 0) => {
  const netwtNum = parseFloat(netwt) || 0;
  const diawtNum = parseFloat(diawt) || 0;
  const cswtNum = parseFloat(cswt) || 0;
  const miscwtNum = parseFloat(miscwt) || 0;
  const findingwtNum = parseFloat(findingwt) || 0;
  
  const grosswt =  netwtNum + (diawtNum / 5) + (cswtNum / 5) + miscwtNum + findingwtNum; 
  return Math.max(0, grosswt); 
};

export const formatWeight = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  return num.toFixed(3);
};

export const calculateTotalWeight = (materialRows, weightField = 'wt') => {
  if (!Array.isArray(materialRows) || materialRows.length === 0) {
    return 0;
  }
  
  return materialRows.reduce((total, row) => {
    const weight = parseFloat(row[weightField]) || 0;
    return total + weight;
  }, 0);
};

export const calculateDiamondWeight = (diamondRows) => {
  return calculateTotalWeight(diamondRows, 'wt');
};

export const calculateColorstoneWeight = (colorstoneRows) => {
  return calculateTotalWeight(colorstoneRows, 'wt');
};

export const calculateMiscWeight = (miscRows) => {
  return calculateTotalWeight(miscRows, 'wt');
};

export const calculateFindingWeight = (findingRows) => {
  return calculateTotalWeight(findingRows, 'wt');
};

export const calculatePureWeight = (netwt, tunch = 0, wastage = 0) => {
  const netwtNum = parseFloat(netwt) || 0;
  const tunchNum = parseFloat(tunch) || 0;
  const wastageNum = parseFloat(wastage) || 0;
  const pureWeight = netwtNum * (tunchNum + wastageNum) / 100;
  return Math.max(0, pureWeight);
};