import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobList from "./JobList";
import Synchronization from "./Synchronization";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

export default function Main() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Job List"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to="/joblist">
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Synchronization"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to="/synchronization">
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <div>
        {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ height: 64, width: "100%", display:'flex' }}>
            <IconButton onClick={toggleDrawer(true)} sx={{color:'black',fontSize:65}}>            
              <MenuIcon />
            </IconButton>
          </Box>
          <Divider/>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <Routes>
              <Route path="/joblist" element={<JobList />} />
              <Route path="/synchronization" element={<Synchronization />} />
              <Route
                path="/"
                element={<div>Select an option from the drawer.</div>}
              />
            </Routes>
          </Box>
        </Box>
      </div>
    </Router>
  );
}
