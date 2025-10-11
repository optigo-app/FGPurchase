export const calculateNetWeight = (grosswt, diawt = 0, cswt = 0, miscwt = 0, findingwt = 0) => {
  const grosswtNum = parseFloat(grosswt) || 0;
  const diawtNum = parseFloat(diawt) || 0;
  const cswtNum = parseFloat(cswt) || 0;
  const miscwtNum = parseFloat(miscwt) || 0;
  const findingwtNum = parseFloat(findingwt) || 0;
  
  const netwt = grosswtNum - (diawtNum / 5) - (cswtNum / 5) - miscwtNum - findingwtNum;
  
  if (netwt < 0) {
    console.error('Net Weight calculation resulted in negative value:', netwt);
    throw new Error(`Net Weight cannot be negative. Calculated value: ${netwt.toFixed(3)}. Please check your input values.`);
  }
  
  return netwt;
};

export const calculateGrossWeight = (netwt, diawt = 0, cswt = 0, miscwt = 0, findingwt = 0) => {
  const netwtNum = parseFloat(netwt) || 0;
  const diawtNum = parseFloat(diawt) || 0;
  const cswtNum = parseFloat(cswt) || 0;
  const miscwtNum = parseFloat(miscwt) || 0;
  const findingwtNum = parseFloat(findingwt) || 0;
  
  const grosswt = netwtNum + (diawtNum / 5) + (cswtNum / 5) + miscwtNum + findingwtNum;
  
  if (grosswt < 0) {
    console.error('Gross Weight calculation resulted in negative value:', grosswt);
    throw new Error(`Gross Weight cannot be negative. Calculated value: ${grosswt.toFixed(3)}. Please check your input values.`);
  }
  
  return grosswt;
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

// RateCut calculation functions
export const calculateMetalFrom24K = (amount, rate) => {
  const amountNum = parseFloat(amount) || 0;
  const rateNum = parseFloat(rate) || 0;
  
  if (rateNum === 0) {
    throw new Error('Rate cannot be zero for metal calculation');
  }
  
  const metalIn24K = amountNum / rateNum;
  
  if (metalIn24K < 0) {
    throw new Error(`Metal in 24K cannot be negative. Calculated value: ${metalIn24K.toFixed(3)}. Please check your input values.`);
  }
  
  return metalIn24K;
};

export const calculateAmountFromMetal = (metalIn24K, rate) => {
  const metalNum = parseFloat(metalIn24K) || 0;
  const rateNum = parseFloat(rate) || 0;
  
  const amount = metalNum * rateNum;
  
  if (amount < 0) {
    throw new Error(`Amount cannot be negative. Calculated value: ${amount.toFixed(2)}. Please check your input values.`);
  }
  
  return amount;
};