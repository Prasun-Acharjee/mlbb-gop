import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HeroPaper } from "../HeroPage/style";
import { useStyles } from "./style";
import Aegis_Webp from "../../Assets/BattleSpells/Aegis.webp";
import Arrival_Webp from "../../Assets/BattleSpells/Arrival.webp";
import Execute_Webp from "../../Assets/BattleSpells/Execute.webp";
import Flameshot_Webp from "../../Assets/BattleSpells/Flameshot.webp";
import Flicker_Webp from "../../Assets/BattleSpells/Flicker.webp";
import Inspire_Webp from "../../Assets/BattleSpells/Inspire.webp";
import Petrify_Webp from "../../Assets/BattleSpells/Petrify.webp";
import Purify_Webp from "../../Assets/BattleSpells/Purify.webp";
import Retribution_Webp from "../../Assets/BattleSpells/Retribution.webp";
import Revitalize_Webp from "../../Assets/BattleSpells/Revitalize.webp";
import Sprint_Webp from "../../Assets/BattleSpells/Sprint.webp";
import Vengeance_Webp from "../../Assets/BattleSpells/Vengeance.webp";

const ICON_NAME_MAPPING: any = {
  Execute: Execute_Webp,
  Retribution: Retribution_Webp,
  Inspire: Inspire_Webp,
  Sprint: Sprint_Webp,
  Revitalize: Revitalize_Webp,
  Aegis: Aegis_Webp,
  Petrify: Petrify_Webp,
  Purify: Purify_Webp,
  Flameshot: Flameshot_Webp,
  Flicker: Flicker_Webp,
  Arrival: Arrival_Webp,
  Vengeance: Vengeance_Webp,
};

type TBattleSpellItem = {
  name: string;
  details: string;
  cooldown: string;
  about: string;
};

const BattleSpells = () => {
  const [battleSpells, setBattleSpells] = useState<TBattleSpellItem[]>([]);
  const classes = useStyles();
  useEffect(() => {
    fetch("http://localhost:8080/index.php?api_path=get_battle_spells", {
      method: "GET",
    })
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((result: any) => {
        console.log("result", result);
        setBattleSpells(result);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }, []);
  return (
    <HeroPaper style={{ marginTop: 60 }}>
      <Grid container direction={"column"} className={classes.container}>
        {battleSpells.map((item: TBattleSpellItem) => {
          return (
            <Grid item className={classes.itemContainer}>
              <Grid container flexWrap={"nowrap"}>
                <img
                  className={classes.imageContent}
                  src={ICON_NAME_MAPPING[item.name]}
                  alt={item.name}
                />
                <Grid
                  style={{
                    color: "white",
                    marginLeft: 15,
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    style={{ borderBottom: "2px solid white" }}
                  >
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                    <Typography style={{ marginLeft: 15 }}>
                      ({item.about})
                    </Typography>
                  </Grid>
                  <Typography>{item.details}</Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </HeroPaper>
  );
};
export default BattleSpells;
