import {  Paper,Grid,  styled, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { boxShadow } from ".";

export const HeroPaper = styled(Paper)(({theme}:{theme:any})=>({
    background:theme.background.dark,
    minHeight:'99vh',
    padding:'30px'
}))

export const Container  = styled(Grid)(({theme}:{theme:any})=>({
    background:theme.background.light,
    height: 440,
    padding: 20,
    borderRadius: 8,
    boxShadow: boxShadow,
    '@media(max-width:1200px)':{
       flexDirection:'column',
       height:'auto'
    }
}))

export const HeroDataItem = styled(Grid)(({theme}:{theme:any})=>({
    border:'1px solid black',
    borderRadius:8,
}))

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#10243c' ,
    color:'white',
    height:'100%',
    textAlign: 'center',
    // minHeight:60,
  }));

export const HeroItems = styled(Grid)(({theme})=>({
    flex:0.8,
    '@media(max-width:1200px)':{
        flex:'unset',
        width:'100%'
     }
}))

export const EquipmentText = styled(Typography)(({theme})=>({
    textAlign:'center',
    '@media(max-width:600px)':{
       display:'none'
     }
}))

export const BuildHeader = styled(Typography)(({theme})=>({
    '@media(max-width:600px)':{
        fontSize:'12px'
      }
}))
  

export const useStyles = makeStyles((theme:any) => ({
    indicatorBar:{
        color:'transparent!imporant' as any,
        backgroundColor:'transparent!important' as any
    },
    rootContainer:{
        borderTopLeftRadius:'8px!important' as any,
        borderTopRightRadius:'8px!important' as any
    },
    selectedTab:{
        backgroundColor:'#d1e0f3!important' as any,
        color:'black!important' as any,
        borderTopLeftRadius:'8px!important' as any,
        borderTopRightRadius:'8px!important' as any
    },
    imageContent:{
        flex: 1.2,
        objectFit: "cover",
        "@media (max-width: 1280px)": {
            flex:'unset',
            width:'100%'
          }
    }
  }));

