import * as React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import AgGrid from "./pages/AgGrid";
import Dealibird from "./pages/Dealibird";
import SlotMachine from "./pages/SlotMachine";
import CellRendering from "./pages/CellRendering";
import NivoPie from "./pages/NivoPie";
import Emotion from "./pages/Emotion";
import SideMenu from "./pages/SideMenu";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  const data = [
    {
      id: "php",
      label: "php",
      value: 397,
      color: "hsl(118, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 388,
      color: "hsl(241, 70%, 50%)",
    },
    {
      id: "scala",
      label: "scala",
      value: 311,
      color: "hsl(213, 70%, 50%)",
    },
    {
      id: "python",
      label: "python",
      value: 561,
      color: "hsl(1, 70%, 50%)",
    },
    {
      id: "hack",
      label: "hack",
      value: 590,
      color: "hsl(197, 70%, 50%)",
    },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: 1000, bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          <Tab label="demo" />
          <Tab label="재고 조회" />
          <Tab label="slot machine" />
          <Tab label="cell render" />
          <Tab label="Nivo pie" />
          <Tab label="emotion" />
          <Tab label="Item Seven" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AgGrid />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Dealibird />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SlotMachine />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CellRendering />
      </TabPanel>
      <TabPanel value={value} index={4}>
        {/* <NivoPie data={data} /> */}
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Emotion />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <SideMenu />
      </TabPanel>
    </>
  );
}

export default App;
