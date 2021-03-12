import React from "react";
import { withStyles } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "./List.styles.js";

const List = ({ classes, list, text }) => {
  if (!list.length) return null;

  return (
    <>
      <ListSubheader classes={{ root: classes.root }}>{text}</ListSubheader>
      {list.map((item) => {
        const listTextContent =
          item.firstName && item.lastName
            ? `${item.firstName} ${item.lastName}`
            : item.serialNumber || "unknown";

        return (
          <li
            key={`${listTextContent}-${item.projectId}`}
            className={classes.listSection}
          >
            <ul className={classes.ul}>
              <ListItem>
                <ListItemText primary={listTextContent} />
              </ListItem>
            </ul>
          </li>
        );
      })}
    </>
  );
};

export default withStyles(styles)(List);
