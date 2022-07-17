import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Card, Paper } from "@material-ui/core";
import { modeaction } from "../store/darkmode";
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 50,
    height: 30,
    padding: 3,
    display: "flex",
  },
  switchBase: {
    padding: 6,
    // color: theme.palette.grey[500],
    color: "teal",

    "&$checked": {
      transform: "translateX(20px)",
      //   color: theme.palette.common.white,
      color: "teal",
      "& + $track": {
        opacity: 1,
        backgroundColor: "black",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,

    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 100 / 1,
    opacity: 1,
    backgroundColor: "white",
  },
  checked: {},
}))(Switch);

export default function Dark_mode() {
  const data = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    
    dispatch(modeaction.modehandler())
  };

  return (
    <Paper>
      <FormGroup style={{ padding: "10px" }}>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <AntSwitch
                checked={data.mode}
                onChange={handleChange}
                name="checkedC"
              />
            </Grid>
          </Grid>
        </Typography>
      </FormGroup>
    </Paper>
  );
}
