"use client";
import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from "./rootStore";

store.loadData(3344761);

const Home: React.FC = observer(() => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddId = () => {
    store.addId(inputValue);
    setInputValue("");
  };

  const handleRemoveId = (id: string) => {
    store.removeId(id);
  };
  return (
    <div>
      <TextField
        label="Enter ID"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleAddId}>Add ID</Button>
      <List>
        {store.ids.map((id) => (
          <ListItem
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveId(id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            }
          >
            <ListItemText primary={id} />
          </ListItem>
        ))}
      </List>
    </div>
  );
});

export default Home;
