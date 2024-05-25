import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  imageContent: {
    height: 75,
    width: 75,
    border: "1px solid white",
  },
  container: {
    margin: theme.spacing(2, 0),
  },
  itemContainer: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1.5),
    border: "1px solid white",
  },
}));
