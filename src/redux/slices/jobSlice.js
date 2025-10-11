import { createSlice } from '@reduxjs/toolkit';
import { 
  calculatePureWeight, 
  calculateDiamondWeight,
  calculateColorstoneWeight,
  calculateMiscWeight,
  calculateFindingWeight,
  formatWeight 
} from '../../Utils/globalFunc';

// Utility functions for consistent rounding
const roundToThreeDecimals = (value) => Math.round(value * 1000) / 1000;
const roundToTwoDecimals = (value) => Math.round(value * 100) / 100;

// Helper function to create blank material row
const createBlankRow = () => ({
  material: '',
  type: '',
  shape: '',
  clarity: '',
  color: '',
  size: '',
  pcs: '',
  wt: '',
  supplier: '',
  rate: '',
  amount: '',
  onPcs: null,
  addInGrossWt: null,
  wastage: 0
});

// Initial state structure
const initialState = {
  createdJobs: [],
  jobCounter: 0,
  selectedJobFromList: null,
  workingArea: {
    isActive: false,
    
    materialDetails: {
      HSN: '',
      refno: '',
      ctype: '',
      certno: '',
      huid: '',
      
      metaltype: '',
      netwt: '',
      grosswt: '',
      tunch: '',
      wastage: '',
      diawt: '',
      cswt: '',
      miscwt: '',
      finewt: '',
      labour: '',
      saleslabour: ''
    },
    
    materials: {
      diamond: [createBlankRow()],
      colorstone: [createBlankRow()],
      misc: [createBlankRow()],
      finding: [createBlankRow()]
    },
    
    calculations: {
      pureWeight: 0,
      totalAmount: 0,
      totalDiamondWeight: 0,
      totalColorstoneWeight: 0,
      totalMiscWeight: 0,
      totalFindingWeight: 0
    },
    
    uiState: {
      showTableEntry: false,
      activeModal: null,
      remarks: ''
    },
    
    hasData: false,
    isDirty: false,
    startedAt: null
  },
  
  createdJobs: [],
  
  jobCounter: 1,
  selectedJobFromList: null,
  
  jobOperations: {
    showSaveConfirmation: false,
    showEditConfirmation: false,
    targetJobData: null
  },
  
  appState: {
    loading: false,
    error: null,
    lastJobCreated: null
  }
};

const recalculateWorkingArea = (state) => {
  const working = state.workingArea;
  const { materialDetails, materials } = working;
  
  const netwt = parseFloat(materialDetails.netwt) || 0;
  const tunch = parseFloat(materialDetails.tunch) || 0;
  const wastage = parseFloat(materialDetails.wastage) || 0;
  
  const rawPureWeight = calculatePureWeight(netwt, tunch, wastage);
  working.calculations.pureWeight = roundToThreeDecimals(rawPureWeight);
  
  working.calculations.totalDiamondWeight = roundToThreeDecimals(calculateDiamondWeight(materials.diamond));
  working.calculations.totalColorstoneWeight = roundToThreeDecimals(calculateColorstoneWeight(materials.colorstone));
  working.calculations.totalMiscWeight = roundToThreeDecimals(calculateMiscWeight(materials.misc));
  working.calculations.totalFindingWeight = roundToThreeDecimals(calculateFindingWeight(materials.finding));
  
  const allRows = [
    ...materials.diamond,
    ...materials.colorstone,
    ...materials.misc,
    ...materials.finding
  ];
  
  const rawTotalAmount = allRows.reduce((total, row) => {
    return total + (parseFloat(row.amount) || 0);
  }, 0);
  
  working.calculations.totalAmount = roundToTwoDecimals(rawTotalAmount);
  
  const hasValidDiamondData = materials.diamond.some(row => row.material && row.material.trim() !== '');
  const hasValidColorstoneData = materials.colorstone.some(row => row.material && row.material.trim() !== '');
  const hasValidMiscData = materials.misc.some(row => row.material && row.material.trim() !== '');
  const hasValidFindingData = materials.finding.some(row => row.material && row.material.trim() !== '');
  
  if (hasValidDiamondData) {
    working.materialDetails.diawt = formatWeight(working.calculations.totalDiamondWeight);
  }
  if (hasValidColorstoneData) {
    working.materialDetails.cswt = formatWeight(working.calculations.totalColorstoneWeight);
  }
  if (hasValidMiscData) {
    working.materialDetails.miscwt = formatWeight(working.calculations.totalMiscWeight);
  }
  if (hasValidFindingData) {
    working.materialDetails.finewt = formatWeight(working.calculations.totalFindingWeight);
  }
};

const createJobFromWorkingArea = (state, jobData, existingJobNo = null) => {
  const working = state.workingArea;
  let jobNo;
  if (existingJobNo) {
    jobNo = existingJobNo; 
  } else {
    state.jobCounter += 1;
    jobNo = `JOB${String(state.jobCounter).padStart(3, '0')}`;
  }
  
  const originalJob = existingJobNo ? state.createdJobs.find(job => job.jobNo === existingJobNo) : null;
  
  return {
    jobNo: jobNo,
    tagNo: originalJob?.tagNo || jobData.tagNo || `1/${12860 + state.jobCounter}`,
    customer: originalJob?.customer || jobData.customer || 'Walk-in Customer',
    
    gwt: roundToThreeDecimals(parseFloat(working.materialDetails.grosswt) || 0),  
    nwt: roundToThreeDecimals(parseFloat(working.materialDetails.netwt) || 0), 
    amount: roundToTwoDecimals(working.calculations.totalAmount),              
    pureWeight: roundToThreeDecimals(working.calculations.pureWeight),
    
    status: 'created',
    createdAt: new Date().toISOString(),
    
    fullJobData: {
      materialDetails: { ...working.materialDetails },
      materials: {
        diamond: [...working.materials.diamond],
        colorstone: [...working.materials.colorstone],
        misc: [...working.materials.misc],
        finding: [...working.materials.finding]
      },
      calculations: { ...working.calculations },
      uiState: { ...working.uiState }
    }
  };
};

const resetWorkingArea = (state) => {
  state.workingArea = {
    ...initialState.workingArea,
    materials: {
      diamond: [createBlankRow()],
      colorstone: [createBlankRow()],
      misc: [createBlankRow()],
      finding: [createBlankRow()]
    }
  };
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    startWorking: (state) => {
      if (!state.workingArea.isActive) {
        state.workingArea.isActive = true;
        state.workingArea.startedAt = new Date().toISOString();
      }
    },
    
    updateWorkingData: (state, action) => {
      const { type, payload } = action.payload;
      state.workingArea.isActive = true;
      state.workingArea.hasData = true;
      state.workingArea.isDirty = true;
      
      switch (type) {
        case 'materialDetails':
          state.workingArea.materialDetails[payload.field] = payload.value;
          recalculateWorkingArea(state);
          break;
          
        case 'materialRow':
          const { materialType, index, field, value } = payload;
          if (state.workingArea.materials[materialType][index]) {
            state.workingArea.materials[materialType][index][field] = value;
            recalculateWorkingArea(state);
          }
          break;
          
        case 'addRow':
          state.workingArea.materials[payload.materialType].push(createBlankRow());
          break;
          
        case 'deleteRow':
          state.workingArea.materials[payload.materialType].splice(payload.index, 1);
          if (state.workingArea.materials[payload.materialType].length === 0) {
            state.workingArea.materials[payload.materialType].push(createBlankRow());
          }
          recalculateWorkingArea(state);
          break;
          
        case 'uiState':
          state.workingArea.uiState[payload.field] = payload.value;
          break;
      }
    },
    
    addBulkMaterialRows: (state, action) => {
      const { materialType, rows } = action.payload;
      if (rows && rows.length > 0) {
        // Filter out empty rows from existing materials first
        const existingRows = state.workingArea.materials[materialType].filter(row => 
          row.material && row.material.trim() !== ''
        );
        
        // Add new rows to filtered existing rows
        state.workingArea.materials[materialType] = [
          ...existingRows,
          ...rows.map(rowData => ({ ...rowData }))
        ];
        
        state.workingArea.hasData = true;
        state.workingArea.isDirty = true;
        
        recalculateWorkingArea(state);
      }
    },
    
    saveJob: (state, action) => {
      
      if (state.workingArea.hasData) {
        const jobData = action.payload || {};
        
        if (state.selectedJobFromList) {
          const jobIndex = state.createdJobs.findIndex(job => job.jobNo === state.selectedJobFromList);
          if (jobIndex !== -1) {
            const updatedJob = createJobFromWorkingArea(state, jobData, state.selectedJobFromList);
            state.createdJobs[jobIndex] = updatedJob;
          }
          
          state.selectedJobFromList = null;
        } else {
          const newJob = createJobFromWorkingArea(state, jobData);
          
          state.createdJobs.unshift(newJob);
          
          state.appState.lastJobCreated = newJob.jobNo;
        }
        
        resetWorkingArea(state);
      }
    },
    
    saveAndNew: (state, action) => {
      if (state.workingArea.hasData) {
        const jobData = action.payload || {};
        
        if (state.selectedJobFromList) {
          const jobIndex = state.createdJobs.findIndex(job => job.jobNo === state.selectedJobFromList);
          if (jobIndex !== -1) {
            const updatedJob = createJobFromWorkingArea(state, jobData, state.selectedJobFromList);
            state.createdJobs[jobIndex] = updatedJob;
          }
          
          state.selectedJobFromList = null;
        } else {
          const newJob = createJobFromWorkingArea(state, jobData);
          
          state.createdJobs.unshift(newJob);
          state.appState.lastJobCreated = newJob.jobNo;
        }
        
        resetWorkingArea(state);
        
        state.workingArea.isActive = true;
        state.workingArea.startedAt = new Date().toISOString();
      }
    },

    deleteJob: (state, action) => {
      const jobId = action.payload;
      state.createdJobs = state.createdJobs.filter(job => job.jobNo !== jobId);
    },
    
    bulkDeleteJobs: (state, action) => {
      const jobIds = action.payload;
      state.createdJobs = state.createdJobs.filter(job => !jobIds.includes(job.jobNo));
    },

    loadJobForEdit: (state, action) => {
      const jobNo = action.payload;
      
      const jobToEdit = state.createdJobs.find(job => job.jobNo === jobNo);
      
      if (jobToEdit && jobToEdit.fullJobData) {
        state.workingArea = {
          ...state.workingArea,
          isActive: true,
          hasData: true,
          isDirty: false,
          startedAt: new Date().toISOString(),
          
          materialDetails: { ...jobToEdit.fullJobData.materialDetails },
          
          materials: {
            diamond: [...jobToEdit.fullJobData.materials.diamond],
            colorstone: [...jobToEdit.fullJobData.materials.colorstone],
            misc: [...jobToEdit.fullJobData.materials.misc],
            finding: [...jobToEdit.fullJobData.materials.finding]
          },
          
          calculations: { ...jobToEdit.fullJobData.calculations },
          
          uiState: { ...jobToEdit.fullJobData.uiState }
        };
        
        state.selectedJobFromList = jobNo;
      }
    },

    resetJobCounter: (state) => {
      state.jobCounter = 0;
      state.createdJobs = [];
    },

    testAction: (state, action) => {
      state.appState.error = null;
    }
  }
});

// Export actions
export const {
  startWorking,
  updateWorkingData,
  addBulkMaterialRows,
  saveJob,
  saveAndNew,
  deleteJob,
  bulkDeleteJobs,
  loadJobForEdit,
  resetJobCounter,
  testAction
} = jobSlice.actions;

export default jobSlice.reducer;
