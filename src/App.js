import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import SubHeader from "./components/SubHeader/SubHeader";
import ListComponent from "./components/List/List";
import Button from "./components/Button/Button";
import device from "./mock-api/device.json";
import project from "./mock-api/project.json";
import user from "./mock-api/user.json";

import styles from "./App.styles.js";

const TIMEOUT_TIME = 500;

const App = ({ classes }) => {
  const [pooledProjectArr, setPooledArr] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    (async () => {
      setLoaded(true);
      try {
        const [devices, projects, users] = await Promise.all([
          fakeFetch(device),
          fakeFetch(project),
          fakeFetch(user),
        ]);
        setPooledArr(mergeArraysInfo(devices, projects, users));
      } catch (err) {
        console.error(err);
      } finally {
        setLoaded(false);
      }
    })();
  }, []);

  const mergeArraysInfo = (devices, projects, users) => {
    return projects.reduce((acc, item, i) => {
      acc[i] = {
        ...item,
        users: users.filter((el) => item.id === el.projectId),
        devices: devices.filter((el) => item.id === el.projectId),
      };

      return acc;
    }, []);
  };

  const fakeFetch = (val) => {
    const saveVal = val;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(saveVal);
      }, TIMEOUT_TIME);
    });
  };

  const deleteProject = (index) => {
    setPooledArr(pooledProjectArr.filter((item, j) => index !== j));
  };

  const addToEditItem = (index) => {
    const editItem = pooledProjectArr[index];
    setEditItemId(editItem.id);
  };

  const handleEdit = (project) => {
    const curIndex = pooledProjectArr.findIndex((el) => editItemId === el.id);
    const copyProjectArr = [...pooledProjectArr];

    copyProjectArr.splice(curIndex, 1, {
      ...pooledProjectArr[curIndex],
      ...project,
    });
    setPooledArr(copyProjectArr);
    setEditItemId({});
  };

  if (isLoaded) {
    return <CircularProgress />;
  }

  return (
    <List className={classes.root}>
      {pooledProjectArr.map((project, i) => {
        const { users, devices } = project;
        const isEdit = editItemId === project.id;

        return (
          <List
            key={project.id}
            className={classes.root}
            subheader={
              <SubHeader
                titleText={project.title}
                startDate={project.beginDate}
                endDate={project.expirationDate}
                isEdit={isEdit}
                onEdit={handleEdit}
              />
            }
          >
            <ListComponent text={"Users"} list={users} />
            <ListComponent text={"Devices"} list={devices} />
            <Button
              isEdit={isEdit}
              text="Edit"
              index={i}
              icon={<EditIcon />}
              handleClick={addToEditItem}
            />
            <Button
              text="Delete"
              index={i}
              icon={<DeleteIcon />}
              handleClick={deleteProject}
            />
            <Divider className={classes.divider} />
          </List>
        );
      })}
    </List>
  );
};

export default withStyles(styles)(App);
