import {  Paper,Grid,  styled } from "@mui/material";

export const HeroPaper = styled(Paper)(({theme}:{theme:any})=>({
    background:theme.background.dark,
    minHeight:'99vh'
}))

export const TierItemContainer = styled(Grid)(({theme}:{theme:any})=>({
    background:theme.background.light
}))