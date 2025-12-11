export const materialConfigs = {
  diamond: {
    title: 'Add Diamond Details',
    saveButtonText: 'Save Diamond Details',
    materialname: 'Diamond',
    showTunchWastage: false,
    showAddInGrossWt: false,
    criteriaFields: [
      { name: 'shape', placeholder: 'Shape', width: '80px' },
      { name: 'clarity', placeholder: 'Clarity', width: '70px' },
      { name: 'color', placeholder: 'Color', width: '70px' },
      { name: 'size', placeholder: 'Size', width: '80px' }
    ]
  },
  colorstone: {
    title: 'Add ColorStone Details',
    saveButtonText: 'Save ColorStone Details',
    materialname: 'ColorStone',
    showTunchWastage: false,
    showAddInGrossWt: false,
    criteriaFields: [
      { name: 'shape', placeholder: 'Shape', width: '80px' },
      { name: 'clarity', placeholder: 'Clarity', width: '70px' },
      { name: 'color', placeholder: 'Color', width: '70px' },
      { name: 'size', placeholder: 'Size', width: '80px' }
    ]
  },
  misc: {
    title: 'Add Misc Details',
    saveButtonText: 'Save Misc Details',
    materialname: 'Misc',
    showTunchWastage: false,
    showAddInGrossWt: true,
    criteriaFields: [
      { name: 'shape', placeholder: 'Shape', width: '80px' },
      { name: 'clarity', placeholder: 'Clarity', width: '70px' },
      { name: 'color', placeholder: 'Color', width: '70px' },
      { name: 'size', placeholder: 'Size', width: '80px' }
    ]
  },
  finding: {
    title: 'Add Finding Details',
    saveButtonText: 'Save Finding Details',
    materialname: 'Finding',
    showTunchWastage: true,
    showAddInGrossWt: false,
    criteriaFields: [
      { name: 'shape', placeholder: 'Shape', width: '80px' },
      { name: 'clarity', placeholder: 'Accessories', width: '80px' },
      { name: 'size', placeholder: 'Purity', width: '70px' },
      { name: 'color', placeholder: 'Color', width: '80px' }
    ]
  },
  metal: {
    title: 'Add Metal Details',
    saveButtonText: 'Save Metal Details',
    materialname: 'Metal',
    showTunchWastage: true,
    showAddInGrossWt: false,
    isMetal: true,
    criteriaFields: [
      { name: 'metal_color', placeholder: 'Metal Color', width: '80px' },
      { name: 'pure_rate', placeholder: 'Pure Rate', width: '80px' },
      { name: 'metal_rate', placeholder: 'Metal Rate', width: '80px' }
    ]
  }
};