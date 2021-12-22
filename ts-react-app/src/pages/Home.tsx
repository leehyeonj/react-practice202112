import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Incomplete from "./Incomplete";
import Receiving from "./Receiving";
import AgGrid from "./AgGrid";
import ReactTableKitchenSink from "./ReactTableKitchenSink";
import RecoilPrc from "./RecoilPrc";
import MaterialTableEx from "./MaterialTable";
import AgGridEdit from "./AgGridEdit";
import AgGrouping from "./AgGrouping";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="mui-data grid" {...a11yProps(0)} />
          <Tab label="react-table" {...a11yProps(1)} />
          <Tab label="ag-grid" {...a11yProps(2)} />
          <Tab label="material-table" {...a11yProps(3)} />
          <Tab label="recoil" {...a11yProps(4)} />
          <Tab label="ag group" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Incomplete />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Receiving />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AgGrid />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MaterialTableEx />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <RecoilPrc />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AgGrouping />
      </TabPanel>
    </Box>
  );
}
