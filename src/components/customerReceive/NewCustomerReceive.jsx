import React, { useEffect, useRef, useState } from 'react'
import "./newcustomerreceive.css"
import { Button, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, useTheme } from '@mui/material';
import CustomInput from '../pickers/PickersComponent';
import DatePicker from 'react-datepicker';
import { CustomerData } from '../HomePage/dummyData';
import { capitalizeWords } from '../../master/global';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import { currencyRates, MaterialList, taxProfiles, tdsProfiles } from '../../master/MasterData';
import { Trash } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
const NewCustomerReceive = () => {
    const mode = useSelector((state) => state?.fgp?.mode);
    
    const theme = useTheme();
    const [date, setDate] = useState(new Date());
    const [trashColor, setTrashColor] = useState('grey');
    const matRef = useRef();

    // ** States
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const [selectUser, setSelectUser] = useState(mode === "material_purchase" ? 'manufacturer' : 'customer');
    const [exchRate, setExchRate] = useState("");
    const [currencyRate, setCurrencyRate] = useState("");

   // State to manage the selected material
   const [material, setMaterial] = useState('');
   const [materialList, setMaterialList] = useState(MaterialList);
   const [filterMaterialList, setFilterMaterialList] = useState(MaterialList);
   const [materialFlag, setMaterialFlag] = useState(false);
   const [materialValue, setMaterialValue] = useState('');
   const [materialId, setMaterialId] = useState('');
   const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(-1);

    const [materialObj, setMaterialObj] = useState({
      metalObj: { id:'', customer:'', material: '', mtype: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', amount:'' },
      mountObj: mode === "customer_receive" ?
      { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
      : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", amount:'', locker: '', description: '' },
      diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
      colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
      miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
      findingObj: 
        mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
        : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', labouramt:"", locker: '', description: '', amount:'' },
      alloyObj: { id:'', customer:'', material: '', mtype: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"" }
    });
    const [materialObjError, setMaterialObjError] = useState({
      metalObj: { customer:'', material: '', mtype: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
      mountObj: mode === "customer_receive" ?
      { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
      : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", amount:'', locker: '', description: '' },
      diamondObj: { customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
      colorstoneObj: { customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
      miscObj: { customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
      findingObj: mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
      : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', labouramt:"", locker: '', description: '' },
      alloyObj: { customer:'', material: '', mtype: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
    });

    const [diamondList, setDiamondList] = useState([]);
    const [colorstoneList, setColorStoneList] = useState([]);
    const [miscList, setMiscList] = useState([]);
    const [findingList, setFindingList] = useState([]);
    const [metalList, setMetalList] = useState([]);
    const [mountList, setMountList] = useState([]);
    const [alloyList, setAlloyList] = useState([]);


    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }

  const [metalObj, setMetalObj] = useState({
    material:'',
    metalType:'',
    quality:'',
    color:'',
    wt:'',
    tunch:'',
    actualWeight:'',
    rate:'',
    locker:'',
    description:''
  })
  const [mountObj, setMountObj] = useState({
    material:'',
    metalType:'',
    lot:'',
    category:'',
    quality:'',
    color:'',
    wt:'',
    pcs:'',
    tunch:'',
    actualWeight:'',
    rate:'',
    locker:'',
    description:''
  })
  const [diamondObj, setDiamondObj] = useState({
    material:'',
    mType:'',
    lot:'',
    category:'',
    shape:'',
    quality:'',
    color:'',
    size:'',
    pcs:'',
    wt:'',
    rate:'',
    locker:'',
    description:''
  })
  const [colorstoneObj, setColorstoneObj] = useState({
    material:'',
    mType:'',
    lot:'',
    shape:'',
    quality:'',
    color:'',
    size:'',
    pcs:'',
    wt:'',
    rate:'',
    locker:'',
    description:''
  })
  const [miscObj, setMiscObj] = useState({
    material:'',
    mType:'',
    lot:'',
    shape:'',
    quality:'',
    color:'',
    size:'',
    pcs:'',
    wt:'',
    rate:'',
    locker:'',
    description:''
  })
  const [findingObj, setFindingObj] = useState({
    material:'',
    metalType:'',
    lot:'',
    fType:'',
    accessories:'',
    quality:'',
    color:'',
    size:'',
    pcs:'',
    wt:'',
    tunch:'',
    actualWeight:'',
    rate:'',
    locker:'',
    description:''
  })
  const [alloyObj, setAlloyObj] = useState({
    material:'',
    metalType:'',
    quality:'',
    color:'',
    wt:'',
    rate:'',
    locker:'',
    description:''
  })



   // Handle material change (can be a dropdown or other input)
    const handleMaterialChange = (event) => {
     setMaterialValue(event.target.value);
     let val = (event.target.value)?.toLowerCase();
     if(event.target.value === ''){
      setFilterMaterialList(materialList);
      setMaterialFlag(false); 
    }else{
      const filterArr = materialList?.filter((e) => e?.id?.toString()?.toLowerCase()?.includes(val) ||
      e?.materialVal?.toString()?.toLowerCase()?.includes(val) ||
      e?.materialLabel?.toString()?.toLowerCase()?.includes(val)
     );
      setFilterMaterialList(filterArr);
      setMaterialFlag(true);
    }
    };
    const handleMaterialList = (e) => {
      setMaterialId(e.target.value);
      setMaterialValue(e.target.innerHTML);
      setMaterialObj({
        metalObj: { material: '', mtype: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
        mountObj: mode === "customer_receive" ?
        { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
        : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", amount:'', locker: '', description: '' },
        diamondObj: { material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
        colorstoneObj: { material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
        miscObj: { material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
        findingObj: mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
        : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', labouramt:"", locker: '', description: '' },
        alloyObj: { material: '', mtype: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
      })
      setMaterialFlag(false);
    }
    const handleKeyDownMaterial = (e) => {
      let key = e?.key?.toLowerCase();
      if(key === "arrowdown"){
        setSelectedMaterialIndex((prev) => (prev + 1) % filterMaterialList?.length);
      }
      else if(key === "arrowup"){
        setSelectedMaterialIndex((prev) => (prev - 1 + filterMaterialList?.length ) % filterMaterialList?.length);
      }
      else if(key === "enter" && selectedMaterialIndex >= 0){
        setMaterialId(filterMaterialList[selectedMaterialIndex]?.id);
        setMaterialValue(filterMaterialList[selectedMaterialIndex]?.materialLabel);
        setMaterialFlag(false);
        setMaterialObj({
          metalObj: { material: '', mtype: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
          mountObj: mode === "customer_receive" ?
          { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
          : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', locker: '', description: '' },
          diamondObj: { material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
          colorstoneObj: { material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
          miscObj: { material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:'', locker: '', description: '' },
          findingObj: mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
          : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', locker: '', description: '' },
          alloyObj: { material: '', mtype: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
        })
      }
    }
    const handleMaterialBlur = () => {
      setTimeout(() => {
        setMaterialFlag(false);
      },1000);
    }





    // const handleDynamicChange = (e) => {
    //   const { name, value, checked } = e.target;
      
    //   setMaterialObj(prevState => {
    //     const updatedObj = { ...prevState };  
    
    //     if(materialId === 1){
    //       updatedObj.metalObj['customer'] = searchUser;
    //       updatedObj.metalObj['material'] = "METAL";
    //       updatedObj.metalObj[name] = value;
    //       setMaterialObjError((prev) => ({
    //         ...prev, // Keep the previous error objects intact
    //         metalObj: {
    //             ...prev.metalObj, // Ensure diamondObj is updated properly
    //             quality:"",
    //             color:"",
    //             wt:"",
    //             tunch:""
    //         }
    //     }));
    //     }
    //     if(materialId === 2){
          
    //       updatedObj.mountObj['customer'] = searchUser;
    //       updatedObj.mountObj['material'] = "MOUNT";
    //       updatedObj.mountObj[name] = value;
    //       if(name === "onpcsrate" || name === "onpcslbws"){
    //         updatedObj.mountObj[name] = checked ? 1 : 0;
    //       }
          
    //       setMaterialObjError((prev) => ({
    //         ...prev, // Keep the previous error objects intact
    //         mountObj: {
    //             ...prev.mountObj, // Ensure diamondObj is updated properly
    //             category:"",
    //             metal:"",
    //             quality:"",
    //             color:"",
    //             wt:"",
    //             tunch:""
    //         }
    //     }));
    //     }
    //     if(materialId === 3){
    //       updatedObj.diamondObj['customer'] = searchUser;
    //       updatedObj.diamondObj['material'] = "DIAMOND";
    //       updatedObj.diamondObj[name] = value;

    //       if(name === "onpcsrate" || name === "onpcslbws"){
    //         updatedObj.diamondObj[name] = checked ? 1 : 0;
    //       }

    //       setMaterialObjError((prev) => ({
    //         ...prev, // Keep the previous error objects intact
    //         diamondObj: {
    //             ...prev.diamondObj, // Ensure diamondObj is updated properly
    //             shape: "",
    //             quality: "",
    //             color: "",
    //             size: "",
    //             // wt: "weight is required",
    //             // rate: "rate is required",
    //             locker: "",
    //         }
    //     }));
    //     }
    //     if(materialId === 4){
    //       updatedObj.colorstoneObj['customer'] = searchUser;
    //       updatedObj.colorstoneObj['material'] = "COLORSTONE";
    //       updatedObj.colorstoneObj[name] = value;

    //       if(name === "onpcsrate" || name === "onpcslbws"){
    //         updatedObj.colorstoneObj[name] = checked ? 1 : 0;
    //       }

    //       setMaterialObjError((prev) => ({
    //         ...prev, // Keep the previous error objects intact
    //         colorstoneObj: {
    //             ...prev.colorstoneObj, // Ensure diamondObj is updated properly
    //             shape: "",
    //             quality: "",
    //             color: "",
    //             size: "",
    //             locker: "",
    //         }
    //     }));
    //     }
    //     if(materialId === 5){
    //       updatedObj.findingObj['customer'] = searchUser;
    //       updatedObj.findingObj['material'] = "FINDING";
    //       updatedObj.findingObj[name] = value;

    //       if(name === "onpcsrate" || name === "onpcslbws"){
    //         updatedObj.findingObj[name] = checked ? 1 : 0;
    //       }

    //       setMaterialObjError((prev) => ({
    //         ...prev, // Keep the previous error objects intact
    //         findingObj: {
    //             ...prev.findingObj, // Ensure diamondObj is updated properly
    //             metal:"",
    //             fType:"",
    //             accessories:"",
    //             quality:"",
    //             color:"",
    //             wt:"",
    //             tunch:""
    //         }
    //     }));
    //     }
    //     if(materialId === 6){
    //       updatedObj.alloyObj['customer'] = searchUser;
    //       updatedObj.alloyObj['material'] = "ALLOY";
    //       updatedObj.alloyObj[name] = value;

    //       if(name === "onpcsrate" || name === "onpcslbws"){
    //         updatedObj.alloyObj[name] = checked ? 1 : 0;
    //       }

    //       setMaterialObjError((prev) => ({
    //         ...prev, // Keep the previous error objects intact
    //         alloyObj: {
    //             ...prev.alloyObj, // Ensure diamondObj is updated properly
    //             quality: "",
    //             color: "",
    //             wt:""
    //         }
    //     }));
    //     }
    //     if(materialId === 7){
    //       updatedObj.miscObj['customer'] = searchUser;
    //       updatedObj.miscObj['material'] = "MISC";
    //       updatedObj.miscObj[name] = value;

    //       if(name === "onpcsrate" || name === "onpcslbws"){
    //         updatedObj.miscObj[name] = checked ? 1 : 0;
    //       }

    //       setMaterialObjError((prev) => ({
    //         ...prev, // Keep the previous error objects intact
    //         miscObj: {
    //             ...prev.miscObj, // Ensure diamondObj is updated properly
    //             shape: "",
    //             quality: "",
    //             color: "",
    //             size: "",
    //             locker: "",
    //         }
    //     }));
    //     }
        
    //     return updatedObj;
    //   });

    // };
    
    const calculateAmount = (updatedMaterialObj) => {
      let amt = 0;
    
      if ((updatedMaterialObj.onpcsrate === 0 || updatedMaterialObj.onpcsrate === '') &&
          (updatedMaterialObj.onpcslbws === 0 || updatedMaterialObj.onpcslbws === '')) {
        if (+updatedMaterialObj.rate === 0 && +updatedMaterialObj.labour === 0) {
          amt = 0;
        } 
        if (+updatedMaterialObj.rate === 0 && +updatedMaterialObj.labour !== 0) {
          amt = (+updatedMaterialObj.labour * +updatedMaterialObj.wt);
        }
        if (+updatedMaterialObj.rate !== 0 && +updatedMaterialObj.labour === 0) {
          amt = ((+updatedMaterialObj.rate * updatedMaterialObj.tunch) * (+updatedMaterialObj.wt)) / 100;
        }
        if (+updatedMaterialObj.rate !== 0 && +updatedMaterialObj.labour !== 0) {
          amt = (((+updatedMaterialObj.rate * updatedMaterialObj.tunch) * (+updatedMaterialObj.wt)) / 100) + 
                (+updatedMaterialObj.labour * +updatedMaterialObj.wt);
        }
      }
    
      if ((updatedMaterialObj.onpcsrate === 1 || updatedMaterialObj.onpcsrate !== '') && 
          (updatedMaterialObj.onpcslbws === 0 || updatedMaterialObj.onpcslbws === '')) {
        if (updatedMaterialObj.onpcsrate === 0 || updatedMaterialObj.onpcsrate === "") {
          amt = ((+updatedMaterialObj.rate * updatedMaterialObj.tunch) / 100) * (+updatedMaterialObj.wt);
        } else {
          amt = (+updatedMaterialObj.rate * +updatedMaterialObj.pcs);
        }
      }
    
      if ((updatedMaterialObj.onpcsrate === 0 || updatedMaterialObj.onpcsrate === '') && updatedMaterialObj.onpcslbws === 1) {
        if (+updatedMaterialObj.wastage === 0) {
          amt = (((((+updatedMaterialObj.rate) * (+updatedMaterialObj.tunch)) * (+updatedMaterialObj.wt)) / 100) + 
                ((+updatedMaterialObj.labour) * (+updatedMaterialObj.pcs)));
        }
        if (+updatedMaterialObj.wastage !== 0) {
          amt = ((((+updatedMaterialObj.rate) * ((+updatedMaterialObj.tunch) + (+updatedMaterialObj.wastage))) * (+updatedMaterialObj.wt)) / 100) + 
                ((+updatedMaterialObj.labour) * (+updatedMaterialObj.pcs));
        }
      }
    
      if (updatedMaterialObj.onpcsrate === 1 && updatedMaterialObj.onpcslbws === 1) {
        amt = ((+updatedMaterialObj.rate * +updatedMaterialObj.pcs) + 
               (+updatedMaterialObj.labour * +updatedMaterialObj.pcs));
      }
    
      return amt;
    }
    
    const handleDynamicChange = (e) => {
      const { name, value, checked } = e.target;
    
      setMaterialObj(prevState => {
        const updatedObj = { ...prevState };
    
        // Update values based on materialId (MOUNT - 2 and FINDING - 5)
        if (materialId === 2) {
          updatedObj.mountObj['customer'] = searchUser;
          updatedObj.mountObj['material'] = "MOUNT";
          updatedObj.mountObj[name] = value;
          if (name === "onpcsrate" || name === "onpcslbws") {
            updatedObj.mountObj[name] = checked ? 1 : 0;
          }
          console.log(updatedObj.mountObj);
          
          setMaterialObjError((prev) => ({
            ...prev,
            mountObj: {
              ...prev.mountObj,
              category: "",
              metal: "",
              quality: "",
              color: "",
              wt: "",
              tunch: ""
            }
          }));
          
          // Calculate the amount dynamically for material ID 2 (MOUNT)
          const updatedAmount = calculateAmount(updatedObj.mountObj);
          updatedObj.mountObj.amount = updatedAmount;
        }
    
        if (materialId === 5) {
          updatedObj.findingObj['customer'] = searchUser;
          updatedObj.findingObj['material'] = "FINDING";
          updatedObj.findingObj[name] = value;
          if (name === "onpcsrate" || name === "onpcslbws") {
            updatedObj.findingObj[name] = checked ? 1 : 0;
          }
          setMaterialObjError((prev) => ({
            ...prev,
            findingObj: {
              ...prev.findingObj,
              metal: "",
              fType: "",
              accessories: "",
              quality: "",
              color: "",
              wt: "",
              tunch: ""
            }
          }));
    
          // Calculate the amount dynamically for material ID 5 (FINDING)
          const updatedAmount = calculateAmount(updatedObj.findingObj);
          updatedObj.findingObj.amount = updatedAmount;
        }
    
        // For other materials, no amount calculation is needed, just update the state
        if (![2, 5].includes(materialId)) {
          if (materialId === 1) {
            updatedObj.metalObj['customer'] = searchUser;
            updatedObj.metalObj['material'] = "METAL";
            updatedObj.metalObj[name] = value;
            if (name === "onpcsrate" || name === "onpcslbws") {
              updatedObj.findingObj[name] = checked ? 1 : 0;
            }
          } else if (materialId === 3) {
            updatedObj.diamondObj['customer'] = searchUser;
            updatedObj.diamondObj['material'] = "DIAMOND";
            updatedObj.diamondObj[name] = value;
            if (name === "onpcsrate" || name === "onpcslbws") {
              updatedObj.findingObj[name] = checked ? 1 : 0;
            }
          } else if (materialId === 4) {
            updatedObj.colorstoneObj['customer'] = searchUser;
            updatedObj.colorstoneObj['material'] = "COLORSTONE";
            updatedObj.colorstoneObj[name] = value;
            if (name === "onpcsrate" || name === "onpcslbws") {
              updatedObj.findingObj[name] = checked ? 1 : 0;
            }
          } else if (materialId === 6) {
            updatedObj.alloyObj['customer'] = searchUser;
            updatedObj.alloyObj['material'] = "ALLOY";
            updatedObj.alloyObj[name] = value;
            if (name === "onpcsrate" || name === "onpcslbws") {
              updatedObj.findingObj[name] = checked ? 1 : 0;
            }
          } else if (materialId === 7) {
            updatedObj.miscObj['customer'] = searchUser;
            updatedObj.miscObj['material'] = "MISC";
            updatedObj.miscObj[name] = value;
            if (name === "onpcsrate" || name === "onpcslbws") {
              updatedObj.findingObj[name] = checked ? 1 : 0;
            }
          }
        }
    
        return updatedObj;
      });
    };
    
    
    const handleAddInList = () => {
      
        if(materialId === 1){

          // setMetalList((prev) => (
          //   [...prev, materialObj.metalObj]
          // ));

          let requiredFields = ['quality', 'color', 'wt', 'tunch'];
    
          // Initialize an errors object to hold individual errors
          let errors = {};
      
          // Check each field and add an error message if the field is empty
          requiredFields.forEach(field => {
              if (!materialObj.metalObj[field]) {
                  errors[field] = `${field} is required`;
              }
          });
      
          if (Object.keys(errors).length === 0) {
            

              // If no errors, add the diamond object to the list
              setMetalList((prev) => {
                const updatedMetalObj = { 
                  ...materialObj.metalObj, 
                  customer: searchUser,
                  amount:((+materialObj.metalObj?.wt) * (+materialObj.metalObj?.rate)),
                  id: Math.floor(Math.random() * 100000)  // Generating a random ID
                };
                
                return [...prev, updatedMetalObj];
              });
              
              setMaterialObj({
                    metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', labour:'', wastage:'', amount:'' },
                    mountObj: { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                    diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    findingObj: { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', amount:"", description: '' },
                    alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"", labour:'', wastage:'', }
                // metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                // mountObj: mode === "customer_receive" ?
                // { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                // : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                // diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // findingObj: 
                // mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                // : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', description: '' },
                // alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
              });

              matRef.current.focus();

          } else {
              // If there are errors, update the error state
              setMaterialObjError((prev) => ({
                  ...prev, 
                  metalObj: {
                      ...prev.metalObj, 
                      ...errors // Add only the fields that are empty
                  }
              }));
          }

        }
        if(materialId === 2){
          // setMountList((prev) => (
          //   [...prev, materialObj.mountObj]
          // ))
          let requiredFields = ['metal', 'quality', "color", "wt", 'tunch'];
    
          // Initialize an errors object to hold individual errors
          let errors = {};
      
          // Check each field and add an error message if the field is empty
          requiredFields.forEach(field => {
              if (!materialObj.mountObj[field]) {
                  errors[field] = `${field} is required`;
              }
          });
      
          if (Object.keys(errors).length === 0) {
              // If no errors, add the diamond object to the list

              let amt = 0;
              let lbrAmt = 0;
            
              if((materialObj.mountObj?.onpcsrate === 0 || materialObj.mountObj?.onpcsrate === '') && (materialObj.mountObj?.onpcslbws === 0 || materialObj.mountObj?.onpcslbws === '')){
                
                if((+materialObj.mountObj?.rate) === 0 && (+materialObj.mountObj?.labour) === 0){
                  amt = 0; //condition satisfied
                }
                if(((+materialObj.mountObj?.rate) === 0) && ((+materialObj.mountObj?.labour) !== 0)){                
                  amt = ((+materialObj.mountObj?.labour) * (+materialObj.mountObj?.wt)); // condition satisfied
                }
                if((+materialObj.mountObj?.rate) !== 0 && (+materialObj.mountObj?.labour) === 0){
                  amt = (((((+materialObj.mountObj?.rate) * (materialObj.mountObj?.tunch)) * (+materialObj.mountObj?.wt))) / 100); //condition satisfied
                }
                if((+materialObj.mountObj?.rate) !== 0 && (+materialObj.mountObj?.labour) !== 0){
                  amt = (((((+materialObj.mountObj?.rate) * (+materialObj.mountObj?.tunch)) * (+materialObj.mountObj?.wt)) / 100) 
                        +
                        (+materialObj.mountObj?.labour) * (+materialObj.mountObj?.wt)); //condition satisfied
                }
              }
              if((materialObj.mountObj?.onpcsrate === 1 || materialObj.mountObj?.onpcsrate !== '') && (materialObj.mountObj?.onpcslbws === 0 || materialObj.mountObj?.onpcslbws === '')){
                if(materialObj.mountObj?.onpcsrate === 0 || materialObj.mountObj?.onpcsrate === "")  {
                  amt = ((((+materialObj.mountObj?.rate) * (+materialObj.mountObj?.tunch)) / 100) * (+materialObj.mountObj?.wt)); //condition satisfied
                }
                else{
                  amt = ((+materialObj.mountObj?.rate) * (+materialObj.mountObj?.pcs)); //condition satisfied
                }
              }
              if((materialObj.mountObj?.onpcsrate === 0 || materialObj.mountObj?.onpcsrate === '') && materialObj.mountObj?.onpcslbws === 1){
                if(+materialObj.mountObj?.wastage === 0){
                    amt = (((((+materialObj.mountObj?.rate) * (+materialObj.mountObj?.tunch)) * (+materialObj.mountObj?.wt)) / 100)
                            + 
                            ((+materialObj.mountObj?.labour) * (+materialObj.mountObj?.pcs))) //condition satisfied
                }
                if(+materialObj.mountObj?.wastage !== 0){
                  amt = (((((+materialObj.mountObj?.rate) * ((+materialObj.mountObj?.tunch) + (+materialObj.mountObj?.wastage))) * (+materialObj.mountObj?.wt))) / 100)
                        + 
                        ((+materialObj.mountObj?.labour) * (+materialObj.mountObj?.pcs)) //condition satisfied
                }
              }
              if(materialObj.mountObj?.onpcsrate === 1 && materialObj.mountObj?.onpcslbws === 1){
                amt = (((+materialObj.mountObj?.rate) * (+materialObj.mountObj?.pcs)) + ((+materialObj.mountObj?.labour) * (+materialObj.mountObj?.pcs))); //condition satisfied
              }
              if(materialObj.mountObj.onpcslbws === 0 || materialObj.mountObj.onpcslbws === ''){
                lbrAmt = ((+materialObj.mountObj?.labour) * (+materialObj?.mountObj?.wt));
              } else {
                lbrAmt = ((+materialObj.mountObj?.labour) * (+materialObj?.mountObj?.pcs));
              }
              
              setMountList((prev) => {
                const updatedMountObj = { 
                  ...materialObj.mountObj, 
                  customer: searchUser,
                  amount:amt,
                  labouramt:lbrAmt,
                  id: Math.floor(Math.random() * 100000)  // Generating a random ID
                };
                console.log(updatedMountObj);
                  
                return [...prev, updatedMountObj];
              });
              
              setMaterialObj({
                metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', labour:'', wastage:'', },
                    mountObj: { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                    diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    findingObj: { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', amount:"", description: '' },
                    alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"", labour:'', wastage:'', }
                // metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                // mountObj: mode === "customer_receive" ?
                //   { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                //   : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:'', amount:'',  locker: '', description: '' },
                // diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // findingObj: 
                // mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                // : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', labouramt:'', onpcslbws:'', locker: '', labouramt:"", description: '' },
                // alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
              });

              matRef.current.focus();

          } else {
              // If there are errors, update the error state
              setMaterialObjError((prev) => ({
                  ...prev, 
                  mountObj: {
                      ...prev.mountObj, 
                      ...errors // Add only the fields that are empty
                  }
              }));
          }
        }
        if(materialId === 3){
            // let isEmpty = Object?.values(materialObj.diamondObj)?.every((e) => e === '');
            // console.log(isEmpty, materialObj.diamondObj);

            // let requiredFields = ['shape', 'quality', 'color', 'size'];
            // let isEmpty = requiredFields.some(field => !materialObj.diamondObj[field]);
            
            // if(!isEmpty){
            //   setDiamondList((prev) => (
            //     [...prev, materialObj.diamondObj]
            //   ))
            // }else{
            //   setMaterialObjError((prev) => ({
            //     ...prev, // Keep the previous error objects intact
            //     diamondObj: {
            //         ...prev.diamondObj, // Ensure diamondObj is updated properly
            //         shape: "shape is required",
            //         quality: "quality is required",
            //         color: "color is required",
            //         size: "size is required",
            //     }
            // }));
            // }
            let requiredFields = ['shape', 'quality', 'color', 'size'];
    
            // Initialize an errors object to hold individual errors
            let errors = {};
        
            // Check each field and add an error message if the field is empty
            requiredFields.forEach(field => {
                if (!materialObj.diamondObj[field]) {
                    errors[field] = `${field} is required`;
                }
            });
        
            if (Object.keys(errors).length === 0) {
                // If no errors, add the diamond object to the list
                setDiamondList((prev) => {
                  const updatedDiamondObj = { 
                    ...materialObj.diamondObj, 
                    customer: searchUser,
                    amount:materialObj.diamondObj?.onpcsrate ? ((+materialObj.diamondObj?.pcs)*(+materialObj.diamondObj?.rate)) : ((+materialObj.diamondObj?.wt)*(+materialObj.diamondObj?.rate)),
                    id: Math.floor(Math.random() * 100000)  // Generating a random ID
                  };
                  
                  return [...prev, updatedDiamondObj];
                });
                
        setMaterialObj({
          metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', labour:'', wastage:'', },
                    mountObj: { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                    diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    findingObj: { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', amount:"", description: '' },
                    alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"", labour:'', wastage:'', }
          // metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
          // mountObj: mode === "customer_receive" ?
          //         { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
          //         : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
          // diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
          // colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
          // miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
          // findingObj: 
          //       mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
          //       : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', labouramt:"", locker: '', description: '' },
          // alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
        });

        matRef.current.focus();
            } else {
                // If there are errors, update the error state
                setMaterialObjError((prev) => ({
                    ...prev, 
                    diamondObj: {
                        ...prev.diamondObj, 
                        ...errors // Add only the fields that are empty
                    }
                }));
            }
        }
        if(materialId === 4){
          // setColorStoneList((prev) => (
          //   [...prev, materialObj.colorstoneObj]
          // ))
          let requiredFields = ['shape', 'quality', 'color', 'size'];
    
            // Initialize an errors object to hold individual errors
            let errors = {};
        
            // Check each field and add an error message if the field is empty
            requiredFields.forEach(field => {
                if (!materialObj.colorstoneObj[field]) {
                    errors[field] = `${field} is required`;
                }
            });
        
            if (Object.keys(errors).length === 0) {
                // If no errors, add the diamond object to the list
                setColorStoneList((prev) => {
                  const updatedColorStoneObj = { 
                    ...materialObj.colorstoneObj, 
                    customer: searchUser,
                    amount:materialObj.colorstoneObj?.onpcsrate ? ((+materialObj.colorstoneObj?.pcs)*(+materialObj.colorstoneObj?.rate)) : ((+materialObj.colorstoneObj?.wt)*(+materialObj.colorstoneObj?.rate)),
                    id: Math.floor(Math.random() * 100000)  // Generating a random ID
                  };
                  
                  return [...prev, updatedColorStoneObj];
                });
                
                setMaterialObj({
                  metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', labour:'', wastage:'', },
                    mountObj: { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                    diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    findingObj: { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', amount:"", description: '' },
                    alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"", labour:'', wastage:'', }
                  // metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                  // mountObj: mode === "customer_receive" ?
                  // { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                  // : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                  // diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                  // colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                  // miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                  // findingObj: 
                  // mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                  // : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', labouramt:"", locker: '', description: '' },
                  // alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
                });

                matRef.current.focus();

            } else {
                // If there are errors, update the error state
                setMaterialObjError((prev) => ({
                    ...prev, 
                    colorstoneObj: {
                        ...prev.colorstoneObj, 
                        ...errors // Add only the fields that are empty
                    }
                }));
            }
        }
        if(materialId === 5){
          // setFindingList((prev) => (
          //   [...prev, materialObj.findingObj]
          // ))
          let requiredFields = ['fType', 'accessories', 'metal', "quality", "color", "wt", 'tunch'];
    
          // Initialize an errors object to hold individual errors
          let errors = {};
      
          // Check each field and add an error message if the field is empty
          requiredFields.forEach(field => {
              if (!materialObj.findingObj[field]) {
                  errors[field] = `${field} is required`;
              }
          });
      
          if (Object.keys(errors).length === 0) {

            let amt = 0;
            let lbrAmt = 0;
            if((materialObj.findingObj?.onpcsrate === 0 || materialObj.findingObj?.onpcsrate === '') && (materialObj.findingObj?.onpcslbws === 0 || materialObj.findingObj?.onpcslbws === '')){
              
              if((+materialObj.findingObj?.rate) === 0 && (+materialObj.findingObj?.labour) === 0){
                amt = 0; //condition satisfied
              }
              if(((+materialObj.findingObj?.rate) === 0) && ((+materialObj.findingObj?.labour) !== 0)){                
                amt = ((+materialObj.findingObj?.labour) * (+materialObj.findingObj?.wt)); // condition satisfied
              }
              if((+materialObj.findingObj?.rate) !== 0 && (+materialObj.findingObj?.labour) === 0){
                amt = (((((+materialObj.findingObj?.rate) * (materialObj.findingObj?.tunch)) * (+materialObj.findingObj?.wt))) / 100); //condition satisfied
              }
              if((+materialObj.findingObj?.rate) !== 0 && (+materialObj.findingObj?.labour) !== 0){
                amt = (((((+materialObj.findingObj?.rate) * (+materialObj.findingObj?.tunch)) * (+materialObj.findingObj?.wt)) / 100) 
                      +
                      (+materialObj.findingObj?.labour) * (+materialObj.findingObj?.wt)); //condition satisfied
              }
            }
            if((materialObj.findingObj?.onpcsrate === 1 || materialObj.findingObj?.onpcsrate !== '') && (materialObj.findingObj?.onpcslbws === 0 || materialObj.findingObj?.onpcslbws === '')){
              if(materialObj.findingObj?.onpcsrate === 0 || materialObj.findingObj?.onpcsrate === "")  {
                amt = ((((+materialObj.findingObj?.rate) * (+materialObj.findingObj?.tunch)) / 100) * (+materialObj.findingObj?.wt)); //condition satisfied
              }
              else{
                amt = ((+materialObj.findingObj?.rate) * (+materialObj.findingObj?.pcs)); //condition satisfied
              }
            }
            if((materialObj.findingObj?.onpcsrate === 0 || materialObj.findingObj?.onpcsrate === '') && materialObj.findingObj?.onpcslbws === 1){
              if(+materialObj.findingObj?.wastage === 0){
                  amt = (((((+materialObj.findingObj?.rate) * (+materialObj.findingObj?.tunch)) * (+materialObj.findingObj?.wt)) / 100)
                        + 
                        ((+materialObj.findingObj?.labour) * (+materialObj.findingObj?.pcs))) //condition satisfied
              }
              if(+materialObj.findingObj?.wastage !== 0){
                amt = (((((+materialObj.findingObj?.rate) * ((+materialObj.findingObj?.tunch) + (+materialObj.findingObj?.wastage))) * (+materialObj.findingObj?.wt))) / 100)
                      + 
                      ((+materialObj.findingObj?.labour) * (+materialObj.findingObj?.pcs)) //condition satisfied
              }
            }
            if(materialObj.findingObj?.onpcsrate === 1 && materialObj.findingObj?.onpcslbws === 1){
              amt = (((+materialObj.findingObj?.rate) * (+materialObj.findingObj?.pcs)) + ((+materialObj.findingObj?.labour) * (+materialObj.findingObj?.pcs))); //condition satisfied
            }
            if(materialObj.findingObj.onpcslbws === 0 || materialObj.findingObj.onpcslbws === ''){
              lbrAmt = ((+materialObj.findingObj?.labour) * (+materialObj?.findingObj?.wt));
            }
            if(materialObj.findingObj.onpcslbws === 1 || materialObj.findingObj.onpcslbws !== ''){
              lbrAmt = ((+materialObj.findingObj?.labour) * (+materialObj?.findingObj?.pcs));
            }
              
              // If no errors, add the diamond object to the list
              setFindingList((prev) => {
                const updatedFindingObj = { 
                  ...materialObj.findingObj, 
                  customer: searchUser,
                  amount:amt,
                  labouramt:lbrAmt,
                  id: Math.floor(Math.random() * 100000)  // Generating a random ID
                };
                
                return [...prev, updatedFindingObj];
              });
              
              setMaterialObj({
                metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', labour:'', wastage:'', },
                    mountObj: { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                    diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    findingObj: { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', amount:"", description: '' },
                    alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"", labour:'', wastage:'', }
                // metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                // mountObj: mode === "customer_receive" ?
                //   { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                //   : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                // diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                // findingObj: 
                //   mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                //   : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', labouramt:"", locker: '', description: '' },
                // alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
              });

              matRef.current.focus();

          } else {
              // If there are errors, update the error state
              setMaterialObjError((prev) => ({
                  ...prev, 
                  findingObj: {
                      ...prev.findingObj, 
                      ...errors // Add only the fields that are empty
                  }
              }));
          }
        }
        if(materialId === 6){
          // setAlloyList((prev) => (
          //   [...prev, materialObj.alloyObj]
          // ))
          let requiredFields = ["quality","color","wt"];
    
          // Initialize an errors object to hold individual errors
          let errors = {};
      
          // Check each field and add an error message if the field is empty
          requiredFields.forEach(field => {
              if (!materialObj.alloyObj[field]) {
                  errors[field] = `${field} is required`;
              }
          });
      
          if (Object.keys(errors).length === 0) {
              // If no errors, add the diamond object to the list
              setAlloyList((prev) => {
                const updatedAlloyObj = { 
                  ...materialObj.alloyObj, 
                  customer: searchUser,
                  amount: ((+materialObj.alloyObj?.wt) * (+materialObj.alloyObj?.rate)),
                  id: Math.floor(Math.random() * 100000)  // Generating a random ID
                };
                
                return [...prev, updatedAlloyObj];
              });
              
              setMaterialObj({
                metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', labour:'', wastage:'', },
                    mountObj: { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                    diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    findingObj: { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', amount:"", description: '' },
                    alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"", labour:'', wastage:'', }
                // metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                // mountObj: mode === "customer_receive" ?
                //   { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                //   : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                // diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
                // colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
                // miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
                // findingObj: 
                //   mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                //   : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', locker: '', labouramt:"", description: '' },
                // alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
              });

              matRef.current.focus();

          } else {
              // If there are errors, update the error state
              setMaterialObjError((prev) => ({
                  ...prev, 
                  alloyObj: {
                      ...prev.alloyObj, 
                      ...errors // Add only the fields that are empty
                  }
              }));
          }
        }
        if(materialId === 7){
          // setMiscList((prev) => (
          //   [...prev, materialObj.miscObj]
          // ))
          let requiredFields = ['shape', 'quality', 'color', 'size'];
    
            // Initialize an errors object to hold individual errors
            let errors = {};
        
            // Check each field and add an error message if the field is empty
            requiredFields.forEach(field => {
                if (!materialObj.miscObj[field]) {
                    errors[field] = `${field} is required`;
                }
            });
        
            if (Object.keys(errors).length === 0) {
                // If no errors, add the diamond object to the list
                setMiscList((prev) => {
                  const updatedMiscObj = { 
                    ...materialObj.miscObj, 
                    customer: searchUser,
                    amount:materialObj.miscObj?.onpcsrate ? ((+materialObj.miscObj?.pcs)*(+materialObj.miscObj?.rate)) : ((+materialObj.miscObj?.wt)*(+materialObj.miscObj?.rate)),
                    id: Math.floor(Math.random() * 100000)  // Generating a random ID
                  };
                  
                  return [...prev, updatedMiscObj];
                });
                
                
                setMaterialObj({
                  metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', labour:'', wastage:'', },
                    mountObj: { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                    diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    findingObj: { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', amount:"", description: '' },
                    alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"", labour:'', wastage:'', }
                  // metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                  // mountObj: mode === "customer_receive" ?
                  // { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                  // : { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', locker: '', labouramt:"", description: '' },
                  // diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                  // colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                  // miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '' },
                  // findingObj: 
                  // mode === "customer_receive" ? { id:'', customer:'', material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' }
                  // : { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'',wastage:'', onpcslbws:'', locker: '', labouramt:"", description: '' },
                  // alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
                });

                matRef.current.focus();

            } else {
                // If there are errors, update the error state
                setMaterialObjError((prev) => ({
                    ...prev, 
                    miscObj: {
                        ...prev.miscObj, 
                        ...errors // Add only the fields that are empty
                    }
                }));
            }
        }

        // setMaterialObj({
        //   metalObj: { customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
        //   mountObj: { customer:'', material: '', metal: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
        //   diamondObj: { customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
        //   colorstoneObj: { customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
        //   miscObj: { customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
        //   findingObj: { customer:'', material: '', metal: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
        //   alloyObj: { customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
        // });

        matRef.current.focus();
    }

    // const calculateAmount = (updatedMaterialObj) => {
    //   let amt = 0;
      
    //   if ((updatedMaterialObj.onpcsrate === 0 || updatedMaterialObj.onpcsrate === '') && 
    //       (updatedMaterialObj.onpcslbws === 0 || updatedMaterialObj.onpcslbws === '')) {
    //     if (+updatedMaterialObj.rate === 0 && +updatedMaterialObj.labour === 0) {
    //       amt = 0;
    //     } 
    //     if (+updatedMaterialObj.rate === 0 && +updatedMaterialObj.labour !== 0) {
    //       amt = (+updatedMaterialObj.labour * +updatedMaterialObj.wt);
    //     }
    //     if (+updatedMaterialObj.rate !== 0 && +updatedMaterialObj.labour === 0) {
    //       amt = ((+updatedMaterialObj.rate * updatedMaterialObj.tunch) * (+updatedMaterialObj.wt)) / 100;
    //     }
    //     if (+updatedMaterialObj.rate !== 0 && +updatedMaterialObj.labour !== 0) {
    //       amt = (((+updatedMaterialObj.rate * updatedMaterialObj.tunch) * (+updatedMaterialObj.wt)) / 100) + 
    //             (+updatedMaterialObj.labour * +updatedMaterialObj.wt);
    //     }
    //   }
    
    //   if ((updatedMaterialObj.onpcsrate === 1 || updatedMaterialObj.onpcsrate !== '') && 
    //       (updatedMaterialObj.onpcslbws === 0 || updatedMaterialObj.onpcslbws === '')) {
    //     if (updatedMaterialObj.onpcsrate === 0 || updatedMaterialObj.onpcsrate === "") {
    //       amt = ((+updatedMaterialObj.rate * updatedMaterialObj.tunch) / 100) * (+updatedMaterialObj.wt);
    //     } else {
    //       amt = (+updatedMaterialObj.rate * +updatedMaterialObj.pcs);
    //     }
    //   }
    
    //   if ((updatedMaterialObj.onpcsrate === 0 || updatedMaterialObj.onpcsrate === '') && updatedMaterialObj.onpcslbws === 1) {
    //     if (+updatedMaterialObj.wastage === 0) {
    //       amt = ((((+updatedMaterialObj.rate * updatedMaterialObj.tunch) * (+updatedMaterialObj.wt)) / 100) + 
    //             (+updatedMaterialObj.labour * +updatedMaterialObj.pcs));
    //     }
    //     if (+updatedMaterialObj.wastage !== 0) {
    //       amt = (((+updatedMaterialObj.rate * (+updatedMaterialObj.tunch + updatedMaterialObj.wastage)) * (+updatedMaterialObj.wt)) / 100) + 
    //             (+updatedMaterialObj.labour * +updatedMaterialObj.pcs);
    //     }
    //   }
    
    //   if (updatedMaterialObj.onpcsrate === 1 && updatedMaterialObj.onpcslbws === 1) {
    //     amt = ((+updatedMaterialObj.rate * +updatedMaterialObj.pcs) + 
    //            (+updatedMaterialObj.labour * +updatedMaterialObj.pcs));
    //   }
    
    //   return amt;
    // }
    

    const handleEnterKeyDown = (e) => {
      if(e?.key?.toLowerCase() === "enter"){

      
        if(materialId === 1){
          setMetalList((prev) => (
            [...prev, materialObj.metalObj]
          ))
        }
        if(materialId === 2){
          setMountList((prev) => (
            [...prev, materialObj.mountObj]
          ))
        }
        if(materialId === 3){
          setDiamondList((prev) => (
            [...prev, materialObj.diamondObj]
          ))
        }
        if(materialId === 4){
          setColorStoneList((prev) => (
            [...prev, materialObj.colorstoneObj]
          ))
        }
        if(materialId === 5){
          setFindingList((prev) => (
            [...prev, materialObj.findingObj]
          ))
        }
        if(materialId === 6){
          setAlloyList((prev) => (
            [...prev, materialObj.alloyObj]
          ))
        }
        if(materialId === 7){
          setMiscList((prev) => (
            [...prev, materialObj.miscObj]
          ))
        }
      }
    }

    // const columns = [ 
    //   { id: 'srno', label: 'SrNo', minWidth: 80, align: 'center' },
    //   { id: 'customer', label: 'Customer', minWidth: 80, align: 'center' },
    //   { id: 'material', label: 'Material', minWidth: 80, align: 'left' },
    //   { id: 'mtype', label: 'MType', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
    //   { id: 'lot', label: 'Lot#', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
    //   { id: 'type', label: 'Type', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
    //   { id: 'quality', label: 'Quality', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
    //   { id: 'color', label: 'Color', minWidth: 80, align: 'left', format: value => value?.toLocaleString('en-US') },
    //   { id: 'size', label: 'Size', minWidth: 80, align: 'left', format: value => value?.toFixed(2) },
    //   { id: 'pcs', label: 'Pcs', minWidth: 80, align: 'right', format: value => value?.toFixed(2) },
    //   { id: 'wt', label: 'Weight', minWidth: 80, align: 'right', format: value => value?.toFixed(2) },
    //   { id: 'tunch', label: 'Tunch', minWidth: 100, align: 'right', format: value => value?.toFixed(2) },
    //   mode === "customer_receive" && { id: 'actualWeight', label: 'Actual Weight', minWidth: 100, align: 'left', format: value => value?.toFixed(2) },
    //   mode === "material_purchase" && { id: 'labour', label: 'Labour', minWidth: 100, align: 'right', format: value => value?.toFixed(2) },
    //   mode === "material_purchase" && { id: 'labouramt', label: 'LabourAmt', minWidth: 100, align: 'right', format: value => value?.toFixed(2) },
    //   mode === "material_purchase" && { id: 'amount', label: 'Total', minWidth: 100, align: 'left', format: value => value?.toFixed(2) },
    //   { id: 'locker', label: 'Locker', minWidth: 80, align: 'left', format: value => value?.toFixed(2) },
    //   { id: 'description', label: 'Description', minWidth: 90, align: 'right', format: value => value?.toFixed(2) },
    //   { id: 'action', label: 'Remove', minWidth: 90, align: 'right', format: value => value?.toFixed(2) },
    // ]
    const columns = [
      { id: 'srno', label: 'SrNo', minWidth: 80, align: 'center' },
      { id: 'customer', label: 'Customer', minWidth: 80, align: 'center' },
      { id: 'material', label: 'Material', minWidth: 80, align: 'left' },
      { id: 'mtype', label: 'MType', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
      { id: 'lot', label: 'Lot#', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
      { id: 'type', label: 'Type', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
      { id: 'quality', label: 'Quality', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
      { id: 'color', label: 'Color', minWidth: 80, align: 'left', format: value => value?.toLocaleString('en-US') },
      { id: 'size', label: 'Size', minWidth: 80, align: 'left', format: value => value?.toFixed(2) },
      { id: 'pcs', label: 'Pcs', minWidth: 80, align: 'right', format: value => value?.toFixed(2) },
      { id: 'wt', label: 'Weight', minWidth: 80, align: 'right', format: value => value?.toFixed(2) },
      { id: 'tunch', label: 'Tunch', minWidth: 100, align: 'right', format: value => value?.toFixed(2) },
      ...(mode === "customer_receive" ? [{ id: 'actualWeight', label: 'Actual Weight', minWidth: 100, align: 'left', format: value => value?.toFixed(2) }] : []),
      ...(mode === "material_purchase" ? [
        { id: 'less', label: 'Less', minWidth: 100, align: 'right', format: value => value?.toFixed(2) },
        { id: 'labour', label: 'Labour', minWidth: 100, align: 'right', format: value => value?.toFixed(2) },
        { id: 'labouramt', label: 'LabourAmt', minWidth: 100, align: 'right', format: value => value?.toFixed(2) },
        { id: 'amount', label: 'Total', minWidth: 100, align: 'left', format: value => value?.toFixed(2) }
      ] : []),
      { id: 'locker', label: 'Locker', minWidth: 80, align: 'left', format: value => value?.toFixed(2) },
      { id: 'description', label: 'Description', minWidth: 90, align: 'right', format: value => value?.toFixed(2) },
      { id: 'action', label: 'Remove', minWidth: 90, align: 'right', format: value => value?.toFixed(2) }
    ];
    
    
 


    const handleSelectUser = (e) => {
      setSelectUser(e.target.value);
    }


    const handleExchRate = (e) => {
      setExchRate(e.target.value);
    }
    const handleCurrencyRate = (e) => {
      setCurrencyRate(e.target.value);
      setExchRate(e.target.value);
    }
    
    


      //user logic
  const [searchUser, setUserSearch] = useState('');
  const [userList, setUserList] = useState(CustomerData);
  const [selectedUser, setSelectedUser] = useState('');
  const [showUserListFlag, setShowUserListFlag] = useState(false);
  const [searchUservalidationError, setSearchUservalidationError] = useState(false);
  const [selectedUserIndex, setSelecteUserdIndex] = useState(-1);
  const handleUserTypo = (e) => {
    setUserSearch(e.target.value);
    const value = e.target.value;
    if(e.target.value){

      let searchVal = (e.target.value)?.toLowerCase()?.toString();
      setShowUserListFlag(true);

      const filteredUserArr = CustomerData?.filter((el, i) =>  el?.TypoLabel?.toString()?.toLowerCase()?.includes(searchVal));

      setUserList(filteredUserArr);
      
      // setValidationErrors((prev) => ({ ...prev, searchUser: !(value)?.toString()?.trim() }));
      // if(value === ''){
      //   setSearchUservalidationError(true);
      // }else{
      //   setSearchUservalidationError(false);
      // }

    }else{
      setShowUserListFlag(false);
    }
    setSelecteUserdIndex(-1);
  }
  const handleUserList = (e)=> {

      setSelectedUser(e?.TypoLabel);
      setUserSearch(e?.TypoLabel);
      if(e?.TypoLabel){
        setShowUserListFlag(false);
      }
  }
  const handleUserBlur = () => {
      setTimeout(() => {
        setShowUserListFlag(false);
      },2000);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
        // Move down in the list
        // setSelecteUserdIndex(prevIndex => Math.min(prevIndex + 1, userList?.length - 1));
        setSelecteUserdIndex((prevIndex) => (prevIndex + 1) % userList?.length);
        // scrollToSelectedItem((selectedUserIndex + 1) % userList.length);
    } else if (e.key === 'ArrowUp') {
        // Move up in the list
        setSelecteUserdIndex((prevIndex) => (prevIndex - 1 + userList?.length) % userList?.length);
        // scrollToSelectedItem((selectedUserIndex - 1 + userList.length) % userList.length);
    } else if (e.key === 'Enter' && selectedUserIndex >= 0) {
        // Select the current item on Enter
        handleUserList(userList[selectedUserIndex]);
    }
  };

useEffect(() => {
  setMaterialList(materialList);
  setFilterMaterialList(materialList);
},[]);


const handleRemove = (obj) => {

  if(obj?.material?.toLowerCase() === "metal"){
    const updatedMetalList = metalList?.filter((e) => +e?.id !== +obj?.id);
    setMetalList(updatedMetalList);
  }
  if(obj?.material?.toLowerCase() === "mount"){
    const updatedMountList = mountList?.filter((e) => +e?.id !== +obj?.id);
    setMountList(updatedMountList);
  }
  if(obj?.material?.toLowerCase() === "alloy"){
    const updatedAlloyList = alloyList?.filter((e) => +e?.id !== +obj?.id);
    setAlloyList(updatedAlloyList);
  }
  if(obj?.material?.toLowerCase() === "diamond"){
    const updatedDiamondList = diamondList?.filter((e) => +e?.id !== +obj?.id);
    setDiamondList(updatedDiamondList);
  }
  if(obj?.material?.toLowerCase() === "colorstone"){
    const updatedColorStoneList = colorstoneList?.filter((e) => +e?.id !== +obj?.id);
    setColorStoneList(updatedColorStoneList);
  }
  if(obj?.material?.toLowerCase() === "misc"){
    const updatedMiscList = miscList?.filter((e) => +e?.id !== +obj?.id);
    setMiscList(updatedMiscList);
  }
  if(obj?.material?.toLowerCase() === "finding"){
    const updatedFindingList = findingList?.filter((e) => +e?.id !== +obj?.id);
    setFindingList(updatedFindingList);
  }
  
}

const handleSave = () => {
  
  const finalDataMainArray = [
    ...metalList, 
    ...mountList, 
    ...alloyList, 
    ...diamondList, 
    ...colorstoneList, 
    ...miscList, 
    ...findingList
  ]?.sort((a, b) => a?.material?.toLowerCase()?.localeCompare(b?.material?.toLowerCase()))
    .map((item, index) => ({
      ...item, // Copy all existing properties
      srno: index + 1 // Add the serial number as the index + 1
    }));

    console.log(finalDataMainArray);
};

  return (
    <div className='cust_receive_container'>
        <div className='my-2'><Typography variant='h5' className='fs_fgp'>INWARD ENTRY</Typography></div>
        <div className='filters_container_cr my-1'>
            <div className="filter-item">
              <div>
                  <label htmlFor="inwardno" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>INWARD NO</label>
                  <input type="text" placeholder="inward no" id='inwardno' value={"AUTO"} className='categoryNewOrder filter_item_call fs_fgp'  />
              </div>
            </div>
            <div className="filter-item">
              <div>
                  <label htmlFor="custDropDown" className='fs_fgp'  style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}} >SELECT USER</label>
                  <select name="custDropDown" id="custDropDown" className='fs_fgp custrec' value={selectUser} onChange={(e) => handleSelectUser(e)}>
                    <option value="customer">Customer</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="supplier">Supplier</option>
                  </select>
              </div>
            </div>
            <div>
              <div>
                  <label htmlFor="refno" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>REFERENCE NO.</label>
                  <input type="text" placeholder="reference no" id='refno'  className='categoryNewOrder filter_item_call fs_fgp'  />
              </div>
            </div>
            <div className="filter-item">
              <div>
                  <label htmlFor="basic-input" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>DATE</label>
                  <div className="datePicker_hp fs_fgp" >
                    <DatePicker
                      selected={date}
                      id='basic-input'
                      onChange={date => setDate(date)}
                      placeholderText='Click to select a date'
                      customInput={<CustomInput className='rounded fs_fgp' style={{border:'1px solid rgb(204, 204, 204)'}}  />}
                      className='fs_fgp'
                    />
                  </div>
              </div>
            </div>
            <div className="filter-item">
              <div>
                  <label htmlFor="bill" className='fs_fgp' style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>BILL MODE</label>
                  <select name="bill" id="bill" className='fs_fgp custrec'>
                    <option value="customer">Material Purchase</option>
                    <option value="manufacturer">Labour Purchase</option>
                  </select>
              </div>
            </div>
        </div>
          <div className='filters_container_cr_2 my-1'>
                <div>
                  <div className="d-flex align-items-start flex-column w-100 userBox_hm">
                      <label htmlFor="customer_rec" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>{selectUser?.toUpperCase()}</label>
                      <input type="text" placeholder={selectUser} id='customer_rec' autoComplete='off' value={searchUser}  className='categoryNewOrder filter_item_call3 fs_fgp' onBlur={() => handleUserBlur()}  onChange={(el) => handleUserTypo(el)} onKeyDown={handleKeyDown}   />
                      {
                      showUserListFlag && <>
                      <div className='userSuggestionList_hm fs_fgp'>
                        {/* <ul ref={userListRef}> */}
                        <ul>
                          {
                            userList?.length > 0 && userList?.map((e, index) => {
                              return (
                                <li key={e?.id} value={selectedUser} className='py-1 fs_size_14' onClick={() => handleUserList(e)}  
                                style={{
                                  backgroundColor: index === selectedUserIndex ? '#d3d3d3' : 'transparent', // Highlight selected item
                              }}>{capitalizeWords(e?.TypoLabel)}</li>
                              )
                            })
                          }
                        </ul>
                      </div>
                      </>
                    }
                  </div>
                </div>
              <div className='d-flex justify-content-start align-items-end fw-bold fs_fgp'>
                (0017248) |  
                Admin :
                admin |  
                T:
                874-551-4122
              </div>
              { mode === "customer_receive" && <div className='d-flex align-items-end justify-content-start' style={{minWidth:'410px'}}>
                <Button size='small' variant='contained' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white', mx:1, marginLeft:"0px"}} className='fs_fgp'>ADD NEW</Button>
                <Button size='small' variant='contained' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white', mx:1,}} className='fs_fgp'>INWARD VIEW</Button>
                <Button size='small' variant='contained' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white', mx:1}} className='fs_fgp'>DETAIL VIEW</Button>
                <Button size='small' variant='contained' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white', mx:1,  marginRight:"0px"}} className='fs_fgp'>PRINT</Button>
              </div>}
              
              
              
          </div>
          { mode === "material_purchase" && <div className='filters_container_cr my-1'>
              <div className="filter-item">
                <div>
                    <label htmlFor="taxtype" className='fs_fgp' style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>TAX TYPE</label>
                    <select name="taxtype" id="taxtype" className='fs_fgp custrec'>
                      {
                        taxProfiles?.map((e, i) => {
                          return <option key={i} value={e?.value}>{e?.label}</option>
                        })
                      }
                    </select>
                </div>
              </div>
              <div className="filter-item">
                <div>
                    <label htmlFor="tdstype" className='fs_fgp' style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>TDS TYPE</label>
                    <select name="tdstype" id="tdstype" className='fs_fgp custrec'>
                      {
                        tdsProfiles?.map((e, i) => {
                          return <option key={i} value={e?.value}>{e?.label}</option>
                        })
                      }
                    </select>
                </div>
              </div>
              <div className="filter-item">
                <div>
                    <label htmlFor="currrate" className='fs_fgp' style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>CURRENCY RATE</label>
                    <select name="currrate" id="currrate" className='fs_fgp custrec' value={currencyRate} onChange={(e) => handleCurrencyRate(e)}>
                      {
                        currencyRates?.map((e, i) => {
                          return <option key={i} value={e?.value}>{e?.label}</option>
                        })
                      }
                    </select>
                </div>
              </div>
              <div className="filter-item">
                  <div>
                    <label htmlFor="exchrate" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>EXCHANGE RATE</label>
                    <input type="text" placeholder="exch. rate" id='exchrate' value={exchRate} onChange={handleExchRate} className='categoryNewOrder filter_item_call fs_fgp'  />
                  </div>
              </div>
          </div>}
        { selectedUser === '' ? '' : <>
        <div className='my-4'><Typography variant='h5' className='fs_fgp text_color' >MATERIAL ENTRY</Typography></div>
        <div className="filters-container_cr fs_fgp">      
          <div className="filter-item">
            <div>
              <label htmlFor="material" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>MATERIAL</label>
              <input type="text" id="material" placeholder="material" autoComplete='off' ref={matRef} className='postion-relative' value={materialValue} 
                onBlur={() => handleMaterialBlur()}
                onChange={(e) => handleMaterialChange(e)} onKeyDown={(e) => handleKeyDownMaterial(e)}
               />
                {materialFlag && <div className='suggestion_dropdown_material'>
                  <ul>
                    {
                      filterMaterialList?.map((e, i) => {
                        return <li key={i} value={e?.id} materialVal={e?.materialVal} onClick={(e) => handleMaterialList(e)}
                        style={{
                          backgroundColor: i === selectedMaterialIndex ? '#d3d3d3' : 'transparent', // Highlight selected item
                        }}
                        >{e?.materialLabel}</li>
                      })
                    }
                  </ul>
                  </div>}
            </div>
          </div>
          { (materialId === 1 || materialId === 2 || materialId === 5 || materialId === 6) && <div className="filter-item">
            <div>
              <label htmlFor="metal" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>METAL</label>
              <input type="text" id="metal" name='metal' autoComplete='off' value={materialObj?.metalObj?.metal || materialObj.mountObj?.metal || materialObj.findingObj?.metal || materialObj.alloyObj?.metal} onChange={(e)=> handleDynamicChange(e)} 
                style={{border:(materialObjError?.mountObj?.metal || materialObjError?.findingObj?.metal) ? "1px solid red" : ""}}
               />
            </div>
          </div>}
          { (materialId === 3 || materialId === 4 || materialId === 7) && <div className="filter-item">
            <div>
              <label htmlFor="mtype" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>MTYPE</label>
              <input type="text" id="mtype" name='mtype' autoComplete='off' value={materialObj.diamondObj?.mtype || materialObj.colorstoneObj?.mtype || materialObj.miscObj?.mtype} onChange={(e)=> handleDynamicChange(e)} />
            </div>
          </div>}
          { (materialId === 2 || materialId === 3 || materialId === 4 || materialId === 5 || materialId === 7) && <div className="filter-item">
            <div>
              <label htmlFor="lot" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>LOT#</label>
              <input type="text"  id='lot' name='lot' autoComplete='off' value={materialObj.mountObj?.lot || materialObj.diamondObj?.lot || materialObj.colorstoneObj?.lot || materialObj.miscObj?.lot || materialObj.findingObj?.lot} onChange={(e)=> handleDynamicChange(e)} />
            </div>
          </div>}
          { (materialId === 5) && <div className="filter-item">
            <div>
              <label htmlFor="ftype" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>FTYPE</label>
              <input type="text"  id='ftype' name='fType' autoComplete='off' value={materialObj.findingObj?.fType} onChange={(e)=> handleDynamicChange(e)} 
              style={{border: materialObjError?.findingObj?.fType ? "1px solid red" : ""}}
               />
            </div>
          </div>}
          { (materialId === 5) && <div className="filter-item">
            <div>
              <label htmlFor="ascr" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>ACCESSORIES</label>
              <input type="text"  id='ascr' name='accessories' autoComplete='off' value={materialObj.findingObj?.accessories} onChange={(e)=> handleDynamicChange(e)}
              style={{border: materialObjError?.findingObj?.accessories ? "1px solid red" : ""}}
               />
            </div>
          </div>}
          { (materialId === 2) && <div className="filter-item">
            <div>
              <label htmlFor="ctg" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>CATEGORY</label>
              <input type="text"  id='ctg' name='category' autoComplete='off' value={materialObj.mountObj?.category} onChange={(e)=> handleDynamicChange(e)}
              style={{border:materialObjError?.mountObj?.category ? "1px solid red" : ""}}
               />
            </div>
          </div>}
          { (materialId === 3 || materialId === 4 || materialId === 7) && <div className="filter-item">
            <div>
              <label htmlFor="shape" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>SHAPE</label>
              <input type="text"  id='shape' name='shape' autoComplete='off' value={materialObj.diamondObj?.shape || materialObj.colorstoneObj?.shape || materialObj.miscObj?.shape} onChange={(e)=> handleDynamicChange(e)}
              style={{border : (materialObjError?.diamondObj?.shape || materialObjError?.colorstoneObj?.shape || materialObjError?.miscObj?.shape ) ? '1px solid red' : ''}}
               />
            </div>
          </div>}
          <div className="filter-item">
            <div>
              <label htmlFor="quality" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>QUALITY</label>
              <input type="text"  id='quality' name='quality' autoComplete='off' value={materialObj.metalObj?.quality || materialObj.mountObj?.quality || materialObj.diamondObj?.quality || materialObj.colorstoneObj?.quality || materialObj.miscObj?.quality || materialObj.findingObj?.quality || materialObj.alloyObj?.quality} onChange={(e)=> handleDynamicChange(e)}
              style={{border : (materialObjError?.diamondObj?.quality  || materialObjError?.colorstoneObj?.quality || materialObjError?.miscObj?.quality || materialObjError?.metalObj?.quality || materialObjError?.mountObj?.quality || materialObjError?.findingObj?.quality || materialObjError?.alloyObj?.quality ) ? '1px solid red' : ''}}
              />
            </div>
          </div>
          <div className="filter-item">
            <div>
              <label htmlFor="color" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>COLOR</label>
              <input type="text"  id='color' name='color' autoComplete='off' value={materialObj.metalObj?.color || materialObj.mountObj?.color || materialObj.diamondObj?.color || materialObj.colorstoneObj?.color || materialObj.miscObj?.color || materialObj.findingObj?.color || materialObj.alloyObj?.color} onChange={(e)=> handleDynamicChange(e)}
              style={{border : (materialObjError?.diamondObj?.color || materialObjError?.colorstoneObj?.color || materialObjError?.miscObj?.color || materialObjError?.metalObj?.color || materialObjError?.mountObj?.color || materialObjError?.findingObj?.color || materialObjError?.alloyObj?.color ) ? '1px solid red' : ''}}
              />
            </div>
          </div>
          { (materialId === 3 || materialId === 4 || materialId === 7) && <div className="filter-item">
            <div>
              <label htmlFor="size" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>SIZE</label>
              <input type="text"  id='size' name='size' autoComplete='off' value={materialObj.diamondObj?.size || materialObj.colorstoneObj?.size || materialObj.miscObj?.size} onChange={(e)=> handleDynamicChange(e)}
              style={{border : (materialObjError?.diamondObj?.size || materialObjError?.colorstoneObj?.size || materialObjError?.miscObj?.size) ? '1px solid red' : ''}}
              />
            </div>
          </div>}
          { (materialId === 2 || materialId === 3 || materialId === 4 || materialId === 5 || materialId === 7) &&  <div className="filter-item">
            <div>
              <label htmlFor="pcs" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>PCS</label>
              <input type="text"  id='pcs' name='pcs' autoComplete='off' value={materialObj.mountObj?.pcs || materialObj.diamondObj?.pcs || materialObj.colorstoneObj?.pcs || materialObj.miscObj?.pcs || materialObj.findingObj?.pcs} onChange={(e)=> handleDynamicChange(e)} />
            </div>
          </div>}
          <div className="filter-item">
            <div>
              <label htmlFor="wt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>WEIGHT</label>
              <input type="text"  id='wt' name='wt' autoComplete='off' value={materialObj.metalObj?.wt || materialObj.mountObj?.wt || materialObj.diamondObj?.wt || materialObj.colorstoneObj?.wt || materialObj.miscObj?.wt || materialObj.findingObj?.wt || materialObj.alloyObj?.wt} onChange={(e)=> handleDynamicChange(e)}
              style={{border: (materialObjError?.metalObj?.wt || materialObjError?.mountObj?.wt || materialObjError?.findingObj?.wt || materialObjError?.alloyObj?.wt) ? "1px solid red" : ""}}
               />
            </div>
          </div>
          { (mode === "material_purchase" && materialId === 2) && <div className="filter-item">
            <div>
              <label htmlFor="less" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>LESS</label>
              <input type="text"  id='less' name='less' autoComplete='off' value={ materialObj.mountObj?.less } onChange={(e)=> handleDynamicChange(e)}
              // style={{border: (materialObjError?.metalObj?.wt || materialObjError?.mountObj?.wt || materialObjError?.findingObj?.wt || materialObjError?.alloyObj?.wt) ? "1px solid red" : ""}}
               />
            </div>
          </div>}
          { ( materialId === 1 || materialId === 2 || materialId === 5 ) && <div className="filter-item">
            <div>
              <label htmlFor="tunch" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>TUNCH</label>
              <input type="text"  id='tunch' name='tunch' autoComplete='off' value={materialObj.metalObj?.tunch || materialObj.mountObj?.tunch || materialObj.findingObj?.tunch } onChange={(e)=> handleDynamicChange(e)}
              style={{border: (materialObjError?.metalObj?.tunch || materialObjError?.mountObj?.tunch || materialObjError?.findingObj?.tunch) ? "1px solid red" : ""}}
               />
            </div>
          </div>}
          { ( ( mode === "customer_receive" && materialId === 1) || ( mode === "customer_receive" && materialId === 2) || ( mode === "customer_receive" && materialId === 5) ) && <div className="filter-item">
            <div>
              <label htmlFor="acwt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>ACT. WT</label>
              <input type="text"  id='acwt' name='actualWeight' autoComplete='off' value={materialObj.metalObj?.actualWeight || materialObj.mountObj?.actualWeight || materialObj.findingObj?.actualWeight } onChange={(e)=> handleDynamicChange(e)} />
            </div>
          </div>}
          <div className="filter-item">
            <div>
              <label htmlFor="rate" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>RATE</label>
              <input type="text"  id='rate' name='rate' autoComplete='off' value={materialObj.metalObj?.rate || materialObj.mountObj?.rate || materialObj.diamondObj?.rate || materialObj.colorstoneObj?.rate || materialObj.miscObj?.rate || materialObj.findingObj?.rate || materialObj.alloyObj?.rate} onChange={(e)=> handleDynamicChange(e)} />
            </div>
          </div>
          {/* { ( (mode === "material_purchase" && materialId === 2) || (mode === "material_purchase" && materialId === 3) || (mode === "material_purchase" && materialId === 4) ) && <div className="filter-item d-flex justify-content-center align-items-center" style={{paddingTop:'20px'}}> */}
          { ( (mode === "material_purchase" && ([2,3,4,5,7]?.includes(materialId))) ) && <div className="filter-item d-flex justify-content-center align-items-center" style={{paddingTop:'20px'}}>
            <div>
              <input type="checkbox" style={{width:'20px'}} id='onpcsrate' name='onpcsrate' autoComplete='off' 
              // value={ materialObj.mountObj?.onpcsrate || materialObj.diamondObj?.onpcsrate || materialObj.colorstoneObj?.onpcsrate || materialObj.miscObj?.onpcsrate || materialObj.findingObj?.onpcsrate } 
              checked={ materialObj.mountObj?.onpcsrate || materialObj.diamondObj?.onpcsrate || materialObj.colorstoneObj?.onpcsrate || materialObj.miscObj?.onpcsrate || materialObj.findingObj?.onpcsrate } 
              // checked={ materialObj.mountObj?.onpcsrate || materialObj.diamondObj?.onpcsrate || materialObj.colorstoneObj?.onpcsrate || materialObj.miscObj?.onpcsrate || materialObj.findingObj?.onpcsrate } 
              onChange={(e)=> handleDynamicChange(e)} />
              <label htmlFor="onpcsrate" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>On Pcs</label>
            </div>
          </div>}

          { ( mode === "material_purchase" && (materialId === 2 || materialId === 5) ) && <div className="filter-item">
            <div>
              <label htmlFor="labour" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>LABOUR</label>
              <input type="text"  id='labour' name='labour' autoComplete='off' value={materialObj.metalObj?.labour || materialObj.mountObj?.labour || materialObj.diamondObj?.labour || materialObj.colorstoneObj?.labour || materialObj.miscObj?.labour || materialObj.findingObj?.labour || materialObj.alloyObj?.labour} onChange={(e)=> handleDynamicChange(e)} 
              />
            </div>
          </div>}
          { ( mode === "material_purchase" && materialId === 2 || materialId === 5 ) && <div className="filter-item">
            <div>
              <label htmlFor="wastage" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>WASTAGE</label>
              <input type="text"  id='wastage' name='wastage' autoComplete='off' value={materialObj.metalObj?.wastage || materialObj.mountObj?.wastage || materialObj.diamondObj?.wastage || materialObj.colorstoneObj?.wastage || materialObj.miscObj?.wastage || materialObj.findingObj?.wastage || materialObj.alloyObj?.wastage} onChange={(e)=> handleDynamicChange(e)} 
              />
            </div>
          </div>}
          { ( (mode === "material_purchase" && (materialId === 2 || materialId === 5)) ) && <div className="filter-item d-flex justify-content-center align-items-center" style={{paddingTop:'20px'}}>
            <div>
              <input type="checkbox" style={{width:'20px'}} id='onpcslbws' name='onpcslbws' autoComplete='off' 
              // value={ materialObj.mountObj?.onpcslbws || materialObj.diamondObj?.onpcslbws || materialObj.colorstoneObj?.onpcslbws || materialObj.miscObj?.onpcslbws || materialObj.findingObj?.onpcslbws } 
              checked={ materialObj.mountObj?.onpcslbws || materialObj.diamondObj?.onpcslbws || materialObj.colorstoneObj?.onpcslbws || materialObj.miscObj?.onpcslbws || materialObj.findingObj?.onpcslbws } 
              onChange={(e)=> handleDynamicChange(e)} />
              <label htmlFor="onpcslbws" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>On Pcs</label>
            </div>
          </div>}
          { ( mode === "material_purchase" && materialId === 2 ) && <div className="filter-item">
            <div>
              <label htmlFor="amount" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>AMOUNT</label>
              <input type="text"  id='amount' name='amount' autoComplete='off' value={materialObj.metalObj?.amount || materialObj.mountObj?.amount || materialObj.diamondObj?.amount || materialObj.colorstoneObj?.amount || materialObj.miscObj?.amount || materialObj.findingObj?.amount || materialObj.alloyObj?.amount} onChange={(e)=> handleDynamicChange(e)} 
              />
            </div>
          </div>}
          <div className="filter-item">
            <div>
              <label htmlFor="locker" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>LOCKER</label>
              <input type="text"  id='locker' name='locker' autoComplete='off' value={materialObj.metalObj?.locker || materialObj.mountObj?.locker || materialObj.diamondObj?.locker || materialObj.colorstoneObj?.locker || materialObj.miscObj?.locker || materialObj.findingObj?.locker || materialObj.alloyObj?.locker} onChange={(e)=> handleDynamicChange(e)} 
              />
            </div>
          </div>
          <div className="filter-item">
            <div>
              <label htmlFor="desc" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>DESCRIPTION</label>
              <input type="text"  id='desc' name='description' autoComplete='off' value={materialObj.metalObj?.description || materialObj.mountObj?.description || materialObj.diamondObj?.description || materialObj.colorstoneObj?.description || materialObj.miscObj?.description || materialObj.findingObj?.description || materialObj.alloyObj?.description} onChange={(e)=> handleDynamicChange(e)} />
            </div>
          </div>
          <div style={{paddingTop:'20px'}}>
            <div>
            <Button sx={{minWidth:'max-content'}}                   
                  onClick={() => handleAddInList()}
                  // onKeyDown={(e) => handleEnterKeyDown(e)}
                  >
              <Tooltip title="Add Material">
                <AddCircleIcon                            
                  style={{ cursor: "pointer", color:theme?.palette?.customColors?.purple }}

                />
              </Tooltip>
              </Button>
              <Button sx={{minWidth:'max-content'}}  
                onClick={() => <> {setMaterialValue('')}{
                  setMaterialObj({
                    metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '', labour:'', wastage:'', },
                    mountObj: { id:'', customer:'', material: '', metal:"", mtype: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', less:'', tunch: '', actualWeight: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', amount:'', labouramt:"", locker: '', description: '' },
                    diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', onpcsrate:"", locker: '', description: '', amount:"", labour:'', wastage:'', },
                    findingObj: { id:'', customer:'', metal:"", material: '', mtype: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', rate: '', onpcsrate:'', labour:'', wastage:'', onpcslbws:'', labouramt:"", locker: '', amount:"", description: '' },
                    alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '', amount:"", labour:'', wastage:'', }
                  // metalObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                  // mountObj: { id:'', customer:'', material: '', metal: '', lot: '', category: '', quality: '', color: '', wt: '', pcs: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                  // diamondObj: { id:'', customer:'', material: '', mtype: '', lot: '',  shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
                  // colorstoneObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
                  // miscObj: { id:'', customer:'', material: '', mtype: '', lot: '', shape: '', quality: '', color: '', size: '', pcs: '', wt: '', rate: '', locker: '', description: '' },
                  // findingObj: { id:'', customer:'', material: '', metal: '', lot: '', fType: '', accessories: '', quality: '', color: '', size: '', pcs: '', wt: '', tunch: '', actualWeight: '', rate: '', locker: '', description: '' },
                  // alloyObj: { id:'', customer:'', material: '', metal: '', quality: '', color: '', wt: '', rate: '', locker: '', description: '' }
                })} </>} 
              >
              <Tooltip title="Reset">
                <RefreshIcon
                  style={{ cursor: "pointer", color:theme?.palette?.customColors?.purple }}
                /> 
              </Tooltip>
            </Button>
            </div>
          </div>
        </div>
        <div className='my-5'><Typography variant='h5' className='fs_fgp text_color'>MATERIAL DETAILS</Typography></div>
        <div style={{maxWidth:`${mode === "customer_receive" ? "1550px" : "1770px"}`, paddingBottom:'3rem'}}>
          <TableContainer component={Paper} 
            sx={{
              maxHeight: 440,
              overflow: 'auto', // Enable scrolling for both directions
              '&::-webkit-scrollbar': {
                height: '6px', // Reduce the scrollbar height for horizontal scrolling
                width: '6px', // Adjust scrollbar width for vertical scrolling
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.3)', // Adjust scrollbar thumb color
                borderRadius: '4px', // Rounded corners for the scrollbar thumb
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0.1)', // Adjust scrollbar track color
                borderRadius: '4px', // Rounded corners for the scrollbar track
              },
              boxShadow: 'none',
              border: '1px solid #e8e8e8',
            }}
            >
            <Table stickyHeader aria-label='sticky table' sx={{boxShadow:'none'}}>
              <TableHead>
                <TableRow>
                  {columns?.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }} style={{backgroundColor:'#F6F6F7'}} className='fs_fgp'>
                      <Typography sx={{fontSize:'14px', color:'grey'}} variant='body1'>{column?.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[...diamondList, ...colorstoneList, ...miscList, ...findingList, ...metalList, ...mountList, ...alloyList]?.sort((a, b) => a?.material?.toLowerCase()?.localeCompare(b?.material?.toLowerCase()))?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, i) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row?.id}>
                      {columns?.map(column => {
                        const value = row[column?.id];
                        
                        return (
                          <>
                          <TableCell key={column?.id} align={column?.align} className='fs_fgp'>
                            <Typography sx={{fontSize:'14px'}}>
                              {/* {column?.format && typeof value === 'number' ? column?.format(value) : ( value)} */}
                              {/* {column?.id === 'material' ? (
                                  row.material === 'FINDING' ? (
                                      `F: ${row.fType} and ${row.accessories}`
                                  ) : row.material === 'MOUNT' ? (
                                      `M: ${row.category}` // Assuming categoryName is the field for mount material
                                  ) : (
                                      value
                                  )
                              ) : (
                                  column?.format && typeof value === 'number' ? column?.format(value) : value
                              )} */}
                                  {column?.id === 'material' ? (
                                        row.material === 'FINDING' ? (
                                            `F: ${row.fType} and ${row.accessories}`
                                        ) : row.material === 'MOUNT' ? (
                                            `M: ${row.category}` // Assuming category is the field for mount material
                                        ) : (
                                            value
                                        )
                                      ):
                                   column?.id === 'srno' ? (
                                        i + 1
                                    ) : column?.id === 'type' ? (
                                        // Handling Type column logic
                                        (row.material === 'FINDING' || row?.material === "METAL" || row?.material === "ALLOY") ?  (
                                            `${row.metal}` // Show Finding Metal for material = 'FINDING'
                                        ) : (row.material === 'MISC' || row.material === 'COLORSTONE' || row.material === 'DIAMOND' ) ? (
                                            `${row.shape}` // For MISC material, show the shape (as example)
                                        ) : (
                                            value // For all other materials, show the regular type value
                                        )
                                    ) : (
                                        column?.format && typeof value === 'number' ? column?.format(value) : value
                                    )}
                              </Typography>
                              {column?.id === 'action' && (
                                  <IconButton size='small'>
                                    <Trash color={trashColor} onMouseEnter={() => setTrashColor(`${theme?.palette?.customColors?.purple}`)} onMouseLeave={() => setTrashColor('grey')} onClick={() => handleRemove(row)} />
                                  </IconButton>
                              )}
                          </TableCell>
                          </>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component='div'
              count={[...diamondList, ...colorstoneList, ...miscList, ...findingList, ...metalList, ...mountList, ...alloyList]?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className='jobgrid_fgp fs_fgp'
            />
            <div className='d-flex justify-content-end align-items-center'>
              <Button variant='contained' className='fs_fgp' size='small' 
                sx={{bgcolor:theme?.palette?.customColors?.purple}}
                onClick={() => handleSave()}
              >FINAL SAVE</Button>
            </div>
        </div>
        </>}
    </div>
  )
}
export default NewCustomerReceive