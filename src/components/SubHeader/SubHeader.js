import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import styles from "./SubHeader.styles.js";

const shortDate = (date) => date && new Date(date).toISOString().slice(0, 10);

const SubHeader = ({
  classes,
  titleText,
  startDate,
  endDate,
  isEdit,
  onEdit,
}) => {
  const [projectData, setProjectData] = useState({
    title: titleText || "",
    beginDate: shortDate(startDate) || "",
    expirationDate: shortDate(endDate) || "",
  });

  const { title, beginDate, expirationDate } = projectData;

  const handleEdit = React.useCallback(() => {
    onEdit(projectData);
  }, [onEdit, projectData]);

  const handleChange = React.useCallback(
    (newData) => setProjectData((previus) => ({ ...previus, ...newData })),
    []
  );

  if (isEdit) {
    return (
      <Box m={1}>
        <Box display="flex" alignItems="center">
          Project name:
          <TextField
            onChange={(e) => handleChange({ title: e.target.value })}
            type="text"
            id="text"
            defaultValue={title}
          />
        </Box>
        <Box display="flex" alignItems="center">
          Date range from:
          <TextField
            onChange={(e) => handleChange({ beginDate: e.target.value })}
            type="date"
            id="date"
            defaultValue={beginDate}
          />
        </Box>
        <Box display="flex" alignItems="center">
          Date range to:
          <TextField
            onChange={(e) => handleChange({ expirationDate: e.target.value })}
            type="date"
            id="date"
            defaultValue={expirationDate}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleEdit}
        >
          Save
        </Button>
      </Box>
    );
  }

  return (
    <Box m={1}>
      <Typography variant="h5">{title}</Typography>
      {beginDate && (
        <Typography component="p">{`Date range from: ${beginDate}`}</Typography>
      )}
      {expirationDate && (
        <Typography component="p">{`Date range to: ${expirationDate}`}</Typography>
      )}
    </Box>
  );
};

export default withStyles(styles)(SubHeader);
