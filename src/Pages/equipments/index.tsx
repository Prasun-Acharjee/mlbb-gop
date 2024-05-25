import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useStyles } from "./style";
import { EQUIPMENT_IMAGE_MAPPING } from "./constants";
import { HeroPaper } from "../HeroPage/style";
import COIN_IMG from "../../Assets/Logos/coin.png";

const Equipments = () => {
  const classes = useStyles();
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("Attack");
  useEffect(() => {
    fetch("http://localhost:8080/index.php?api_path=get_equipments", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((result: any) => {
        setEquipments(result);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }, []);

  const sortedEquipments = useMemo(() => {
    if (equipments.length) {
      const sortedEquipments = equipments.reduce((acc, curr: any) => {
        const accIndex = acc.findIndex((item: any) => item.name === curr.type);
        if (accIndex !== -1) {
          acc[accIndex].equipments.push({
            ...curr,
            icon: EQUIPMENT_IMAGE_MAPPING[curr.name],
          });
        } else {
          acc.push({
            name: curr.type,
            equipments: [{ ...curr, icon: EQUIPMENT_IMAGE_MAPPING[curr.name] }],
          });
        }
        return acc;
      }, [] as any);
      return sortedEquipments;
    }
    return [];
  }, [equipments]);

  console.log("equipments", sortedEquipments);

  return (
    <HeroPaper style={{ marginTop: 60 }}>
      <Grid>
        <Grid container justifyContent="center" style={{ margin: "40px 0px" }}>
          {sortedEquipments.map((item: any) => {
            return (
              <Button
                variant="contained"
                key={item.name}
                style={{
                  margin: "0px 20px",
                  backgroundColor:
                    item.name === selectedEquipment
                      ? "rgb(199, 166, 0)"
                      : "#1976d2",
                }}
                onClick={() => setSelectedEquipment(item.name)}
              >
                {item.name}
              </Button>
            );
          })}
        </Grid>

        <Grid container xs={12} wrap="wrap">
          {sortedEquipments
            ?.find((item: any) => item.name === selectedEquipment)
            ?.equipments?.map((el: any) => {
              return (
                <Grid item md={2} xs={6} style={{ marginBottom: 28 }}>
                  <img
                    src={el.icon}
                    alt={el.name}
                    style={{ height: 70, width: 70 }}
                  />
                  <Grid style={{ color: "white" }}>
                    <Typography variant="h6">
                      <strong>{el.name}</strong>
                    </Typography>
                    <Typography
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Price: {el.price}{" "}
                      <img
                        src={COIN_IMG}
                        alt="coin-img"
                        style={{ marginLeft: 8 }}
                      />
                    </Typography>
                    <Typography variant="body2">{el.description}</Typography>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </HeroPaper>
  );
};

export default Equipments;
