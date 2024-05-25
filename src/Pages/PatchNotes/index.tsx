import { Grid, Typography } from "@mui/material";
import React from "react";
import { HeroPaper } from "../Heros/style";
import { useStyles } from "./style";

const patchNotesData = [
  {
    name: "Patch 1.8.60 Update",
    image:
      "https://i0.wp.com/gamingonphone.com/wp-content/uploads/2022/03/Mobile-Legends-Masha-Game-Cover-MLBB.jpg",
    redirect:
      "https://gamingonphone.com/news/mobile-legends-patch-1-8-60-update-hero-adjustments-new-events/",
  },
  {
    name: "Patch 1.8.58 Update",
    image:
      "https://i0.wp.com/gamingonphone.com/wp-content/uploads/2022/02/Helcurt-Mobile-Legends-MLBB-Guide-Cover.jpg",
    redirect:
      "https://gamingonphone.com/news/mobile-legends-patch-1-8-58-update-revamped-helcurt-hero-adjustments/",
  },
  {
    redirect:
      "https://gamingonphone.com/news/mobile-legends-patch-1-8-54-update-hero-battlefield-adjustments-and-more/",
    image:
      "https://i0.wp.com/gamingonphone.com/wp-content/uploads/2024/01/Mobile-Legends-Chip-Game-News-Guide-Cover.jpg",
    name: "Patch 1.8.54 Update",
  },
  {
    redirect:
      "https://gamingonphone.com/news/mobile-legends-patch-1-8-52-update-hero-battlefield-adjustments/",
    image:
      "https://i0.wp.com/gamingonphone.com/wp-content/uploads/2020/03/ml-hayabusa.jpg",
    name: "Patch 1.8.52 Update",
  },
  {
    redirect:
      "https://gamingonphone.com/news/mobile-legends-patch-1-8-52-update-hero-battlefield-adjustments/",
    image:
      "https://i0.wp.com/gamingonphone.com/wp-content/uploads/2020/03/ml-hayabusa.jpg",
    name: "Patch 1.8.52 Update",
  },
];
const PatchNotes = () => {
  const classes = useStyles();
  return (
    <HeroPaper>
      <Grid style={{ padding: 32 }}>
        <Typography style={{ color: "white", marginBottom: 32 }} variant="h3">
          Patch Notes
        </Typography>
        <Grid container spacing={3}>
          {patchNotesData.map((item) => {
            return (
              <Grid item>
                <a
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  href={item.redirect}
                  rel="noreferrer"
                >
                  <Typography
                    variant="h5"
                    style={{ color: "white", marginBottom: 12 }}
                  >
                    <strong>{item.name}</strong>
                  </Typography>
                  <img
                    className={classes.imageContent}
                    src={item.image}
                    alt={item.name}
                  />
                </a>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </HeroPaper>
  );
};

export default PatchNotes;
