import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

const About = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ maxWidth: 800, margin: "0 auto", boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ bgcolor: "#00003f", width: 56, height: 56 }}>
                <InfoIcon fontSize="large" />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                About This Project
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Hey there! Welcome to MyTasks.com. This is a simple task
                management app I've put together to showcase various
                integrations and demo my skills in infrastructure development.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                It's not just about managing tasks—I've designed it to integrate
                with some cool third-party services, making it a great
                playground for testing and demonstrating how different systems
                can work together.
              </Typography>
              <Typography variant="body1">
                So, if you're here to check out some integration magic or just
                to see what a solo developer can whip up, you're in the right
                place. Thanks for stopping by and enjoy exploring MyTasks.com!
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
