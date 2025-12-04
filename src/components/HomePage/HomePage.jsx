
import React, { useEffect, useRef, useState } from 'react';
import './homepage.css';

import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import PercentIcon from '@mui/icons-material/Percent';
import PaymentIcon from '@mui/icons-material/Payment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';

import { Tooltip, Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleCustomizeJobFlag, handleSave, handleSaveAndNextFlag, handleSelectedButton } from '../../redux/slices/HomeSlice';
import EditIcon from '@mui/icons-material/Edit';
import { BooksData, CurrencyData, CustomerData, LockerData } from './dummyData';
import CustomizeAll from '../CustomizeAll/CustomizeAll';
import AddJob from '../AddJob/AddJob';
import RateCut from '../RateCut/RateCut';
import Pay from '../Payment/Pay';
import Save from '../Save/Save';
import Summary from '../Summary/Summary';
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
import PrintTypeModal from '../../ShortcutComponent/PrintTypeModal';
import UpdateDateModal from '../../ShortcutComponent/UpdateDateModal';
import CurrencyExchangeModal from '../../ShortcutComponent/CurrencyExchangeModal';
import toast from 'react-hot-toast';

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
  outline: 'none'
};

const HomePage = ({ toggleSidebar, isSidebarOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userListRef = useRef(null);
  const selectedButton = useSelector((state) => (state?.home?.selectButtonValue));
  const savedValue = useSelector((state) => (state?.home?.homefilterObject));
  const [selectedButtonFlag, setSelectedButtonFlag] = useState(true);
  const [refno, setRefno] = useState('');
  const [counter, setCounter] = useState('');
  const [SaveFiltersFlag, setSaveFiltersFlag] = useState(true);
  const [updateFiltersFlag, setUpdateFiltersFlag] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  const [filterCustomerData, setFilterCustomerData] = useState([]);
  const [bookNameData, setBookNameData] = useState([]);
  const [selectBookName, setSelectBookName] = useState('');
  const [lockerData, setLockerData] = useState([]);
  const [selectLockerName, setSelectLockerName] = useState('');
  const [currecyData, setCurrencyData] = useState([]);
  const [selectCurrency, setSelectCurrency] = useState('');
  const [dateUpdateFlag, setDateUpdateFlag] = useState(false);
  const [currExchRateFlag, setCurrExchRateFlag] = useState(false);
  const [printListModal, setPrintListModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [date, setDate] = useState(new Date());
  const [userRefDate, setUserRefDate] = useState(new Date());
  const [isUpdatingUserRefDate, setIsUpdatingUserRefDate] = useState(false);
  const [voucherType, setVoucherType] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    searchUser: false,
    bookName: false,
    currency: false,
    locker: false,
    voucherType: false,
  });

  const handleRefNoChange = (e) => {
    const value = e.target.value;
    setRefno(value);
  }

  const handleCounter = (e) => {
    const value = e.target.value;
    setCounter(value);
  }

  const CounterArr = [
    {
      id: 1,
      name: 'counter-1'
    },
    {
      id: 2,
      name: 'counter-2'
    },
  ];

  useEffect(() => {
    setCustomerData(CustomerData);
    setFilterCustomerData(CustomerData);
    setBookNameData(BooksData);
    setLockerData(LockerData);
    setCurrencyData(CurrencyData);
  }, []);

  const handleBookName = (e) => {
    const value = e.target.value;
    setSelectBookName(value);
    setValidationErrors((prev) => ({ ...prev, bookName: !(value)?.toString()?.trim() }));
  }

  const handleLocker = (e) => {
    const value = e.target.value;
    setSelectLockerName(value);
    setValidationErrors((prev) => ({ ...prev, locker: !(value)?.toString()?.trim() }));
  }

  const handleCurrency = (e) => {
    const value = e.target.value;
    setSelectCurrency(value);
    setValidationErrors((prev) => ({ ...prev, currency: !(value)?.toString()?.trim() }));
  }

  const buttonActions = [
    { title: "Add", icon: <AddIcon />, value: "add" },
    { title: "Customize All", icon: <SettingsIcon />, value: "Customize All" },
    { title: "Rate Cut", icon: <PercentIcon />, value: "Rate Cut" },
    { title: "Pay", icon: <PaymentIcon />, value: "Pay" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    { title: "Save", icon: <SaveIcon />, value: "save" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];
  const buttonAltActionsReceive = [
    { title: "Add", icon: <AddIcon />, value: "altjobs" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    { title: "Save", icon: <SaveIcon />, value: "" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];
  const buttonAltActionsIssue = [
    { title: "Add", icon: <AddIcon />, value: "add" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    { title: "Save", icon: <SaveIcon />, value: "save" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];
  const buttonCustReceiveActionsIssue = [
    { title: "Add", icon: <AddIcon />, value: "custReceive" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    { title: "Save", icon: <SaveIcon />, value: "save" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];
  const buttonMatPurchaseActionsIssue = [
    { title: "Add", icon: <AddIcon />, value: "custReceive" },
    { title: "Summary", icon: <SummarizeIcon />, value: "Summary" },
    { title: "Save", icon: <SaveIcon />, value: "save" },
    { title: "Print", icon: <PrintIcon />, value: "Print" },
  ];

  const handleButtonClick = (value) => {
    if (value === "Print") {
      setPrintListModal(true);
      return
    }
    if (value === "save") {
      toast.success("Saved Successfully");
      return
    }
    if (value) {
      dispatch(handleSelectedButton(value));
      setSelectedButtonFlag(false);
      dispatch(handleCustomizeJobFlag(false));
      dispatch(handleSaveAndNextFlag(false));
    }
  };

  //user logic
  const [searchUser, setUserSearch] = useState('');
  const [userList, setUserList] = useState(CustomerData);
  const [selectedUser, setSelectedUser] = useState('');
  const [showUserListFlag, setShowUserListFlag] = useState(false);
  const [selectedUserIndex, setSelecteUserdIndex] = useState(-1);

  const handleUserTypo = (e) => {
    setUserSearch(e.target.value);
    const value = e.target.value;
    if (e.target.value) {
      let searchVal = (e.target.value)?.toLowerCase()?.toString();
      setShowUserListFlag(true);
      const filteredUserArr = CustomerData?.filter((el, i) => el?.TypoLabel?.toString()?.toLowerCase()?.includes(searchVal));
      setUserList(filteredUserArr);
      setValidationErrors((prev) => ({ ...prev, searchUser: !(value)?.toString()?.trim() }));
    } else {
      setShowUserListFlag(false);
    }
    setSelecteUserdIndex(-1);
  }

  const handleUserList = (e) => {
    setSelectedUser(e?.TypoLabel);
    setUserSearch(e?.TypoLabel);
    if (e?.TypoLabel) {
      setShowUserListFlag(false);
    }
  }

  const handleUserBlur = () => {
    setTimeout(() => {
      setShowUserListFlag(false);
    }, 2000);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelecteUserdIndex((prevIndex) => (prevIndex + 1) % userList?.length);
    } else if (e.key === 'ArrowUp') {
      setSelecteUserdIndex((prevIndex) => (prevIndex - 1 + userList?.length) % userList?.length);
    } else if (e.key === 'Enter' && selectedUserIndex >= 0) {
      handleUserList(userList[selectedUserIndex]);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setPrintListModal(false);
  };

  const [modeComp, setModeComp] = useState('');
  const mode = useSelector((state) => state?.fgp?.mode);

  const handleModeChangeComp = (e) => {
    let val = e.target.value;
    if (val) {
      setModeComp(e.target.value);

    }
  }

  useEffect(() => {
    dispatch(handleModeChange(modeComp));
  }, [modeComp]);

  const voucherTypeData = [
    {
      id: 1,
      name: 'Repairing'
    },
    {
      id: 2,
      name: 'Mounting'
    },
    {
      id: 3,
      name: 'Polishing'
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
        voucherType: !voucherType.trim(),
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
      date: date.toISOString(),
      userRefDate: userRefDate.toISOString(),
      modeType: modeComp,
    };

    console.log('obj: ', obj);
    const isObjEmpty = Object.keys(obj).some(key => {
      if ((modeComp !== "alteration_issue" && modeComp !== "alteration_receive") && key === "voucherType") {
        return false;
      }
      if (modeComp === "alteration_receive" && !["searchUser", "voucherType", "date", "bookName", "currency", "refno"].includes(key)) {
        return false;
      }
      if (key === "refno" || key === "counter") {
        return false;
      }
      return obj[key] === '';
    });

    if (isObjEmpty) {
      console.log(isObjEmpty);
      return;
    } else {
      dispatch(handleSave(obj));
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
    setSaveFiltersFlag(true);
    setUpdateFiltersFlag(true);
    setSelectedButtonFlag(true);
  };

  useEffect(() => {
    if (savedValue) {
      setSelectedUser(savedValue?.searchUser || '');
      setSelectBookName(savedValue?.bookName || '');
      setSelectCurrency(savedValue?.currency || '');
      setSelectLockerName(savedValue?.locker || '');
      setCounter(savedValue?.counter || '');
      setRefno(savedValue?.refno || '');
      setVoucherType(savedValue?.voucherType || '');
      setDate(savedValue?.date ? new Date(savedValue?.date) : new Date());
      setUserRefDate(savedValue?.userRefDate ? new Date(savedValue?.userRefDate) : new Date());
      setModeComp(savedValue?.modeType || '');
    }
  }, [savedValue]);


  return (
    <div className="homepage_container pt-0">
      {(SaveFiltersFlag || updateFiltersFlag) && <div className='homepage-filetermaindiv'>
        <div className='pe-4'>
          <button className="left-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <Tooltip title="Close User Details">
                <FaAnglesLeft className="toggle-icon" />
              </Tooltip>
            ) : (
              <Tooltip title="Open User Details">
                <FaAnglesRight className="toggle-icon" />
              </Tooltip>
            )}
          </button>
        </div>
        <div className="filters-container_hm">
          <div className='filter-item_hp'>
            <select name="mode" id="mode" value={modeComp} onChange={(e) => handleModeChangeComp(e)} className='fs_fgp fs_fgp_select'>
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
                              backgroundColor: index === selectedUserIndex ? '#d3d3d3' : 'transparent',
                            }}>{capitalizeWords(e?.TypoLabel)}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </>
            }
          </div>
          {(modeComp !== "alteration_receive" && modeComp !== "customer_receive" && modeComp !== "material_purchase") && <>
            <div className="filter-item_hp" >
              <select name="bookname" id="bookname" value={selectBookName} className='fs_fgp fs_fgp_select' onChange={(el) => handleBookName(el)} style={{ border: validationErrors?.bookName ? '1px solid red' : '1px solid #ccc' }} >
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
              <select name="currency" id="currency" className='fs_fgp fs_fgp_select' value={selectCurrency} onChange={(el) => handleCurrency(el)} style={{ border: validationErrors?.currency ? '1px solid red' : '1px solid #ccc' }}>
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
            {modeComp === "alteration_issue" && <div className="filter-item_hp" >
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
                <select name="currency" id="currency" value={selectCurrency} className='fs_fgp fs_fgp_select' onChange={(el) => handleCurrency(el)} style={{ border: validationErrors?.currency ? '1px solid red' : '1px solid #ccc' }}>
                  <option value="" disabled selected>select Currency</option>
                  {
                    currecyData?.map((e, i) => {
                      return <option value={e?.id} key={i}>{capitalizeWords(e?.Currencycode)}</option>
                    })
                  }
                </select>
              </div>
              <div className="datePicker_hp fs_fgp" >
                <DatePicker
                  selected={date}
                  id='basic-input'
                  onChange={date => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput className='rounded' style={{ height: '43px', border: '1px solid rgb(204, 204, 204)' }} />}
                  className='fs_fgp'
                />
              </div>

            </>
          }
          {
            (modeComp === "customer_receive" || modeComp === "material_purchase") && <>
              <div className="filter-item_hp" >
                <select name="bookname" id="bookname" value={selectBookName} className='fs_fgp fs_fgp_select' onChange={(el) => handleBookName(el)} style={{ border: validationErrors?.bookName ? '1px solid red' : '1px solid #ccc' }} >
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
                <select name="currency" id="currency" className='fs_fgp fs_fgp_select' value={selectCurrency} onChange={(el) => handleCurrency(el)} style={{ border: validationErrors?.currency ? '1px solid red' : '1px solid #ccc' }}>
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
        </div>
        <div className='proceed-button-container'>
          <Button variant='contained' title='Save' size='small' sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }} className='fs_fgp' onClick={() => handleSaveFilters()}>Proceed</Button>
        </div>
      </div>}

      {!SaveFiltersFlag && <>
        {!updateFiltersFlag && (
          <div className="customer-info-cards">
            {/* Toggle Button */}
            <button className="left-toggle-btn" onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <Tooltip title="Close User Details">
                  <FaAnglesLeft className="toggle-icon" />
                </Tooltip>
              ) : (
                <Tooltip title="Open User Details">
                  <FaAnglesRight className="toggle-icon" />
                </Tooltip>
              )}
            </button>

            {/* User Info */}
            <div className="info-card">
              <span className="label">User:</span>
              <span className="value">{savedValue?.searchUser}</span>
            </div>

            {/* Date Info */}
            <div className="info-card">
              <span className="label">Date:</span>
              {!dateUpdateFlag && (
                <span
                  className="value editable"
                  onClick={() => {
                    setIsUpdatingUserRefDate(false);
                    setDateUpdateFlag(true);
                  }}
                >
                  {date ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                </span>
              )}
            </div>

            {/* Currency Exchange Rate */}
            <div className="info-card">
              <span className="label">Currency Exch Rate:</span>
              {!currExchRateFlag && (
                <span className="value editable" onClick={() => setCurrExchRateFlag(true)}>
                  {exchangeRate || 7.81}
                </span>
              )}
            </div>
            {/* User Reference Date*/}
            <div className="info-card">
              <span className="label">User Reference Date:</span>
              {!dateUpdateFlag && (
                <span
                  className="value editable"
                  onClick={() => {
                    setIsUpdatingUserRefDate(true);
                    setDateUpdateFlag(true);
                  }}
                >
                  {userRefDate ? userRefDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                </span>
              )}
            </div>

            {/* Edit Filters */}
            {!SaveFiltersFlag && (
              <div className="edit-btn" onClick={handleUpdateFilters}>
                <Tooltip title="Edit Filters">
                  <EditIcon className="edit-icon" />
                </Tooltip>
              </div>
            )}
          </div>
        )}


        <div className="action-bar-row">
          <div className="action-buttons">
          {(modeComp !== "alteration_receive" && modeComp !== "alteration_issue" && modeComp !== "customer_receive" && modeComp !== "material_purchase") && buttonActions?.map((action) => (
            <Tooltip title={action.title} arrow placement="top" key={action.value}>
              <button
                className={`btn`}
                onClick={() => handleButtonClick(action.value)}
                style={{
                  background: selectedButton === action.value ? theme?.palette?.customColors?.primary : theme?.palette?.customColors?.lightgrey,
                  color: selectedButton === action.value ? 'white' : 'black'
                }}
              >
                {action.icon}
              </button>
            </Tooltip>
          ))}
          {(modeComp === "alteration_receive") && buttonAltActionsReceive?.map((action) => (
            <Tooltip title={action.title} arrow placement="top" key={action.value}>
              <button
                className={`btn`}
                onClick={() => handleButtonClick(action.value)}
                style={{
                  background: selectedButton === action.value ? theme?.palette?.customColors?.primary : theme?.palette?.customColors?.lightgrey,
                  color: selectedButton === action.value ? 'white' : 'black'
                }}
              >
                {action.icon}
              </button>
            </Tooltip>
          ))}
          {(modeComp === "alteration_issue") && buttonAltActionsIssue?.map((action) => (
            <Tooltip title={action.title} arrow placement="top" key={action.value}>
              <button
                className={`btn`}
                onClick={() => handleButtonClick(action.value)}
                style={{
                  background: selectedButton === action.value ? theme?.palette?.customColors?.primary : theme?.palette?.customColors?.lightgrey,
                  color: selectedButton === action.value ? 'white' : 'black'
                }}
              >
                {action.icon}
              </button>
            </Tooltip>
          ))}
          {(modeComp === "customer_receive") && buttonCustReceiveActionsIssue?.map((action) => (
            <Tooltip title={action.title} arrow placement="top" key={action.value}>
              <button
                className={`btn`}
                onClick={() => handleButtonClick(action.value)}
                style={{
                  background: selectedButton === action.value ? theme?.palette?.customColors?.primary : theme?.palette?.customColors?.lightgrey,
                  color: selectedButton === action.value ? 'white' : 'black'
                }}
              >
                {action.icon}
              </button>
            </Tooltip>
          ))}
          {(modeComp === "material_purchase") && buttonMatPurchaseActionsIssue?.map((action) => (
            <Tooltip title={action.title} arrow placement="top" key={action.value}>
              <button
                className={`btn`}
                onClick={() => handleButtonClick(action.value)}
                style={{
                  background: selectedButton === action.value ? theme?.palette?.customColors?.primary : theme?.palette?.customColors?.lightgrey,
                  color: selectedButton === action.value ? 'white' : 'black'
                }}
              >
                {action.icon}
              </button>
            </Tooltip>
          ))}
          </div>

          <div className="set-info-card fs_fgp">
            <span>Diamondset: <strong>DeepakDiam</strong></span>
            <span>ColorStoneset: <strong>DepakCs</strong></span>
            <span>LabourSet: <strong>depak</strong></span>
          </div>
        </div>

        {!selectedButtonFlag &&
          <>
            {selectedButton === 'add' && <AddJob />}
            {selectedButton === 'Customize All' && <CustomizeAll />}
            {selectedButton === 'Rate Cut' && <RateCut />}
            {selectedButton === 'Pay' && <Pay />}
            {selectedButton === 'Summary' && <Summary />}
            {selectedButton === 'altjobs' && <AltJobs />}
            {selectedButton === 'save' && <Save />}
            {selectedButton === 'custReceive' && <NewCustomerReceive />}
            {selectedButton === 'material_purchase' && <NewCustomerReceive />}
          </>
        }
      </>}
      <CurrencyExchangeModal
        theme={theme}
        open={currExchRateFlag}
        onClose={() => setCurrExchRateFlag(false)}
        value={exchangeRate}
        setValue={setExchangeRate}
      />
      <UpdateDateModal
        open={dateUpdateFlag}
        onClose={() => setDateUpdateFlag(false)}
        date={isUpdatingUserRefDate ? userRefDate : date}
        setDate={isUpdatingUserRefDate ? setUserRefDate : setDate}
        CustomInput={CustomInput}
        theme={theme}
      />
      <PrintTypeModal
        open={printListModal}
        onClose={() => setPrintListModal(false)}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        mode={mode}
        theme={theme}
        style={style}
      />
    </div>
  );
};

export default HomePage;
