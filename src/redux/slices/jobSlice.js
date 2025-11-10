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
  
  // Form data storage before product details
  formData: {
    mode: '', // 'bulk', 'tag', 'subtag'
    inwardAs: '', // 'neworder', 'reorder', 'jobbased'
    mainTagData: {
      productType: '',
      brand: '',
      collection: '',
      category: '',
      subCategory: '',
      gender: '',
      occasion: '',
      style: '',
      hsn: ''
    },
    subTagData: {
      productType: '',
      brand: '',
      collection: '',
      category: '',
      subCategory: '',
      gender: '',
      occasion: '',
      style: '',
      hsn: ''
    },
    hasFormData: false,
    pendingJobs: [] // For storing multiple job configurations when sub-tag is selected
  },
  
  workingArea: {
    isActive: false,
    currentJobIndex: 0, // For tracking which job we're working on in sub-tag mode

    // Main tag job data
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
    
    // Sub tag job data (for sub-tag mode)
    subTagMaterialDetails: {
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
    
    // Sub tag materials (for sub-tag mode)
    subTagMaterials: {
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
    
    // Sub tag calculations (for sub-tag mode)
    subTagCalculations: {
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

// Helper function to validate if working area has data for sub-tag mode
const validateSubTagData = (state) => {
  if (state.formData.mode !== 'subtag') {
    return true; // Not in sub-tag mode, use regular validation
  }
  
  // Check if main tag data has some content
  const mainHasData = Object.values(state.workingArea.materialDetails).some(value => value && value.trim() !== '');
  
  // Check if sub-tag data has some content
  const subHasData = Object.values(state.workingArea.subTagMaterialDetails).some(value => value && value.trim() !== '');
  
  return mainHasData && subHasData;
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

const createJobFromWorkingArea = (state, jobData, existingJobNo = null, jobConfig = null) => {
  const working = state.workingArea;
  let jobNo;
  if (existingJobNo) {
    jobNo = existingJobNo;
  } else {
    state.jobCounter += 1;
    jobNo = `JOB${String(state.jobCounter).padStart(3, '0')}`;
  }

  const originalJob = existingJobNo ? state.createdJobs.find(job => job.jobNo === existingJobNo) : null;
  
  // Use job configuration if provided (for sub-tag mode)
  const formData = jobConfig || state.formData;
  let tagData;
  let materialDetails;
  let materials;
  
  if (jobConfig && jobConfig.isSubTag) {
    // If this is a sub-tag job, use sub-tag data
    tagData = jobConfig.tagData;
    materialDetails = working.subTagMaterialDetails;
    materials = working.subTagMaterials;
  } else {
    // If this is main tag job or no jobConfig, use main data
    tagData = jobConfig ? jobConfig.tagData : state.formData.mainTagData;
    materialDetails = working.materialDetails;
    materials = working.materials;
  }

  // Generate tagNo with mode suffix
  let baseTagNo = originalJob?.tagNo || jobData.tagNo || `1/${12860 + state.jobCounter}`;
  let tagNo = baseTagNo;
  
  // Add suffix based on mode
  if (!originalJob?.tagNo && !jobData.tagNo) {
    const mode = state.formData.mode;
    if (mode === 'tag') {
      tagNo = `${baseTagNo}_T`;
    } else if (mode === 'bulk') {
      tagNo = `${baseTagNo}_B`;
    } else if (mode === 'subtag') {
      tagNo = `${baseTagNo}_ST`;
    }
  }

  return {
    jobNo: jobNo,
    tagNo: tagNo,
    customer: originalJob?.customer || jobData.customer || 'Walk-in Customer',

    gwt: roundToThreeDecimals(parseFloat(materialDetails.grosswt) || 0),
    nwt: roundToThreeDecimals(parseFloat(materialDetails.netwt) || 0),
    amount: roundToTwoDecimals(working.calculations.totalAmount),
    pureWeight: roundToThreeDecimals(working.calculations.pureWeight),

    status: 'created',
    createdAt: new Date().toISOString(),
    
    // Add isClubJob flag: 1 for subtag mode jobs, 0 for regular jobs
    isClubJob: state.formData.mode === 'subtag' ? 1 : 0,
    
    // Store form data with job
    formData: {
      mode: state.formData.mode,
      inwardAs: state.formData.inwardAs,
      tagData: { ...tagData },
      isSubTag: jobConfig?.isSubTag || false,
      subTagIndex: jobConfig?.subTagIndex || 0
    },

    fullJobData: {
      materialDetails: { ...materialDetails },
      materials: {
        diamond: [...materials.diamond],
        colorstone: [...materials.colorstone],
        misc: [...materials.misc],
        finding: [...materials.finding]
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
    },
    subTagMaterials: {
      diamond: [createBlankRow()],
      colorstone: [createBlankRow()],
      misc: [createBlankRow()],
      finding: [createBlankRow()]
    }
  };
};

// Reset form data after job creation
const resetFormDataAfterSave = (state) => {
  state.formData = {
    mode: '',
    inwardAs: '',
    mainTagData: {
      productType: '',
      brand: '',
      collection: '',
      category: '',
      subCategory: '',
      gender: '',
      occasion: '',
      style: '',
      hsn: ''
    },
    subTagData: {
      productType: '',
      brand: '',
      collection: '',
      category: '',
      subCategory: '',
      gender: '',
      occasion: '',
      style: '',
      hsn: ''
    },
    hasFormData: false,
    pendingJobs: []
  };
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    // Store form data from NewOrder component
    storeFormData: (state, action) => {
      const { mode, inwardAs, data, subTagData } = action.payload;
      
      state.formData.mode = mode;
      state.formData.inwardAs = inwardAs;
      state.formData.hasFormData = true;
      
      if (mode === 'bulk') {
        state.formData.mainTagData = { ...data };
        // For bulk mode, create single job configuration
        state.formData.pendingJobs = [{
          isSubTag: false,
          tagData: { ...data },
          subTagIndex: 0
        }];
      } else if (mode === 'tag') {
        state.formData.mainTagData = { ...data };
        // For tag mode, create single job configuration
        state.formData.pendingJobs = [{
          isSubTag: false,
          tagData: { ...data },
          subTagIndex: 0
        }];
      } else if (mode === 'subtag') {
        state.formData.mainTagData = { ...data };
        state.formData.subTagData = { ...subTagData };
        // For sub-tag mode, create two job configurations
        state.formData.pendingJobs = [
          {
            isSubTag: false,
            tagData: { ...data },
            subTagIndex: 0
          },
          {
            isSubTag: true,
            tagData: { ...subTagData },
            subTagIndex: 1
          }
        ];
      }
    },
    
    // Clear form data
    clearFormData: (state) => {
      state.formData = {
        mode: '',
        inwardAs: '',
        mainTagData: {
          productType: '',
          brand: '',
          collection: '',
          category: '',
          subCategory: '',
          gender: '',
          occasion: '',
          style: '',
          hsn: ''
        },
        subTagData: {
          productType: '',
          brand: '',
          collection: '',
          category: '',
          subCategory: '',
          gender: '',
          occasion: '',
          style: '',
          hsn: ''
        },
        hasFormData: false,
        pendingJobs: []
      };
    },
    
    // Move to next job in sub-tag mode
    moveToNextJob: (state) => {
      if (state.formData.mode === 'subtag' && state.workingArea.currentJobIndex < state.formData.pendingJobs.length - 1) {
        state.workingArea.currentJobIndex += 1;
        // Reset working area for next job but keep form data
        resetWorkingArea(state);
        state.workingArea.isActive = true;
        state.workingArea.startedAt = new Date().toISOString();
      }
    },
    
    startWorking: (state) => {
      if (!state.workingArea.isActive) {
        state.workingArea.isActive = true;
        state.workingArea.startedAt = new Date().toISOString();
        state.workingArea.currentJobIndex = 0;
      }
    },

    updateWorkingData: (state, action) => {
      const { type, payload } = action.payload;
      state.workingArea.isActive = true;
      state.workingArea.hasData = true;
      state.workingArea.isDirty = true;

      switch (type) {
        case 'materialDetails':
          if (payload.isSubTag) {
            state.workingArea.subTagMaterialDetails[payload.field] = payload.value;
          } else {
            state.workingArea.materialDetails[payload.field] = payload.value;
          }
          recalculateWorkingArea(state);
          break;
          
        case 'subTagMaterialDetails':
          state.workingArea.subTagMaterialDetails[payload.field] = payload.value;
          recalculateWorkingArea(state);
          break;

        case 'materialRow':
          const { materialType, index, field, value, isSubTag } = payload;
          const materialsTarget = isSubTag ? state.workingArea.subTagMaterials : state.workingArea.materials;
          if (materialsTarget[materialType][index]) {
            materialsTarget[materialType][index][field] = value;
            recalculateWorkingArea(state);
          }
          break;

        case 'addRow':
          const addMaterialsTarget = payload.isSubTag ? state.workingArea.subTagMaterials : state.workingArea.materials;
          addMaterialsTarget[payload.materialType].push(createBlankRow());
          break;

        case 'deleteRow':
          const deleteMaterialsTarget = payload.isSubTag ? state.workingArea.subTagMaterials : state.workingArea.materials;
          deleteMaterialsTarget[payload.materialType].splice(payload.index, 1);
          if (deleteMaterialsTarget[payload.materialType].length === 0) {
            deleteMaterialsTarget[payload.materialType].push(createBlankRow());
          }
          recalculateWorkingArea(state);
          break;

        case 'uiState':
          state.workingArea.uiState[payload.field] = payload.value;
          break;
      }
    },

    addBulkMaterialRows: (state, action) => {
      const { materialType, rows, isSubTag = false } = action.payload;
      if (rows && rows.length > 0) {
        // Determine which materials object to use based on isSubTag
        const materialsKey = isSubTag ? 'subTagMaterials' : 'materials';
        
        // Ensure the materials object exists
        if (!state.workingArea[materialsKey]) {
          state.workingArea[materialsKey] = {
            diamond: [],
            colorstone: [],
            misc: [],
            finding: []
          };
        }
        
        // Filter out empty rows from existing materials first
        const existingRows = state.workingArea[materialsKey][materialType].filter(row =>
          row.material && row.material.trim() !== ''
        );

        // Add new rows to filtered existing rows
        state.workingArea[materialsKey][materialType] = [
          ...existingRows,
          ...rows.map(rowData => ({ ...rowData }))
        ];

        state.workingArea.hasData = true;
        state.workingArea.isDirty = true;

        recalculateWorkingArea(state);
      }
    },

    saveJob: (state, action) => {
      if (state.workingArea.hasData && validateSubTagData(state)) {
        const jobData = action.payload || {};

        if (state.selectedJobFromList) {
          const jobIndex = state.createdJobs.findIndex(job => job.jobNo === state.selectedJobFromList);
          if (jobIndex !== -1) {
            const updatedJob = createJobFromWorkingArea(state, jobData, state.selectedJobFromList);
            state.createdJobs[jobIndex] = updatedJob;
          }
          state.selectedJobFromList = null;
        } else {
          // Handle multiple job creation for sub-tag mode
          if (state.formData.mode === 'subtag' && state.formData.pendingJobs.length > 1) {
            // Create both jobs at once
            const createdJobNos = [];
            
            // Create main tag job
            const mainJobConfig = state.formData.pendingJobs[0];
            const mainJob = createJobFromWorkingArea(state, jobData, null, mainJobConfig);
            state.createdJobs.unshift(mainJob);
            createdJobNos.push(mainJob.jobNo);
            
            // Create sub tag job
            const subJobConfig = state.formData.pendingJobs[1];
            const subJob = createJobFromWorkingArea(state, jobData, null, subJobConfig);
            state.createdJobs.unshift(subJob);
            createdJobNos.push(subJob.jobNo);
            
            state.appState.lastJobCreated = createdJobNos;
          } else {
            // Single job creation
            const jobConfig = state.formData.pendingJobs[0] || null;
            const newJob = createJobFromWorkingArea(state, jobData, null, jobConfig);
            state.createdJobs.unshift(newJob);
            state.appState.lastJobCreated = newJob.jobNo;
          }
        }

        resetWorkingArea(state);
        // Clear form data after all jobs are created
        if (state.formData.mode === 'subtag') {
          state.workingArea.currentJobIndex = 0;
          resetFormDataAfterSave(state);
        }
      }
    },

    saveAndNew: (state, action) => {
      if (state.workingArea.hasData && validateSubTagData(state)) {
        const jobData = action.payload || {};

        if (state.selectedJobFromList) {
          const jobIndex = state.createdJobs.findIndex(job => job.jobNo === state.selectedJobFromList);
          if (jobIndex !== -1) {
            const updatedJob = createJobFromWorkingArea(state, jobData, state.selectedJobFromList);
            state.createdJobs[jobIndex] = updatedJob;
          }
          state.selectedJobFromList = null;
        } else {
          // Handle multiple job creation for sub-tag mode
          if (state.formData.mode === 'subtag' && state.formData.pendingJobs.length > 1) {
            // Create both jobs at once
            const createdJobNos = [];
            
            // Create main tag job
            const mainJobConfig = state.formData.pendingJobs[0];
            const mainJob = createJobFromWorkingArea(state, jobData, null, mainJobConfig);
            state.createdJobs.unshift(mainJob);
            createdJobNos.push(mainJob.jobNo);
            
            // Create sub tag job
            const subJobConfig = state.formData.pendingJobs[1];
            const subJob = createJobFromWorkingArea(state, jobData, null, subJobConfig);
            state.createdJobs.unshift(subJob);
            createdJobNos.push(subJob.jobNo);
            
            state.appState.lastJobCreated = createdJobNos;
          } else {
            // Single job creation
            const jobConfig = state.formData.pendingJobs[0] || null;
            const newJob = createJobFromWorkingArea(state, jobData, null, jobConfig);
            state.createdJobs.unshift(newJob);
            state.appState.lastJobCreated = newJob.jobNo;
          }
        }

        resetWorkingArea(state);
        // Clear form data after all jobs are created
        if (state.formData.mode === 'subtag') {
          resetFormDataAfterSave(state);
        }
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

    // Get current job info for UI display
    getCurrentJobInfo: (state) => {
      if (state.formData.mode === 'subtag' && state.formData.pendingJobs.length > 1) {
        const currentConfig = state.formData.pendingJobs[state.workingArea.currentJobIndex];
        return {
          isSubTagMode: true,
          currentJobIndex: state.workingArea.currentJobIndex,
          totalJobs: state.formData.pendingJobs.length,
          currentTagData: currentConfig.tagData,
          isSubTag: currentConfig.isSubTag
        };
      }
      return {
        isSubTagMode: false,
        currentJobIndex: 0,
        totalJobs: 1,
        currentTagData: state.formData.mainTagData,
        isSubTag: false
      };
    },
    
    testAction: (state, action) => {
      state.appState.error = null;
    }
  }
});

// Export actions
export const {
  storeFormData,
  clearFormData,
  moveToNextJob,
  startWorking,
  updateWorkingData,
  addBulkMaterialRows,
  saveJob,
  saveAndNew,
  deleteJob,
  bulkDeleteJobs,
  loadJobForEdit,
  resetJobCounter,
  getCurrentJobInfo,
  testAction
} = jobSlice.actions;

export default jobSlice.reducer;
