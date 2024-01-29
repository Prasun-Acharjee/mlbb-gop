import {  Paper,Grid,  styled } from "@mui/material";

export const HeroPaper = styled(Paper)(({theme}:{theme:any})=>({
    background:theme.background.dark,
    minHeight:'99vh',
    paddingTop:'64px'
}))

export const TierItemContainer = styled(Grid)(({theme}:{theme:any})=>({
    background:theme.background.light
}))