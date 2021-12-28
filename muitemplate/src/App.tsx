import * as React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import AgGrid from "./pages/AgGrid";
import Dealibird from "./pages/Dealibird";
import SlotMachine from "./pages/SlotMachine";
import CellRendering from "./pages/CellRendering";

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
          <Tab label="practice" />
          <Tab label="재고 조회" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
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
    </>
  );
}

export default App;
