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
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import parse from "html-react-parser";
import {
  HeroPaper,
  Container,
  useStyles,
  HeroDataItem,
  Item,
  HeroItems,
  EquipmentText,
  BuildHeader,
} from "./style";
import {
  HERO_TYPE_ICON_LIST,
  LANE_ICON_LIST,
  LANE_LOGIC,
} from "../Heros/index";
import COIN from "../../Assets/Logos/coin.png";
import DIAMOND from "../../Assets/Logos/diamond.png";

//alive -> ability_effect
// mag -> durability
// diff -> difficulty
// phy -> Offense

//tabs -> Guide, Story, Skins

type ChampionType = {
  Mage: string;
  Support: string;
  Tank: string;
  Fighter: string;
  Assassin: string;
  Marksman: string;
  [key: string]: string;
};

export const ClassToTypeMapping: ChampionType = {
  Mage: "type_4",
  Support: "type_6",
  Tank: "type_1",
  Fighter: "type_2",
  Assassin: "type_3",
  Marksman: "type_5",
};

const passivesArr = ["First", "Second", "Third", "Passive"];
export const boxShadow =
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
    <Grid container flexWrap={"wrap"} style={{ margin: "10px 0px" }}>
      <Typography style={{ marginRight: 10, width: 100 }}>{name}</Typography>
      <Grid container style={{ width: "100%", maxWidth: 250, height: 20 }}>
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

  const heroType: string = String(objData?.type);

  return (
    <HeroPaper style={{ marginTop: 60 }}>
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
          // flexDirection="column"
        >
          <img
            src={objData?.cover_picture}
            className={classes.imageContent}
            alt="hero_banner"
          />
          <HeroItems>
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
            <Box style={{ width: "100%", marginTop: 30 }}>
              <Grid container xs={12} gap={2}>
                <Grid
                  item
                  container
                  gap={2}
                  justifyContent="space-between"
                  xs={12}
                >
                  <HeroDataItem item flex={0.8}>
                    <Item>
                      <Typography>Class</Typography>
                      <Grid>
                        <img
                          style={{ height: 30, width: 30 }}
                          alt={objData?.type}
                          src={
                            HERO_TYPE_ICON_LIST[ClassToTypeMapping[heroType]]
                          }
                        />
                      </Grid>
                    </Item>
                  </HeroDataItem>
                  <HeroDataItem item flex={0.8}>
                    <Item>
                      <Typography>Lane</Typography>
                      <Grid>
                        <img
                          style={{ height: 30, width: 30 }}
                          alt={objData?.type}
                          src={LANE_ICON_LIST[LANE_LOGIC[heroType]]}
                        />
                      </Grid>
                    </Item>
                  </HeroDataItem>
                </Grid>
                <Grid item gap={2} container xs={12}>
                  <HeroDataItem item flex={0.8}>
                    <Item>
                      <Typography>Speciality</Typography>

                      <Typography style={{ marginTop: 10 }}>
                        Crowd Control
                      </Typography>
                    </Item>
                  </HeroDataItem>
                  <HeroDataItem item flex={0.8}>
                    <Item>
                      <Typography>Price</Typography>
                      <Grid>
                        <Typography>
                          <img
                            style={{ marginRight: 5 }}
                            alt="coin"
                            src={COIN}
                          />
                          32000
                        </Typography>
                        <Typography>
                          <img
                            style={{ marginRight: 5 }}
                            alt="diamond"
                            src={DIAMOND}
                          />{" "}
                          599
                        </Typography>
                      </Grid>
                    </Item>
                  </HeroDataItem>
                </Grid>
              </Grid>
            </Box>
          </HeroItems>
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
          <Tab
            style={{ color: "white" }}
            classes={{ selected: classes.selectedTab }}
            value={5}
            label="Wiki"
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
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
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
                            <BuildHeader>
                              <strong>Default Build</strong>
                            </BuildHeader>
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
                                      <EquipmentText>
                                        {item.equip.name}
                                      </EquipmentText>
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
                            <BuildHeader style={{ fontWeight: "bold" }}>
                              Our Suggestion
                            </BuildHeader>
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
                                      <EquipmentText>
                                        {item.equip.name}
                                      </EquipmentText>
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
                            <BuildHeader style={{ fontWeight: "bold" }}>
                              Pro Build
                            </BuildHeader>
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
                                      <EquipmentText>
                                        {item.equip.name}
                                      </EquipmentText>
                                    </Grid>
                                  </TableCell>
                                );
                              })
                            : null}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Button variant="contained">
                  Create and Share your own build!
                </Button>
              </Grid>
              <Grid>
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: "bold",
                    marginTop: "30px",
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  Skills
                </Typography>
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
            <Grid
              container
              justifyContent={"center"}
              style={{ margin: "30px 0px" }}
            >
              <Typography variant="h5">Coming soon!</Typography>
            </Grid>
          ) : currentTab === 3 ? (
            <Grid
              container
              justifyContent={"center"}
              style={{ margin: "30px 0px" }}
            >
              <Typography variant="h5">Coming soon!</Typography>
            </Grid>
          ) : currentTab === 4 ? (
            <Grid
              container
              justifyContent={"center"}
              style={{ margin: "30px 0px" }}
            >
              <Typography variant="h5">Coming soon!</Typography>
            </Grid>
          ) : currentTab === 5 ? (
            <Grid
              container
              justifyContent={"center"}
              style={{ margin: "30px 0px" }}
            >
              <Typography variant="h5">Coming soon!</Typography>
            </Grid>
          ) : null}
        </Container>
      </Grid>
    </HeroPaper>
  );
};

export default HeroPage;
