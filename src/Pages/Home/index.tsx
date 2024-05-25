import React, { useEffect } from "react";
import { Autocomplete, Grid, alpha, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import APP_ICON from "../../Assets/Logos/icon.png";
import { HeroPaper } from "../Heros/style";
import Typewriter from "typewriter-effect";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 16,
  minHeight: 60,
  display: "flex",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  maxWidth: 600,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const TypeWriterText = () => {
  return (
    <Typewriter
      options={{
        strings: [
          "Search a Hero...",
          "Search a Build...",
          "Search a Skin...",
          "Search an Equipment...",
        ],
        autoStart: true,
        loop: true,
      }}
    />
  );
};
const Home = () => {
  return (
    <HeroPaper>
      <Grid
        container
        flexDirection="column"
        direction={"column"}
        justifyContent="center"
        alignItems="center"
        flexWrap={"nowrap"}
        style={{ padding: 15, height: "70vh" }}
      >
        <Grid style={{ marginBottom: 50 }}>
          <img
            src={APP_ICON}
            style={{ height: "100%", width: "100%" }}
            alt="app-logo"
          />
        </Grid>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Autocomplete
            style={{ marginLeft: 56 }}
            options={[]}
            renderInput={() => <TypeWriterText />}
          />
        </Search>
      </Grid>
    </HeroPaper>
  );
};

export default Home;
