
import React, { useEffect, useRef, useState } from 'react';
import './homepage.css';

import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import PercentIcon from '@mui/icons-material/Percent';
import PaymentIcon from '@mui/icons-material/Payment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Tooltip,  Modal, Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl, Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CustomizeJob from '../CustomizeJob/CustomizeJob';
import { handleCustomizeJobFlag, handleSave, handleSaveAndNextFlag, handleSelectedButton } from '../../redux/slices/HomeSlice';
import EditIcon from '@mui/icons-material/Edit';
import { BooksData, CurrencyData, CustomerData, LockerData } from './dummyData';
import CustomizeAll from '../CustomizeAll/CustomizeAll';
import AddJob from '../AddJob/AddJob';
import RateCut from '../RateCut/RateCut';
import Pay from '../Payment/Pay';
import Save from '../Save/Save';
import Print from '../Print/Print';
import Summary from '../Summary/Summary';
import { FaGoodreadsG } from "react-icons/fa";
import { handleModeChange } from '../../redux/slices/FgpSlice';
import DatePicker from 'react-datepicker';
import CustomInput from '../pickers/PickersComponent';
import "react-datepicker/dist/react-datepicker.css";
import ".././pickers/reactcustomdatepicker.css"
import AltJobs from '../AlterationReceive/AltJobs/AltJobs';
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { capitalizeWords } from '../../master/global';
import NewCustomerReceive from '../customerReceive/NewCustomerReceive';

// ** Third Party Imports
// import DatePicker from 'react-datepicker'

// import OldGold from '../OldGold/OldGold';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
  outline:'none'
};

const HomePage = ({ toggleSidebar, isSidebarOpen }) => {

  const userListRef = useRef(null); 

  const theme = useTheme();

  const [selectOrder, setSelectorder] = useState('neworder');
  const selectedButton = useSelector((state) => (state?.home?.selectButtonValue));
  const savedValue = useSelector((state) => (state?.home?.homefilterObject));
  
  const [selectedButtonFlag, setSelectedButtonFlag] = useState(true);

  const [user, setUser] = useState('abcd');
  const [refno, setRefno] = useState('');
  
  const [currency, setCurrency] = useState('');
  const [currencyExchRate, setCurrencyExchrate] = useState('');
  const [locker, setLocker] = useState('');
  const [counter, setCounter] = useState('');



  const isSaveAndNext = useSelector(state => state?.home?.isSaveAndNext); 
  const customizeJob = useSelector(state => state?.home?.isJobCustomize); 
  const dispatch = useDispatch();

  const [SaveFiltersFlag, setSaveFiltersFlag]  = useState(true);
  const [updateFiltersFlag, setUpdateFiltersFlag]  = useState(true);

  //customer states
  const [customerData, setCustomerData] = useState([]);
  const [filterCustomerData, setFilterCustomerData] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState('abcd');
  const [searchCustomerFlag, setSearchCustomerFlag] = useState(false);
  const [selectCustomer, setSelectCustomer] = useState('');
  const [searchCustomerId, setSearchCustomerId] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [customerValidationError, setCustomerValidationError] = useState(false);

  //books states
  const [bookNameData, setBookNameData] = useState([]);
  const [selectBookName, setSelectBookName] = useState('');
  const [bookNamevalidationError, setBookNamevalidationError] = useState(false);

  //locker states
  const [lockerData, setLockerData] = useState([]);
  const [selectLockerName, setSelectLockerName] = useState('');
  const [lockervalidationError, setLockervalidationError] = useState(false);

  //currency states
  const [currecyData, setCurrencyData] = useState([]);
  const [selectCurrency, setSelectCurrency] = useState('');
  const [currencyValidationError, setCurrencyValidationError] = useState(false);

  //more details
  const [selectedmoreDetails, setSelectedMoreDetails] = useState([]);
  const [selectedmoreDetailsValidationError, setSelectedMoreDetailsValidationError] = useState([]);


  const [dateUpdateFlag, setDateUpdateFlag] = useState(false);
  const [currExchRateFlag, setCurrExchRateFlag] = useState(false);

  const [printListModal, setPrintListModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

    //alteration issue
    const [date, setDate] = useState(new Date());
    const [voucherType, setVoucherType] = useState('');


    const [validationErrors, setValidationErrors] = useState({
      // user: false,
      searchUser: false,
      // refno: false,
      bookName: false,
      currency: false,
      locker: false,
      // counter: false,
      voucherType:false,
      // moreDetails:false
    });
    const [filtersValue, setFiltersValue] = useState({
      // user: '',
      searchUser: '',
      refno: '',
      bookName: '',
      currency: '',
      locker: '',
      counter: '',
      voucherType:''
      // moreDetails:''
    });
  

  const handleOrderSelection = (e) => {
    setSelectorder(e.target.value);
  };
  

    // filters
    const handleUserChange = (e) => {
      const value = e.target.value;
      setUser(value);
        setValidationErrors((prev) => ({ ...prev, user: !value?.toString()?.trim() }));
    }
    const handleRefNoChange = (e) => {
      const value = e.target.value;
      setRefno(value);
        // setValidationErrors((prev) => ({ ...prev, refno: !value?.toString()?.trim() }));
    }



    const handleCounter = (e) => {
      const value = e.target.value;
      setCounter(value);
        // setValidationErrors((prev) => ({ ...prev, counter: !value?.toString()?.trim() }));
    }


    // // save and update logic
    // const handleSaveFilters = () => {
    //   const errors = {
    //     // user: !searchCustomer?.toString()?.trim(),
    //     searchUser: !searchUser?.toString()?.trim(),
    //     // refno: !refno?.toString()?.trim(),
    //     bookName: !selectBookName?.toString()?.trim(),
    //     currency: !selectCurrency?.toString()?.trim(),
    //     locker: !selectLockerName?.toString()?.trim(),
    //     // counter: !counter?.toString()?.trim(),
    //     // moreDetails:!selectedmoreDetails?.toString()?.trim()
    //   };
      
    //   setValidationErrors(errors);
  
    //   const hasErrors = Object?.values(errors)?.some((error) => error);
      
    //   if (!hasErrors) {
    //     let obj = {
    //       // user:searchCustomer,
    //       searchUser: searchUser,
    //       refno:refno,
    //       bookName:selectBookName,
    //       currency:selectCurrency,
    //       locker:selectLockerName,
    //       counter:counter,
    //       moreDetails:selectedmoreDetails,
    //       voucherType:voucherType
    //     }

    //     dispatch(handleSave(obj));
    //     setFiltersValue(obj);
    //     setSaveFiltersFlag(false);
    //     setUpdateFiltersFlag(false);
    //     if(modeComp === "alteration_receive"){
    //       dispatch(handleSelectedButton('altjobs'));
    //     }else{
    //       dispatch(handleSelectedButton('add'));
    //     }
    //     setSelectedButtonFlag(false);
    //     dispatch(handleCustomizeJobFlag(false));
    //     dispatch(handleSaveAndNextFlag(false))

    //   }
    // };

    // const handleUpdateFilters = () => {
    //   setUpdateFiltersFlag(true);

    //       setCurrency((+filtersValue?.currency));
    //       // setBookName((+filtersValue?.bookName));
    //       setCounter((+filtersValue?.counter));
    //       setLocker((+filtersValue?.locker));
        
    //       setRefno(refno);
    //       setUser(user);

    //       if(modeComp === "alteration_receive"){
    //         dispatch(handleSelectedButton('altjobs'));
    //       }else{
    //         dispatch(handleSelectedButton('add'));
    //       }
    //       setSelectedButtonFlag(false);
    //       // setTimeout(() => {setSelectorder('new order');},10);
    //       dispatch(handleCustomizeJobFlag(false));
    //       dispatch(handleSaveAndNextFlag(false))

      

    // }
  
    // const BookNameArr = [
    //   {
    //     id:1,
    //     name:'a-Book'
    //   },
    //   {
    //     id:2,
    //     name:'b-Book'
    //   },
    // ];
    const CurrencyArr = [
      {
        id:1,
        name:'INR'
      },
      {
        id:2,
        name:'USD'
      },
    ];
    const CounterArr = [
      {
        id:1,
        name:'counter-1'
      },
      {
        id:2,
        name:'counter-2'
      },
    ];
    // const LockerArr = [
    //   {
    //     id:1,
    //     name:'Head Office'
    //   },
    //   {
    //     id:2,
    //     name:'Mumbai'
    //   },
    // ];

    //dummyData set up
    
    useEffect(() => {

      //customer main data
      setCustomerData(CustomerData);
      setFilterCustomerData(CustomerData);

      // books data
      setBookNameData(BooksData);

      //locker data
      setLockerData(LockerData);

      //currency data
      setCurrencyData(CurrencyData);


    },[]);

    //customer typo logic
  // const handleSelectCustomer = (customer) => {
  //   console.log(customer);
  //   // setSearchCustomerId(customer?.id);

  //   // setSelectCustomer(customer?.TypoLabel);
  //   setSearchCustomer(customer?.TypoLabel);

  //   // setTimeout(() => {
  //     setFilterCustomerData([]); // Clear suggestions after selection
  //     // setSelectedIndex(-1);
  //   // },10);

  //   setCustomerValidationError(false);
    
  // };

  // const handleSearchCustomer = (val) => {
  //   console.log('val');
    
  //   let searchValue = val?.toLowerCase();
    
  //   setSearchCustomer(val);
  //   setCustomerValidationError(false);

  //   if (searchValue) {
  //     const filtered = customerData?.filter(customer =>
  //       customer?.TypoLabel?.toLowerCase()?.includes(searchValue?.toLowerCase())
  //     );
  //     setFilterCustomerData(filtered);
  //     if (filtered?.length === 1 && filtered[0]?.TypoLabel?.toLowerCase() === searchValue?.toLowerCase()) {
  //       setSearchCustomer(filtered[0]?.TypoLabel);
  //       setSearchCustomerId(filtered[0]?.id);
  //       // setFilterCustomerData([]); // Hide the dropdown
  //     }
  //   }

  //   else {
  //     setFilterCustomerData([]);
  //     setSelectCustomer('');
  //   }
  // }

  // const handleSelectBlur = () => {
  //   setTimeout(() => {
  //     setFilterCustomerData([]);
  //     setSelectedIndex(-1);
  //   }, 500);

  //   if (!searchCustomer) {
  //     setCustomerValidationError(true);
  //   } else {
  //     setCustomerValidationError(false);
  //   }

  //   // setInpAutoFocus(true);
  //   // setJobnoVal('');
  // }

  // const handleSearchCustomer = (e) => {
  //   setSearchCustomerFlag(true);
  //     let searchVal = e;
  //     setSearchCustomer(searchVal);
  //     if (searchVal) {
  //           const filtered = customerData?.filter(customer =>
  //             customer?.TypoLabel?.toLowerCase()?.includes(searchVal?.toLowerCase())
  //           );
  //           setFilterCustomerData(filtered);
  //           if (filtered?.length === 1 && filtered[0]?.TypoLabel?.toLowerCase() === searchVal?.toLowerCase()) {
  //             setSearchCustomer(filtered[0]?.TypoLabel);
  //             setSearchCustomerId(filtered[0]?.id);
  //             // setFilterCustomerData([]); // Hide the dropdown
  //             setSearchCustomerFlag(false);
  //           }
  //     }else{
  //       setSearchCustomer('');
  //       // setFilterCustomerData([]);
  //       setSearchCustomerFlag(false);
  //     }
  // }

  // const handleSelectCustomer = (e) => {
  //   console.log(e);
  //   console.log(e?.TypoLabel);
  //   setSearchCustomer(e?.TypoLabel);
  //   console.log(filterCustomerData);
  //   if(e?.TypoLabel){
  //     // setFilterCustomerData([]);
  //     setSearchCustomerFlag(false);
  //   }
    
  // }

  // const handleSelectBlur = () => {
  //   // Set timeout
  //   const timeoutId = setTimeout(() => {
  //     // setFilterCustomerData([]);
  //     setSelectedIndex(-1);
  //   }, 1000);

  //   // Check customer validation
  //   if (!searchCustomer) {
  //     // setCustomerValidationError(true);
  //     setCustomerValidationError(false);
  //   } else {
  //     setCustomerValidationError(false);
  //   }

  //   // Cleanup function for the timeout
  //   return () => clearTimeout(timeoutId);
  // };

  // const handleKeyDown = (e) => {
  //   if(selectedIndex < filterCustomerData?.length){

  //     if(e.key === 'ArrowUp' && selectedIndex > 0){
  //       setSelectedIndex(prev => prev - 1)
  //   }
  //   else if(e.key === 'ArrowDown' && selectedIndex < filterCustomerData?.length - 1){
  //     setSelectedIndex(prev => prev + 1)
  //   }
  //   else if(e.key?.toLowerCase() === 'enter' || e.key?.toLowerCase() === 'tab' && selectedIndex >= 0){
  //     setSearchCustomer(filterCustomerData[selectedIndex]?.TypoLabel);
  //     // setSearchCustomerId(filterCustomerData[selectedIndex]?.id);
  //     // setFilterCustomerData([]);
  //     setSearchCustomerFlag(false);

  //   }


  //       // Scroll the selected item into view
  //       setTimeout(() => {
  //         const element = document.querySelector(".search_sug_line.active");
  //         if (element) {
  //           element.scrollIntoView({
  //             behavior: 'smooth',
  //             block: 'nearest',
  //           });
  //         }
  //       }, 0);

  //       // setCustErrorMsg('');

  // }else{
  //   // setCustErrorMsg('');
  //   setSelectedIndex(-1);
  // }
  // // setInpAutoFocus(true);
  // }

  //books logic
  const handleBookName = (e) => {
    const value = e.target.value;
    setSelectBookName(value);
    // setBookNamevalidationError(false);
    setValidationErrors((prev) => ({ ...prev, bookName: !(value)?.toString()?.trim() }));
    // if(value === ''){
    //   setBookNamevalidationError(true);
    // }else{
    //   setBookNamevalidationError(false);
    // }
  }

  //locker logic
  const handleLocker = (e) => {
    const value = e.target.value;
    setSelectLockerName(value);
    setValidationErrors((prev) => ({ ...prev, locker: !(value)?.toString()?.trim() }));
      // if(value === ''){
      //   setLockervalidationError(true);
      // }else{
      //   setLockervalidationError(false);
      // }
  }

  //currency logic
  const handleCurrency = (e) => {
    const value = e.target.value;
    setSelectCurrency(value);
    setValidationErrors((prev) => ({ ...prev, currency: !(value)?.toString()?.trim() }));

    // if (value === '') {
    //     setCurrencyValidationError(true);
    // }else{
    //     setCurrencyValidationError(false);
    // }

  }

  //more details
  const handleMoreDetails = (e) => {
    setSelectedMoreDetails(e.target.value);
    setValidationErrors((prev) => ({ ...prev, moreDetails: !(e.target.value)?.toString()?.trim() }));
    if(e.target.value){
      setSelectedMoreDetailsValidationError(false);
    }else{
      setSelectedMoreDetailsValidationError(true);
    }
  } 
    

  const buttonActions = [
    { title: "Add", icon: <AddIcon />, value: "add" },
    { title: "Customize All", icon: <SettingsIcon />, value: "Customize All" },
    // { title: "Old Gold", icon: <FaGoodreadsG />, value: "Old Gold" },
    { title: "Rate Cut", icon: <PercentIcon />, value: "Rate Cut" },
    { title: "Pay", icon: <PaymentIcon />, value: "Pay" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    // { title: "Save", icon: <SaveIcon />, value: "Save" },
    { title: "Save", icon: <SaveIcon />, value: "" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];
  const buttonAltActionsReceive = [
    { title: "Add", icon: <AddIcon />, value: "altjobs" },
    // { title: "Customize All", icon: <SettingsIcon />, value: "Customize All" },
    // { title: "Old Gold", icon: <FaGoodreadsG />, value: "Old Gold" },
    // { title: "Rate Cut", icon: <PercentIcon />, value: "Rate Cut" },
    // { title: "Pay", icon: <PaymentIcon />, value: "Pay" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    // { title: "Save", icon: <SaveIcon />, value: "Save" },
    { title: "Save", icon: <SaveIcon />, value: "" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];
  const buttonAltActionsIssue = [
    { title: "Add", icon: <AddIcon />, value: "add" },
    // { title: "Customize All", icon: <SettingsIcon />, value: "Customize All" },
    // { title: "Old Gold", icon: <FaGoodreadsG />, value: "Old Gold" },
    // { title: "Rate Cut", icon: <PercentIcon />, value: "Rate Cut" },
    // { title: "Pay", icon: <PaymentIcon />, value: "Pay" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    // { title: "Save", icon: <SaveIcon />, value: "Save" },
    { title: "Save", icon: <SaveIcon />, value: "" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];
  const buttonCustReceiveActionsIssue = [
    { title: "Add", icon: <AddIcon />, value: "custReceive" },
    // { title: "Customize All", icon: <SettingsIcon />, value: "Customize All" },
    // { title: "Old Gold", icon: <FaGoodreadsG />, value: "Old Gold" },
    // { title: "Rate Cut", icon: <PercentIcon />, value: "Rate Cut" },
    // { title: "Pay", icon: <PaymentIcon />, value: "Pay" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    // { title: "Save", icon: <SaveIcon />, value: "Save" },
    { title: "Save", icon: <SaveIcon />, value: "" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];
  const buttonMatPurchaseActionsIssue = [
    { title: "Add", icon: <AddIcon />, value: "custReceive" },
    // { title: "Customize All", icon: <SettingsIcon />, value: "Customize All" },
    // { title: "Old Gold", icon: <FaGoodreadsG />, value: "Old Gold" },
    // { title: "Rate Cut", icon: <PercentIcon />, value: "Rate Cut" },
    // { title: "Pay", icon: <PaymentIcon />, value: "Pay" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    // { title: "Save", icon: <SaveIcon />, value: "Save" },
    { title: "Save", icon: <SaveIcon />, value: "" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];

  const handleButtonClick = (value) => {
    if(value === "Print"){
      setPrintListModal(true);
     return 
    }
    if(value){
      dispatch(handleSelectedButton(value));
      setSelectedButtonFlag(false);
      dispatch(handleCustomizeJobFlag(false));
      dispatch(handleSaveAndNextFlag(false));
    }
  };


  const moreDetails = [
    {
      id:1,
      name:'Stock Purchase'
    },
    {
      id:2,
      name:'Labour Purchase'
    },
    {
      id:3,
      name:'Old Metal'
    }
  ]

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
      
      setValidationErrors((prev) => ({ ...prev, searchUser: !(value)?.toString()?.trim() }));
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
  // const scrollToSelectedItem = (index) => {
  //   const selectedItem = userListRef.current?.children[index];
  //   if (selectedItem) {
  //     selectedItem.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //     });
  //   }
  // }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setPrintListModal(false);
  };

  const [modeComp, setModeComp] = useState('');
  const mode = useSelector((state) => state?.fgp?.mode);
  
  const handleModeChangeComp = (e) => {
      let val = e.target.value;
      if(val){
        setModeComp(e.target.value);
        
      }
  }

  useEffect(() => {
      dispatch(handleModeChange(modeComp));
  },[modeComp]);




  const voucherTypeData = [
    {
      id:1,
      name:'Repairing'
    },
    {
      id:2,
      name:'Mounting'
    },
    {
      id:3,
      name:'Polishing'
    }
  ]
  const handleVoucherType = (e) => {
    const value = e.target.value;
    setVoucherType(e.target.value);
    setValidationErrors((prev) => ({ ...prev, voucherType: !(value)?.toString()?.trim() }));
  }


  const handleSaveFilters = () => {
    // Validate if required fields are empty or not
    if (modeComp !== "alteration_issue" && modeComp !== "alteration_receive") {
      setValidationErrors({
        searchUser: !searchUser.trim(),
        bookName: !selectBookName.trim(),
        currency: !selectCurrency.trim(),
        locker: !selectLockerName.trim(),
        voucherType: false, // Not required for this mode
      });
    } else {
      setValidationErrors({
        searchUser: !searchUser.trim(),
        bookName: !selectBookName.trim(),
        currency: !selectCurrency.trim(),
        locker: !selectLockerName.trim(),
        voucherType: !voucherType.trim(), // Required for this mode
      });
    }
  
    // Create the object with field values
    const obj = {
      searchUser: searchUser,
      refno: refno,
      bookName: selectBookName,
      currency: selectCurrency,
      locker: selectLockerName,
      counter: counter,
      voucherType: voucherType,
      date: date,
      modeType: modeComp,
    };
  
    // // Check if any required field is empty
    // const isObjEmpty = Object.keys(obj).some(key => {
    //   // Exclude 'voucherType' if the mode is not 'alteration_issue' or 'alteration_receive'
    //   if ((modeComp !== "alteration_issue" && modeComp !== "alteration_receive") && key === "voucherType") {
    //     return false; // Don't check voucherType if not required
    //   }
  
    //   // Exclude 'refno' and 'counter' from the check
    //   if (key === "refno" || key === "counter") {
    //     return false; // Skip these fields in the emptiness check
    //   }
  
    //   return obj[key] === ''; // Return true if any value is an empty string
    // });

    const isObjEmpty = Object.keys(obj).some(key => {
      // Exclude 'voucherType' from check if not in alteration_issue or alteration_receive
      if ((modeComp !== "alteration_issue" && modeComp !== "alteration_receive") && key === "voucherType") {
        return false; // Skip voucherType if not required
      }
  
      // If mode is 'alteration_receive', only check relevant fields
      if (modeComp === "alteration_receive" && !["searchUser", "voucherType", "date", "bookName", "currency", "refno"].includes(key)) {
        return false; // Skip other fields
      }
  
      // Exclude 'refno' and 'counter' from the check as per your logic
      if (key === "refno" || key === "counter") {
        return false; // Skip these fields in the emptiness check
      }
  
      return obj[key] === ''; // Check if the value is empty
    });
  
  
    // If any required field is empty, don't proceed
    if (isObjEmpty) {
      console.log(isObjEmpty); // This will be true if there's any empty required field
      return; // Prevent further actions
    } else {
      dispatch(handleSave(obj));
      setFiltersValue(obj);
      setSaveFiltersFlag(false);
      setUpdateFiltersFlag(false);
  
      if (modeComp === "alteration_receive") {
        dispatch(handleSelectedButton('altjobs'));
      } else if (modeComp === "customer_receive" || modeComp === "material_purchase") {
        dispatch(handleSelectedButton('custReceive'));
      } else {
        dispatch(handleSelectedButton('add'));
      }
  
      setSelectedButtonFlag(false);
      dispatch(handleCustomizeJobFlag(false));
      dispatch(handleSaveAndNextFlag(false));
    }
  };
  
  const handleUpdateFilters = () => {
  }
  
  

  return (
    <div className="homepage_container pt-0">
      {/* <div className='mb-3'>
        <button 
          className="toggle_btn_hp mb-2"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <Tooltip title="Close User Details"><ArrowBackIcon /></Tooltip> : <Tooltip title="Open User Details"><ArrowForwardIcon  /></Tooltip>}
          {isSidebarOpen ? <Tooltip title="Close User Details">Hide Details</Tooltip> : <Tooltip title="Open User Details">Show Details</Tooltip>}
          {isSidebarOpen ? <Tooltip title="Close User Details">
            <FaAnglesLeft color={theme?.palette?.customColors?.purple} onClick={toggleSidebar} cursor='pointer' /></Tooltip>
               : 
            <Tooltip title="Open User Details"><FaAnglesRight color={theme?.palette?.customColors?.purple} onClick={toggleSidebar} cursor='pointer' /></Tooltip>}
        </button>
      </div> */}


      {/* Extra Filters */}
      { (SaveFiltersFlag || updateFiltersFlag) && <div className='d-flex justify-content-start align-items-center mb-4 pt-1'>
        <div className='pe-4'>
          {isSidebarOpen ? <Tooltip title="Close User Details">
            <FaAnglesLeft color={theme?.palette?.customColors?.purple} onClick={toggleSidebar} cursor='pointer' /></Tooltip>
               : 
            <Tooltip title="Open User Details"><FaAnglesRight color={theme?.palette?.customColors?.purple} onClick={toggleSidebar} cursor='pointer' /></Tooltip>}
        </div>
        <div className="filters-container_hm">
          <div className='filter-item_hp'>
            <select name="mode" id="mode"  value={modeComp} onChange={(e) => handleModeChangeComp(e)} className='fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Select Mode</option>
              <option value="material_purchase">Material Purchase</option>
              <option value="customer_receive">Customer Receive</option>
              <option value="stock_purchase">Stock Purchase</option>
              <option value="alteration_issue">Alteration Issue</option>
              <option value="alteration_receive">Alteration Receive</option>
            </select>
          </div>
          <div className="filter-item_hp userBox_hm" >
              <input type="text" placeholder="user" autoFocus value={searchUser} onBlur={() => handleUserBlur()} className='fs_fgp' onChange={(el) => handleUserTypo(el)} onKeyDown={handleKeyDown} 
                style={{ border: validationErrors?.searchUser ? '1px solid red' : '1px solid #ccc' }}
              />
              {
                showUserListFlag && <>
                <div className='userSuggestionList_hm fs_fgp'>
                  <ul ref={userListRef}>
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
          { (modeComp !== "alteration_receive" && modeComp !== "customer_receive" && modeComp !== "material_purchase") && <>
            <div className="filter-item_hp" >
            <select name="bookname" id="bookname"  value={selectBookName} className='fs_fgp fs_fgp_select' onChange={(el) => handleBookName(el)} style={{ border: validationErrors?.bookName ? '1px solid red' : '1px solid #ccc' }} >
              <option value="" disabled selected>Select BookName</option>
              {
                bookNameData?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.BookName)}</option>
                })
              }
            </select>
          </div>
          <div className="filter-item_hp">
            <input type="text" placeholder="reference No." className='fs_fgp ' value={refno} onChange={(el) => handleRefNoChange(el)}
              style={{ border: validationErrors.refno ? '1px solid red' : '1px solid #ccc' }}
             />
          </div> 
          <div className="filter-item_hp" >
            <select name="currency" id="currency" className='fs_fgp fs_fgp_select' value={selectCurrency} onChange={(el) => handleCurrency(el)}  style={{ border: validationErrors?.currency ? '1px solid red' : '1px solid #ccc' }}>
              <option value="" disabled selected>Select Currency</option>
              {
                currecyData?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.Currencycode)}</option>
                })
              }
            </select>
          </div>
          <div className="filter-item_hp" >
            <select name="locker" id="locker" className='fs_fgp fs_fgp_select' value={selectLockerName} onChange={(el) => handleLocker(el)} style={{ border: validationErrors.locker ? '1px solid red' : '1px solid #ccc' }}>
              <option value="" disabled selected>Select Locker</option>
              {
                lockerData?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.Lockername)}</option>
                })
              }
            </select>
          </div>
          <div className="filter-item_hp" >
            <select name="counter" id="counter" className='fs_fgp fs_fgp_select' value={counter} onChange={(el) => handleCounter(el)} style={{ border: validationErrors.counter ? '1px solid red' : '1px solid #ccc' }}>
            <option value="" disabled selected>Select Counter</option>
              {
                CounterArr?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.name)}</option>
                })
              }
            </select>
          </div>
          { modeComp === "alteration_issue" && <div className="filter-item_hp" >
              <select name="voucher" id="voucher" className='fs_fgp fs_fgp_select' value={voucherType} onChange={(el) => handleVoucherType(el)} style={{ border: validationErrors.voucherType ? '1px solid red' : '1px solid #ccc' }}>
                <option value="" disabled selected>Voucher Type</option>
                {
                  voucherTypeData?.map((e, i) => {
                    return <option value={e?.id} key={i}>{capitalizeWords(e?.name)}</option>
                  })
                }
              </select>
            </div>}
          </>
          }
          {
            modeComp === "alteration_receive" && <>
            <div className="filter-item_hp" >
              <select name="bookname" id="bookname" className='fs_fgp fs_fgp_select' value={selectBookName} onChange={(el) => handleBookName(el)} style={{ border: validationErrors.bookName ? '1px solid red' : '1px solid #ccc' }}>
                <option value="" disabled selected>Select BookName</option>
                {
                  bookNameData?.map((e, i) => {
                    return <option value={e?.id} key={i}>{capitalizeWords(e?.BookName)}</option>
                  })
                }
              </select>
            </div>
            <div className="filter-item_hp" >
              <select name="voucher" id="voucher" value={voucherType} className='fs_fgp fs_fgp_select' onChange={(el) => handleVoucherType(el)} style={{ border: validationErrors.voucherType ? '1px solid red' : '1px solid #ccc' }}>
                <option value="" disabled selected>Voucher Type</option>
                {
                  voucherTypeData?.map((e, i) => {
                    return <option value={e?.id} key={i}>{capitalizeWords(e?.name)}</option>
                  })
                }
              </select>
            </div>
            <div className="filter-item_hp">
            <input type="text" placeholder="reference No." value={refno} className='fs_fgp ' onChange={(el) => handleRefNoChange(el)}
              style={{ border: validationErrors.refno ? '1px solid red' : '1px solid #ccc' }}
             />
          </div> 
          <div className="filter-item_hp" >
            <select name="currency" id="currency" value={selectCurrency} className='fs_fgp fs_fgp_select' onChange={(el) => handleCurrency(el)}  style={{ border: validationErrors?.currency ? '1px solid red' : '1px solid #ccc' }}>
              <option value="" disabled selected>select Currency</option>
              {
                currecyData?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.Currencycode)}</option>
                })
              }
            </select>
          </div>
            {/* <div className="filter-item_hp fs_fgp" > */}
            <div className="datePicker_hp fs_fgp" >
              <DatePicker
                selected={date}
                id='basic-input'
                // popperPlacement={popperPlacement}
                // popperPlacement="bottom-end"
                onChange={date => setDate(date)}
                placeholderText='Click to select a date'
                customInput={<CustomInput className='rounded' style={{border:'1px solid rgb(204, 204, 204)'}}  />}
                className='fs_fgp'
              />
            </div>
            
            </>
          }
          {
            (modeComp === "customer_receive" || modeComp === "material_purchase") && <>
                  <div className="filter-item_hp" >
            <select name="bookname" id="bookname"  value={selectBookName} className='fs_fgp fs_fgp_select' onChange={(el) => handleBookName(el)} style={{ border: validationErrors?.bookName ? '1px solid red' : '1px solid #ccc' }} >
              <option value="" disabled selected>Select BookName</option>
              {
                bookNameData?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.BookName)}</option>
                })
              }
            </select>
          </div>
          <div className="filter-item_hp">
            <input type="text" placeholder="reference No." className='fs_fgp ' value={refno} onChange={(el) => handleRefNoChange(el)}
              style={{ border: validationErrors.refno ? '1px solid red' : '1px solid #ccc' }}
             />
          </div> 
          <div className="filter-item_hp" >
            <select name="currency" id="currency" className='fs_fgp fs_fgp_select' value={selectCurrency} onChange={(el) => handleCurrency(el)}  style={{ border: validationErrors?.currency ? '1px solid red' : '1px solid #ccc' }}>
              <option value="" disabled selected>Select Currency</option>
              {
                currecyData?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.Currencycode)}</option>
                })
              }
            </select>
          </div>
          <div className="filter-item_hp" >
            <select name="locker" id="locker" className='fs_fgp fs_fgp_select' value={selectLockerName} onChange={(el) => handleLocker(el)} style={{ border: validationErrors.locker ? '1px solid red' : '1px solid #ccc' }}>
              <option value="" disabled selected>Select Locker</option>
              {
                lockerData?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.Lockername)}</option>
                })
              }
            </select>
          </div>
          <div className="filter-item_hp" >
            <select name="counter" id="counter" className='fs_fgp fs_fgp_select' value={counter} onChange={(el) => handleCounter(el)} style={{ border: validationErrors.counter ? '1px solid red' : '1px solid #ccc' }}>
            <option value="" disabled selected>Select Counter</option>
              {
                CounterArr?.map((e, i) => {
                  return <option value={e?.id} key={i}>{capitalizeWords(e?.name)}</option>
                })
              }
            </select>
          </div>

            </>
          }
          {/* <div className="filter-item_hp" >
            <select name="moredetails" id="moredetails" value={selectedmoreDetails} onChange={(el) => handleMoreDetails(el)} style={{ border: validationErrors.moreDetails ? '1px solid red' : '1px solid #ccc' }}>
            <option value="" disabled selected>More Details</option>
              {
                moreDetails?.map((e, i) => {
                  return <option value={e?.id} key={i}>{e?.name}</option>
                })
              }
            </select>
          </div> */}
          
        </div>
        <div style={{minWidth:'150px', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}}>
          {/* <button className='btn btn-success' title='Save' onClick={() => handleSaveFilters()}>Procced To Bill</button> */}
          {/* <Button variant='contained' title='Save' size='small' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} className='fs_fgp' onClick={() => handleSaveFilters()}>Procced To Bill</Button> */}
          <Button variant='contained' title='Save' size='small' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} className='fs_fgp' onClick={() => handleSaveFilters()}>Procced</Button>
        </div>
      </div>}
              

      
        { !SaveFiltersFlag && <>

      {/* Customer Line */}
      { !updateFiltersFlag && <div className="customer-info fs_fgp mb-0 pt-0 pb-1">
        <div>
        {isSidebarOpen ? <Tooltip title="Close User Details">
            <FaAnglesLeft color={theme?.palette?.customColors?.purple} onClick={toggleSidebar} cursor='pointer' /></Tooltip>
               : 
            <Tooltip title="Open User Details"><FaAnglesRight color={theme?.palette?.customColors?.purple} onClick={toggleSidebar} cursor='pointer' /></Tooltip>}
        </div>
        <div><span className='text_color'>User: </span> <b className="text-dark">{savedValue?.searchUser}</b></div>
        {/* <div>GST No: <b className="text-primary">GST7896541233</b></div>
        <div>PAN No: <b className="text-primary">AU125479836321</b></div> */}
        {/* <div>Aadhar No: <b className="text-primary">-</b></div> */}
        <div><span className='text_color'>Date: </span> 
          { !dateUpdateFlag && <b className="text-dark" style={{cursor:'pointer', textDecoration:'underline'}} onClick={() => setDateUpdateFlag(true)}>11 Oct 2024</b>}
          { dateUpdateFlag && <Modal
                                  open={dateUpdateFlag}
                                  aria-labelledby="parent-modal-title"
                                  aria-describedby="parent-modal-description"
                                  onClose={() => setDateUpdateFlag(false)}
                                >
                                  <Box 
                                  sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    border:'none',
                                    pt: 2,
                                    px: 4,
                                    pb: 3,
                                    borderRadius:'8px',
                                    outline:'none'
                                  }}
                                  className="boxShadow_hp"
                                  >
                                    <h4 className='text-center fs_fgp' style={{color:theme?.palette?.customColors?.purple}}>Update Date</h4>
                                    <div className='d-flex justify-content-center align-items-center pt-2'>
                                      {/* <input type="date" className='fs_fgp' /> */}
                                      <div style={{border:'1px solid #ccc'}}>
                                          <DatePicker
                                            selected={date}
                                            id='basic-input'
                                            // popperPlacement={popperPlacement}
                                            onChange={date => setDate(date)}
                                            placeholderText='Click to select a date'
                                            customInput={<CustomInput  />}
                                          />
                                        </div>
                                      {/* <button className='btn btn-warning py-1 mx-1' onClick={() => setDateUpdateFlag(false)}>Update</button> */}
                                      <Button variant='contained' size='small' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} className='fs_fgp ms-1' onClick={() => setDateUpdateFlag(false)}>Update</Button>
                                    </div>
                                  </Box>
                                </Modal> }
        </div>
        <div><span className='text_color'>Currency Exch Rate : </span>
          { !currExchRateFlag && <b className="text-dark" style={{cursor:'pointer', textDecoration:'underline'}} onClick={() => setCurrExchRateFlag(true)}>7.81</b>}
          { currExchRateFlag && <Modal
                                  open={currExchRateFlag}
                                  aria-labelledby="parent-modal-title"
                                  aria-describedby="parent-modal-description"
                                >
                                  <Box 
                                  sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    border:'none',
                                    pt: 2,
                                    px: 4,
                                    pb: 3,
                                    borderRadius:'8px'
                                  }}
                                  className="boxShadow_hp"
                                  >
                                    <h4 className='text-center'>Currency Exchange Rate</h4>
                                    <div className='d-flex justify-content-center align-items-center pt-2'>
                                      <input type="text" />
                                      <button className='btn btn-warning py-1 mx-1' onClick={() => setCurrExchRateFlag(false)}>Update</button>
                                    </div>
                                  </Box>
                                </Modal> }
        </div>

        {
          <>
            <Modal open={printListModal} onClose={() => setPrintListModal(false)}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Select Print Type
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="print-type"
              name="print-type"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              { (mode === 'alteration_receive' || mode === 'alteration_issue') ? <>
                <FormControlLabel
                  value="270"
                  control={<Radio sx={{
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                    },
                  }} />}
                  label="Alteration Print"
                />
                <FormControlLabel
                  value="271"
                  control={<Radio sx={{
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                    },
                  }} />}
                  label="Repair Print"
                />
              </> : <>
                <FormControlLabel
                value="270"
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                  },
                }} />}
                label="Bill Sticker"
              />
              <FormControlLabel
                value="10"
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                  },
                }} />}
                label="Daily Statement"
              />
              <FormControlLabel
                value="232"
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                  },
                }} />}
                label="Detail Print 10"
              />
              <FormControlLabel
                value="312"
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                  },
                }} />}
                label="Export Invoice A"
              />
              <FormControlLabel
                value="244"
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                  },
                }} />}
                label="Invoice print R"
              />
              <FormControlLabel
                value="283"
                control={<Radio sx={{
                  '&.Mui-checked': {
                    color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                  },
                }} />}
                label="Invoice Print V"
              />
              </>}
              {/* ... Add all other options */}
            </RadioGroup>
          </FormControl>
          {/* <Button onClick={handleCloseModal} variant="contained">
            Submit
          </Button> */}
        </Box>
      </Modal>
          </>
        }
        { !SaveFiltersFlag && <div><EditIcon style={{cursor:'pointer'}} titleAccess='Edit' onClick={() => handleUpdateFilters()} /></div>}
      </div>}



      <div className="action-buttons">
        { (modeComp !== "alteration_receive" && modeComp !== "alteration_issue" && modeComp !== "customer_receive" && modeComp !== "material_purchase") && buttonActions?.map((action) => (
          <Tooltip title={action.title} arrow placement="top" key={action.value}>
            <button
              className={`btn`}
              // className={`btn ${selectedButton === action.value ? 'btn_c text-white' : `${theme?.palette?.customColors?.lightgrey}`}`}
              onClick={() => handleButtonClick(action.value)}
              style={{backgroundColor: selectedButton === action.value ? theme?.palette?.customColors?.purple : theme?.palette?.customColors?.lightgrey, 
                color: selectedButton === action.value ? 'white' : 'black'}}
            >
              {action.icon}
            </button>
          </Tooltip>
        ))}
        { (modeComp === "alteration_receive" ) && buttonAltActionsReceive?.map((action) => (
          <Tooltip title={action.title} arrow placement="top" key={action.value}>
            {/* <button
              className={`btn ${selectedButton === action.value ? 'btn_c text-white' : 'btn_custom'}`}
              onClick={() => handleButtonClick(action.value)}
            > */}
              <button
              className={`btn`}
              // className={`btn ${selectedButton === action.value ? 'btn_c text-white' : `${theme?.palette?.customColors?.lightgrey}`}`}
              onClick={() => handleButtonClick(action.value)}
              style={{backgroundColor: selectedButton === action.value ? theme?.palette?.customColors?.purple : theme?.palette?.customColors?.lightgrey, 
                color: selectedButton === action.value ? 'white' : 'black'}}
            >
              {action.icon}
            </button>
          </Tooltip>
        ))}
        { ( modeComp === "alteration_issue") && buttonAltActionsIssue?.map((action) => (
          <Tooltip title={action.title} arrow placement="top" key={action.value}>
            {/* <button
              className={`btn ${selectedButton === action.value ? 'btn_c text-white' : 'btn_custom'}`}
              onClick={() => handleButtonClick(action.value)}
            > */}
              <button
              className={`btn`}
              // className={`btn ${selectedButton === action.value ? 'btn_c text-white' : `${theme?.palette?.customColors?.lightgrey}`}`}
              onClick={() => handleButtonClick(action.value)}
              style={{backgroundColor: selectedButton === action.value ? theme?.palette?.customColors?.purple : theme?.palette?.customColors?.lightgrey, 
                color: selectedButton === action.value ? 'white' : 'black'}}
            >
              {action.icon}
            </button>
          </Tooltip>
        ))}
        { ( modeComp === "customer_receive") && buttonCustReceiveActionsIssue?.map((action) => (
          <Tooltip title={action.title} arrow placement="top" key={action.value}>
            {/* <button
              className={`btn ${selectedButton === action.value ? 'btn_c text-white' : 'btn_custom'}`}
              onClick={() => handleButtonClick(action.value)}
            > */}
              <button
              className={`btn`}
              // className={`btn ${selectedButton === action.value ? 'btn_c text-white' : `${theme?.palette?.customColors?.lightgrey}`}`}
              onClick={() => handleButtonClick(action.value)}
              style={{backgroundColor: selectedButton === action.value ? theme?.palette?.customColors?.purple : theme?.palette?.customColors?.lightgrey, 
                color: selectedButton === action.value ? 'white' : 'black'}}
            >
              {action.icon}
            </button>
          </Tooltip>
        ))}
        { ( modeComp === "material_purchase") && buttonMatPurchaseActionsIssue?.map((action) => (
          <Tooltip title={action.title} arrow placement="top" key={action.value}>
            {/* <button
              className={`btn ${selectedButton === action.value ? 'btn_c text-white' : 'btn_custom'}`}
              onClick={() => handleButtonClick(action.value)}
            > */}
              <button
              className={`btn`}
              // className={`btn ${selectedButton === action.value ? 'btn_c text-white' : `${theme?.palette?.customColors?.lightgrey}`}`}
              onClick={() => handleButtonClick(action.value)}
              style={{backgroundColor: selectedButton === action.value ? theme?.palette?.customColors?.purple : theme?.palette?.customColors?.lightgrey, 
                color: selectedButton === action.value ? 'white' : 'black'}}
            >
              {action.icon}
            </button>
          </Tooltip>
        ))}
      </div>
      
          { !selectedButtonFlag && 
            <>
              { selectedButton === 'add' && <AddJob /> }
              { selectedButton === 'Customize All' && <CustomizeAll /> }
              {/* { selectedButton === 'Old Gold' && <OldGold /> } */}
              { selectedButton === 'Rate Cut' && <RateCut /> }
              { selectedButton === 'Pay' && <Pay /> }
              { selectedButton === 'Summary' && <Summary /> }
              { selectedButton === 'Save' && <Save /> }
              {/* { selectedButton === 'Print' && <Print /> } */}

              {/* Alteration Receive */}
              { selectedButton === 'altjobs' && <AltJobs /> }

              {/* Customer Receive */}
              { selectedButton === 'custReceive' && <NewCustomerReceive /> }
              { selectedButton === 'material_purchase' && <NewCustomerReceive /> }


            </>
          }
      
          
      </>}
    </div>
  );
};

export default HomePage;
