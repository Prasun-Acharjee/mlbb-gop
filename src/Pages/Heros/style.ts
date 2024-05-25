import { Paper, Grid, styled } from "@mui/material";

export const HeroPaper = styled(Paper)(({ theme }: { theme: any }) => ({
  background: theme.background.dark,
  minHeight: "99vh",
  paddingTop: "64px",
}));

export const TierItemContainer = styled(Grid)(({ theme }: { theme: any }) => ({
  background: theme.background.light,
  margin: 15,
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: 15,
  boxShadow: "3px 2px 1px 1px rgba(0,0,0,0.5)",
  borderRadius: 8,
  maxWidth: "1200px",
  width: "90%",
}));
