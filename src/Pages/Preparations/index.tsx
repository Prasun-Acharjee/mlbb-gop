import { Grid, Typography } from "@mui/material";
import React from "react";
import { HeroPaper } from "../HeroPage/style";
import { useNavigate } from "react-router-dom";

const Preparation = () => {
  const navigate = useNavigate();
  return (
    <HeroPaper style={{ marginTop: 60 }}>
      <Grid style={{ color: "white" }}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", margin: "20px 0px 30px 0px" }}
        >
          Get Prepped up!
        </Typography>
        <Grid container gap={2}>
          <Grid
            onClick={() => navigate("emblems")}
            style={{
              height: 300,
              border: "1px solid black",
              minWidth: 300,
              backdropFilter: "blur(20px)",
              borderRadius: 15,
              background:
                "radial-gradient(circle at bottom center, #3F5EFB 15px, blue)",
            }}
            container
            alignItems={"center"}
            justifyContent={"center"}
            flex={1}
          >
            <Typography variant="h5">Emblems</Typography>
          </Grid>
          <Grid
            onClick={() => navigate("battle_spells")}
            style={{
              height: 300,
              border: "1px solid black",
              minWidth: 300,
              borderRadius: 15,
              backdropFilter: "blur(20px)",
              background:
                "radial-gradient(circle at bottom center,  #d53369 15px,#3F5EFB )",
            }}
            container
            alignItems={"center"}
            justifyContent={"center"}
            flex={1}
          >
            <Typography variant="h5">Battle Spells</Typography>
          </Grid>
          <Grid
            onClick={() => navigate("equipments")}
            style={{
              height: 300,
              border: "1px solid black",
              minWidth: 300,
              borderRadius: 15,
              backdropFilter: "blur(20px)",
              background:
                "radial-gradient(circle at bottom center, #3F5EFB 15px, blue)",
            }}
            container
            alignItems={"center"}
            justifyContent={"center"}
            flex={1}
          >
            <Typography variant="h5">Equipments</Typography>
          </Grid>
        </Grid>
      </Grid>
    </HeroPaper>
  );
};

export default Preparation;
