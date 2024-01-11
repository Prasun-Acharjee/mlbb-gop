import {  Paper,Grid,  styled } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const HeroPaper = styled(Paper)(({theme}:{theme:any})=>({
    background:theme.background.dark,
    minHeight:'99vh',
    padding:'30px'
}))

export const Container  = styled(Grid)(({theme}:{theme:any})=>({
    background:theme.background.light
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
    }
  }));

