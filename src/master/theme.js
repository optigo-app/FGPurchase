import { createTheme } from '@mui/material/styles';
let mode = 'light'
const whiteColor = '#FFF'
const lightColor = '#2F2B3D'
const darkColor = '#D0D4F1'
const darkPaperBgColor = '#2F3349'
const mainColor = mode === 'light' ? lightColor : darkColor;
const customTheme = createTheme({
  palette: {
    // ...paletteFile,
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C',
      trackBg: mode === 'light' ? '#F1F0F2' : '#363B54',
      avatarBg: mode === 'light' ? '#DBDADE' : '#4A5072',
      tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072',
      primary:'linear-gradient(270deg, rgba(115, 103, 240, 0.7) 0%, #7367f0 100%)',
      //centralized color
      purple:'#7367F0',
      lightBgPurple:'#E8E7FD',
      titleColor:'#2F2B3D',

      
      
      green:'#28C76F',
      info:'#00CFE8',
      grey:'#A8AAAE',
      lightgrey:'#D3D3D3',
      red:'linear-gradient(270deg, rgba(255, 72, 66, 0.8) 0%, #d90429 100%)',
      // orange:'#FF9F43',
      orange:'#FF9F43',
      lightBgOrange:'#FFF0E1',
      lightBgGrey:'#F1F1F2',
      littlelightBgGrey:'#F1F1F2',
      lightBgGreen:'#DCF6E8',
      lightBgInfo:'#D6F7FB',
      littlelightBgPurple:'#A49CF5',
      lightBgRed:'#FCE4E4',


    },

  },
});

export default customTheme;