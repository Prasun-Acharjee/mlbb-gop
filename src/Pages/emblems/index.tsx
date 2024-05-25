import { Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { HeroPaper } from "../HeroPage/style";
import { useStyles } from "./style";
import Agility_Webp from "../../Assets/Emblems/Agility.webp";
import Bargain_Hunter_Webp from "../../Assets/Emblems/Bargain_Hunter.webp";
import Brave_Smite_Webp from "../../Assets/Emblems/Brave_Smite.webp";
import Concussive_Blast_Webp from "../../Assets/Emblems/Concussive_Blast.webp";
import Fatal_Webp from "../../Assets/Emblems/Fatal.webp";
import Festival_of_Blood_Webp from "../../Assets/Emblems/Festival_of_Blood.webp";
import Firmness_Webp from "../../Assets/Emblems/Firmness.webp";
import Focusing_Mark_Webp from "../../Assets/Emblems/Focusing_Mark.webp";
import Impure_Rage_Webp from "../../Assets/Emblems/Impure_Rage.webp";
import Inspire_29_Webp from "../../Assets/Emblems/Inspire_29.webp";
import Killing_Spree_Webp from "../../Assets/Emblems/Killing_Spree.webp";
import Lethal_Ignition_Webp from "../../Assets/Emblems/Lethal_Ignition.webp";
import Master_Assassin_Webp from "../../Assets/Emblems/Master_Assassin.webp";
import Pull_Yourself_Together_Webp from "../../Assets/Emblems/Pull_Yourself_Together.webp";
import Quantum_Charge_Webp from "../../Assets/Emblems/Quantum_Charge.webp";
import Rupture_Webp from "../../Assets/Emblems/Rupture.webp";
import Seasoned_Hunter_Webp from "../../Assets/Emblems/Seasoned_Hunter.webp";
import Swift_Webp from "../../Assets/Emblems/Swift.webp";
import Tenacity_Webp from "../../Assets/Emblems/Tenacity.webp";
import Thrill_Webp from "../../Assets/Emblems/Thrill.webp";
import Vitality_Webp from "../../Assets/Emblems/Vitality.webp";
import Weakness_Finder_Webp from "../../Assets/Emblems/Weakness_Finder.webp";
import Weapon_Master_29_Webp from "../../Assets/Emblems/Weapon_Master_29.webp";
import Wilderness_Blessing_Webp from "../../Assets/Emblems/Wilderness_Blessing.webp";
import Marksman_Icon from "../../Assets/HeroClassIcon/Marksman_Icon.webp";
import Assassin_Icon from "../../Assets/HeroClassIcon/Assassin_Icon.webp";
import Mage_Icon from "../../Assets/HeroClassIcon/Mage_Icon.webp";
import Fighter_Icon from "../../Assets/HeroClassIcon/Fighter_Icon.webp";
import Support_Icon from "../../Assets/HeroClassIcon/Support_Icon.webp";
import Tank_Icon from "../../Assets/HeroClassIcon/Tank_Icon.webp";
import Common_Icon from "../../Assets/HeroClassIcon/Common_Icon.webp";

const ICON_NAME_MAPPING: any = {
  1: Thrill_Webp,
  2: Swift_Webp,
  3: Vitality_Webp,
  4: Inspire_29_Webp,
  5: Firmness_Webp,
  6: Fatal_Webp,
  7: Rupture_Webp,
  8: Agility_Webp,
  9: Wilderness_Blessing_Webp,
  10: Seasoned_Hunter_Webp,
  11: Tenacity_Webp,
  12: Master_Assassin_Webp,
  13: Bargain_Hunter_Webp,
  14: Festival_of_Blood_Webp,
  15: Weapon_Master_29_Webp,
  16: Pull_Yourself_Together_Webp,
  17: Impure_Rage_Webp,
  18: Quantum_Charge_Webp,
  19: Concussive_Blast_Webp,
  20: Killing_Spree_Webp,
  21: Lethal_Ignition_Webp,
  22: Brave_Smite_Webp,
  23: Weakness_Finder_Webp,
  24: Focusing_Mark_Webp,
};

const CLASS_ICON_MAPPING: any = {
  Marksman: Marksman_Icon,
  Assassin: Assassin_Icon,
  Support: Support_Icon,
  Common: Common_Icon,
  Tank: Tank_Icon,
  Mage: Mage_Icon,
  Fighter: Fighter_Icon,
};

type TEmblemItem = {
  name: string;
  class: string;
  slot: number;
  detail_1: string;
  detail_2?: string;
  uniqueId: number;
};

type TGroupedEmblems = {
  name: string;
  emblems: TEmblemItem & { icon: string }[];
};

const Emblems = () => {
  const [emblems, setEmblems] = useState<TEmblemItem[]>([]);
  const classes = useStyles();
  useEffect(() => {
    fetch("http://localhost:8080/index.php?api_path=get_emblems", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((result: any) => {
        setEmblems(result);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }, []);

  const classBasedEmblems = useMemo(() => {
    if (emblems.length) {
      const sortedEmblems = emblems.reduce((acc, curr) => {
        const accIndex = acc.findIndex((item: any) => item.name === curr.class);
        if (accIndex !== -1) {
          acc[accIndex].emblems.push({
            ...curr,
            icon: ICON_NAME_MAPPING[curr.uniqueId],
          });
        } else {
          acc.push({
            name: curr.class,
            emblems: [{ ...curr, icon: ICON_NAME_MAPPING[curr.uniqueId] }],
          });
        }
        return acc;
      }, [] as any);
      return sortedEmblems;
    }
    return [];
  }, [emblems]);
  return (
    <HeroPaper style={{ marginTop: 60 }}>
      <Grid container direction={"column"} className={classes.container}>
        {classBasedEmblems.map((item: TGroupedEmblems) => {
          return (
            <Grid item className={classes.itemContainer}>
              <Grid style={{ color: "white", border: "1px solid white" }}>
                <Grid container alignItems={"center"} justifyContent="center">
                  <img
                    className={classes.imageContent}
                    src={CLASS_ICON_MAPPING[item.name]}
                    alt={item.name}
                  />
                  <Typography
                    variant="h5"
                    style={{ marginLeft: 20, fontWeight: "bold" }}
                  >
                    {item.name} Emblems
                  </Typography>
                </Grid>
                <Grid style={{ padding: 8 }}>
                  {item.emblems.map((el: any) => {
                    return (
                      <Grid
                        container
                        flexWrap={"nowrap"}
                        style={{
                          padding: 8,
                          border: "1px solid white",
                          margin: "8px 0px",
                        }}
                      >
                        <img
                          style={{
                            height: 60,
                            width: 60,
                            border: "1px solid white",
                          }}
                          src={el.icon}
                          alt={el.name}
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
                            <Typography
                              variant="h6"
                              style={{ fontWeight: "bold" }}
                            >
                              {el.name}
                            </Typography>
                            <Typography style={{ marginLeft: 8 }}>
                              (Slot: {el.slot})
                            </Typography>
                          </Grid>
                          <Typography>{el.detail_1}</Typography>
                          {el.detail_2 ? (
                            <Typography>{el.detail_2}</Typography>
                          ) : null}
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </HeroPaper>
  );
};
export default Emblems;
