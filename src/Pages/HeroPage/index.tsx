import React, { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import parse from "html-react-parser";
import { HeroPaper, Container, useStyles } from "./style";
//alive -> ability_effect
// mag -> durability
// diff -> difficulty
// phy -> Offense

//tabs -> Guide, Story, Skins
const passivesArr = ["First", "Second", "Third", "Passive"];
const boxShadow =
  "inset 0 0 0.5px 1px hsla(0, 0%,  100%, 0.075),0 0 0 1px hsla(0, 0%, 0%, 0.05) 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)";
const BarItem = ({
  value,
  color,
  name,
}: {
  value: any;
  color: any;
  name: any;
}) => {
  return (
    <Grid container style={{ margin: "10px 0px" }}>
      <Typography style={{ marginRight: 10, flex: 0.6 }}>{name}</Typography>
      <Grid container flex={1.5} style={{ width: 200 }}>
        <Grid style={{ width: `${value}%`, background: color }} />
        <Grid style={{ width: `${100 - value}%`, background: "grey" }} />
      </Grid>

      <Grid />
    </Grid>
  );
};
const HeroPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(1);

  const getHeroData = (id: any) => {
    const apiUrl = `https://mapi.mobilelegends.com/hero/detail?id=${id}&language=en`;

    return fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  };

  const { data, isLoading } = useQuery(["getHeroData", id], () =>
    getHeroData(id)
  );

  const objData = useMemo(() => {
    if (data?.contents) {
      return JSON.parse(data.contents)?.data;
    }
    return {};
  }, [data]);

  console.log("heroData", objData, id);

  return (
    <HeroPaper>
      <Grid
        style={{
          //   background: "white",
          maxWidth: 1200,
          width: "90%",
          margin: "0px auto",
        }}
      >
        <Container
          container
          gap={4}
          style={{
            height: 440,
            padding: 20,
            borderRadius: 8,
            boxShadow: boxShadow,
          }}
        >
          <img
            src={objData?.cover_picture}
            style={{ flex: 1.2, objectFit: "cover" }}
            alt="hero_banner"
          />
          <Grid item flex={0.8}>
            <Typography variant="h3" style={{ fontWeight: "bolder" }}>
              {objData?.name}
            </Typography>

            <Grid style={{ marginTop: 20 }}>
              <BarItem
                color={"rgb(246, 200, 0)"}
                name="Durability"
                value={objData?.mag}
              />
              <BarItem
                color={"rgb(255, 153, 0)"}
                name="Offense"
                value={objData?.phy}
              />
              <BarItem
                color={"rgb(0, 148, 225)"}
                name="Ability Effect"
                value={objData?.alive}
              />
              <BarItem
                color={"rgb(0, 214, 108)"}
                name="Difficulity"
                value={objData?.diff}
              />
            </Grid>
            <Typography style={{ fontWeight: "bold" }}>
              Class: {objData?.type}
            </Typography>
            <Typography style={{ fontWeight: "bold" }}>Lane: Gold</Typography>
            <Typography style={{ fontWeight: "bold" }}>
              Specialities: Crowd Control
            </Typography>
            <Typography style={{ fontWeight: "bold" }}>
              Price: 32000 Gold / 599 Diamonds
            </Typography>
          </Grid>
        </Container>
        <Tabs
          value={currentTab}
          classes={{
            indicator: classes.indicatorBar,
            root: classes.rootContainer,
          }}
          onChange={(e, value) => setCurrentTab(value)}
          style={{ background: "transparent", marginTop: 40 }}
          aria-label="secondary tabs example"
        >
          <Tab
            style={{ color: "white" }}
            classes={{ selected: classes.selectedTab }}
            value={1}
            label="Guide"
          />
          <Tab
            style={{ color: "white" }}
            classes={{ selected: classes.selectedTab }}
            value={2}
            label="Story"
          />
          <Tab
            style={{ color: "white" }}
            classes={{ selected: classes.selectedTab }}
            value={3}
            label="Skins"
          />
          <Tab
            style={{ color: "white" }}
            classes={{ selected: classes.selectedTab }}
            value={4}
            label="Videos"
          />
        </Tabs>
        <Container
          container
          gap={4}
          style={{
            minHeight: 200,
            padding: 20,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderTopRightRadius: 8,
            boxShadow: boxShadow,
          }}
        >
          {currentTab === 1 ? (
            <>
              <Grid container flexDirection="column">
                <Typography>Build</Typography>
                <Grid container>
                  <Table>
                    <TableBody>
                      <TableRow
                        style={{
                          borderBottom: "2px solid #10243c",
                        }}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Typography style={{ fontWeight: "bold" }}>
                            Default Build
                          </Typography>
                        </TableCell>
                        {objData?.gear?.out_pack
                          ? objData?.gear?.out_pack?.map((item: any) => {
                              return (
                                <TableCell>
                                  <Grid
                                    container
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <img
                                      alt="icon"
                                      style={{ height: 50, width: 50 }}
                                      src={item.equip.icon}
                                    />
                                    <Typography
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      {item.equip.name}
                                    </Typography>
                                  </Grid>
                                </TableCell>
                              );
                            })
                          : null}
                      </TableRow>
                      <TableRow
                        style={{ borderBottom: "2px solid #10243c" }}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Typography style={{ fontWeight: "bold" }}>
                            Our Suggestion
                          </Typography>
                        </TableCell>
                        {objData?.gear?.out_pack
                          ? objData?.gear?.out_pack?.map((item: any) => {
                              return (
                                <TableCell>
                                  <Grid
                                    container
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <img
                                      alt="icon"
                                      style={{ height: 50, width: 50 }}
                                      src={item.equip.icon}
                                    />
                                    <Typography
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      {item.equip.name}
                                    </Typography>
                                  </Grid>
                                </TableCell>
                              );
                            })
                          : null}
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Typography style={{ fontWeight: "bold" }}>
                            Pro Build
                          </Typography>
                        </TableCell>
                        {objData?.gear?.out_pack
                          ? objData?.gear?.out_pack?.map((item: any) => {
                              return (
                                <TableCell>
                                  <Grid
                                    container
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <img
                                      alt="icon"
                                      style={{ height: 50, width: 50 }}
                                      src={item.equip.icon}
                                    />
                                    <Typography style={{ textAlign: "center" }}>
                                      {item.equip.name}
                                    </Typography>
                                  </Grid>
                                </TableCell>
                              );
                            })
                          : null}
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Button variant="contained">
                  Create and Share your own build!
                </Button>
              </Grid>
              <Grid>
                <Typography>Skills</Typography>
                <Grid container>
                  {objData?.skill?.skill
                    ? objData?.skill?.skill.map((item: any) => {
                        return (
                          <Grid
                            container
                            style={{
                              padding: 10,
                              margin: "6px 0px",
                              paddingBottom: 20,
                              borderBottom: "2px solid grey",
                            }}
                          >
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="center"
                              style={{ marginBottom: 15 }}
                            >
                              <img
                                alt="icon"
                                style={{ height: 50, width: 50 }}
                                src={item.icon}
                              />
                              <Typography
                                variant="h6"
                                style={{ marginLeft: 10, fontWeight: "bold" }}
                              >
                                {item.name}
                              </Typography>
                            </Grid>
                            <Typography>
                              {parse(
                                item.des
                                  .replaceAll("font", "span")
                                  .replaceAll("color='", `style='color:`)
                              )}
                            </Typography>
                            <Typography>{item.tip}</Typography>
                          </Grid>
                        );
                      })
                    : null}
                </Grid>
              </Grid>
            </>
          ) : currentTab === 2 ? (
            <>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </>
          ) : currentTab === 3 ? (
            <>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </>
          ) : null}
        </Container>
      </Grid>
    </HeroPaper>
  );
};

export default HeroPage;
