import React from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import styles from "./Button.styles.js";

const ButtonComponent = ({
  classes,
  handleClick,
  text,
  index,
  icon,
  isEdit,
}) => {
  const handleClickButton = React.useCallback(() => {
    handleClick(index);
  }, [handleClick, index]);

  return (
    <Button
      className={classes.root}
      startIcon={icon}
      variant="contained"
      color="primary"
      onClick={handleClickButton}
      disabled={isEdit}
    >
      {text}
    </Button>
  );
};

export default withStyles(styles)(ButtonComponent);
