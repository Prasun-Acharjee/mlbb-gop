import {
  Paper,
  Grid,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { HeroPaper, TierItemContainer } from "./style";
import ASSASSION_ICON from "../../Assets/HeroClassIcon/Assassin_Icon.webp";
import FIGHTER_ICON from "../../Assets/HeroClassIcon/Fighter_Icon.webp";
import MAGE_ICON from "../../Assets/HeroClassIcon/Mage_Icon.webp";
import MARKS_ICON from "../../Assets/HeroClassIcon/Marksman_Icon.webp";
import SUPPORT_ICON from "../../Assets/HeroClassIcon/Support_Icon.webp";
import TANK_ICON from "../../Assets/HeroClassIcon/Tank_Icon.webp";
import EXP_LANE_ICON from "../../Assets/LaneIcon/ExpLane.png";
import GOLD_LANE_ICON from "../../Assets/LaneIcon/GoldLane.png";
import JUNGLE_ICON from "../../Assets/LaneIcon/Jungle.png";
import MID_LANE_ICON from "../../Assets/LaneIcon/MidLane.png";
import ROAM_ICON from "../../Assets/LaneIcon/Roam.png";

const laneList = ["EXP", "Gold", "Jungle", "Mid", "Roam"];

export const HERO_TYPE_ICON_LIST: any = {
  type_1: TANK_ICON,
  type_2: FIGHTER_ICON,
  type_3: ASSASSION_ICON,
  type_4: MAGE_ICON,
  type_5: MARKS_ICON,
  type_6: SUPPORT_ICON,
};

export const LANE_ICON_LIST: any = {
  Roam: ROAM_ICON,
  EXP: EXP_LANE_ICON,
  Gold: GOLD_LANE_ICON,
  Jungle: JUNGLE_ICON,
  Mid: MID_LANE_ICON,
};

export const LANE_LOGIC: any = {
  Tank: "Roam",
  Fighter: "EXP",
  Assassin: "Jungle",
  Mage: "Mid",
  Marksman: "Gold",
  Support: "Roam",
};

const TierList = {
  overpowered: {
    name: "Overpowered",
    value: 10,
    color: "#80FE7F",
  },
  strong: {
    name: "Strong",
    value: 15,
    color: "#C0FC7F",
  },
  good: {
    name: "Good",
    value: 15,
    color: "#FFFA7F",
  },
  average: {
    name: "Average",
    value: 30,
    color: "#FFBF7F",
  },
  belowAverage: {
    name: "Below Average",
    value: 20,
    color: "#FF7F7F",
  },
  bad: {
    name: "Bad",
    value: 10,
    color: "#EF534F",
  },
};

const Heros = () => {
  const [rank, setRank] = useState("0");
  const [selectedHeroType, setSelectedHeroType] = useState("type_0");
  const [selectedLane, setSelectedLane] = useState(null);
  const navigate = useNavigate();
  const getRankData = (rank: any) => {
    const apiUrl = "https://api.mobilelegends.com/m/hero/list";

    const formData = new FormData();
    formData.append("lang", "en");
    formData.append("language", "en");
    formData.append("type", rank);
    return fetch(apiUrl, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };
  const { mutate, data, isLoading, isError, error } = useMutation({
    mutationKey: "getHeroList",
    mutationFn: (rank: any) => {
      return getRankData(rank);
    },
  });

  useEffect(() => {
    mutate(rank);
  }, [mutate, rank]);

  const getNumber = (str: any) => {
    const strArr = str.split("");
    strArr.pop();
    return Number(strArr.join(""));
  };

  const heroTypeData = useMemo(() => {
    if (data?.data?.channel_data) {
      return data?.data?.channel_data?.map((item: any) => {
        return { label: item.label, type: `type_${item.id}` };
      });
    }
    return [];
  }, [data?.data]);

  const initialDataSet = useMemo(() => {
    let maxScore = 0;
    if (data?.data?.hero_data) {
      const dataSet = data?.data?.hero_data;
      const newData = dataSet?.type_0
        ?.map((item: any) => {
          const score =
            0.2 * getNumber(item?.rank_data?.ban) +
            0.2 * getNumber(item?.rank_data?.use) +
            0.6 * getNumber(item?.rank_data?.win);
          maxScore = score > maxScore ? score : maxScore;
          return {
            ...item,
            score,
          };
        })
        .filter((item: any) => !!item)
        .sort((a: any, b: any) => b.score - a.score);

      return newData.map((item: any) => ({
        ...item,
        score: (item.score / maxScore) * 100,
      }));
    }

    return [];
  }, [data?.data]);

  const updatedData = useMemo(() => {
    const allHerosData = data?.data?.hero_data;
    if (initialDataSet && heroTypeData && allHerosData) {
      const selectedIds: any[] = [];
      Object.keys(allHerosData).forEach((key: any) => {
        if (key !== "type_0") {
          const newDataSetItem = allHerosData[selectedHeroType];
          selectedIds.push(...newDataSetItem.map((el: any) => el.id));
        } else {
          return allHerosData.type_0.map((el: any) => el.id);
        }
      });
      return initialDataSet
        ?.map((item: any) => ({
          ...item,
          isShow: selectedIds.includes(item.id),
        }))
        ?.map((item: any) => {
          let heroTypes: any[] = [];
          if (selectedHeroType) {
            Object.keys(allHerosData).forEach((key: any) => {
              if (key !== "type_0") {
                const newDataSetItem = allHerosData[key];
                const newData = newDataSetItem.find(
                  (el: any) => el.id === item.id
                );
                if (newData?.id) {
                  heroTypes.push(
                    heroTypeData.find((el: any) => el.type === key)?.label
                  );
                }
              }
            });
          }

          const possibleLanes = heroTypes.map((hero: any) => LANE_LOGIC[hero]);
          console.log(possibleLanes, heroTypes);
          if (selectedLane) {
            if (possibleLanes.includes(selectedLane)) {
              return {
                ...item,
                heroTypes,
                heroLanes: possibleLanes,
              };
            } else {
              return null;
            }
          } else {
            return {
              ...item,
              heroTypes,
              heroLanes: possibleLanes,
            };
          }
        })
        .filter((item: any) => !!item)
        .sort((a: any, b: any) => b.score - a.score);
    }

    return [];
  }, [
    data?.data,
    heroTypeData,
    initialDataSet,
    selectedLane,
    selectedHeroType,
  ]);

  const removeItems = (array: any, itemToRemove: any) => {
    return array.filter((v: any) => {
      return !itemToRemove.includes(v);
    });
  };

  const tierlistData = useMemo(() => {
    let newData = [...updatedData];
    if (updatedData.length) {
      return Object.keys(TierList).map((key: any) => {
        //@ts-ignore
        const item = TierList[key];
        const indexPercent = Math.ceil(updatedData.length * (item.value / 100));
        const filteredData = newData.slice(0, indexPercent);
        newData = [...removeItems(newData, filteredData)];
        return {
          name: item.name,
          color: item.color,
          data: filteredData,
        };
      });
    }
    return [];
  }, [updatedData]);

  console.log("selectedHeroType", selectedHeroType, tierlistData);

  const naviageToHeroPage = (id: any) => {
    console.log(id);
    navigate(`${id}`);
  };

  return (
    <HeroPaper>
      <Grid container flexDirection="column">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ padding: 15 }}
        >
          <Typography style={{ color: "white" }}>Rank</Typography>
          <Button
            style={{
              marginLeft: 10,
              background: rank === "0" ? "#C7A600" : "#1976d2",
            }}
            onClick={() => setRank("0")}
            variant="contained"
          >
            All
          </Button>
          <Button
            style={{
              marginLeft: 10,
              background: rank === "1" ? "#C7A600" : "#1976d2",
            }}
            onClick={() => setRank("1")}
            variant="contained"
          >
            Mythic +
          </Button>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          style={{ padding: 15 }}
        >
          <Typography style={{ color: "white" }}>Class</Typography>
          <Grid item>
            <Button
              style={{
                marginLeft: 10,
                background:
                  selectedHeroType === "type_0" ? "#C7A600" : "#1976d2",
              }}
              onClick={() => setSelectedHeroType("type_0")}
              variant="contained"
            >
              All
            </Button>
          </Grid>

          {heroTypeData?.map((item: any) => {
            return (
              <Grid item>
                <Button
                  style={{
                    marginLeft: 10,
                    background:
                      selectedHeroType === item.type ? "#C7A600" : "#1976d2",
                  }}
                  onClick={() => setSelectedHeroType(item.type)}
                  variant="contained"
                >
                  <Grid container>
                    <img
                      src={HERO_TYPE_ICON_LIST[item.type]}
                      alt={item.type}
                      style={{ marginRight: 8 }}
                    />
                    {item.label}
                  </Grid>
                </Button>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          style={{ padding: 15 }}
        >
          <Typography style={{ color: "white" }}>Lane</Typography>
          <Grid item>
            <Button
              style={{
                marginLeft: 10,
                background: selectedLane === null ? "#C7A600" : "#1976d2",
              }}
              onClick={() => setSelectedLane(null)}
              variant="contained"
            >
              All
            </Button>
          </Grid>
          {laneList.map((item: any) => {
            return (
              <Grid item>
                <Button
                  style={{
                    marginLeft: 10,
                    background: selectedLane === item ? "#C7A600" : "#1976d2",
                  }}
                  onClick={() => setSelectedLane(item)}
                  variant="contained"
                >
                  <Grid container>
                    <img
                      src={LANE_ICON_LIST[item]}
                      alt={item}
                      style={{ marginRight: 8, height: 25, width: 25 }}
                    />
                    {item}
                  </Grid>
                </Button>
              </Grid>
            );
          })}
        </Grid>
        {isLoading ? (
          <>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        ) : (
          <Grid>
            {tierlistData.map((item) => {
              if (item.data.filter((item) => !!item.isShow)?.length) {
                return (
                  <TierItemContainer>
                    <Typography
                      variant="h5"
                      style={{
                        fontWeight: "bolder",
                        marginBottom: 20,
                        padding: "15px",
                        background: "#28282B",
                        borderTopRightRadius: 8,
                        borderTopLeftRadius: 8,
                        color: item.color,
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Grid
                      container
                      gap={5}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 25,
                      }}
                    >
                      {item.data
                        .filter((item) => !!item.isShow)
                        .map((el) => {
                          return (
                            <Grid
                              item
                              style={{ cursor: "pointer" }}
                              onClick={() => naviageToHeroPage(el.id)}
                            >
                              <Grid
                                container
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <img
                                  src={el.avatar}
                                  alt={el.id}
                                  style={{
                                    height: 70,
                                    width: 70,
                                    borderRadius: "50%",
                                  }}
                                />
                                <Typography>{el.name}</Typography>
                                <Typography>{el.score.toFixed(2)}</Typography>
                              </Grid>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </TierItemContainer>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        )}
      </Grid>
    </HeroPaper>
  );
};

export default Heros;
