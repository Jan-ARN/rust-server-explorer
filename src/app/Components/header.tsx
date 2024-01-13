import React from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { Button, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Container = styled(Stack)({
  backgroundColor: "#47484a",
  width: "100%",
  minWidth: "100%",
  paddingLeft: 12,
  paddingRight: 12,
  color: "white",
});

const HeaderButton = styled(Button)({
  color: "white",
});

const SmallContainer = styled(Stack)({});

const ShowHeader: React.FC = observer(() => {
  return (
    <Container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h6">Rust Server List</Typography>
      <SmallContainer direction="row" spacing={2}>
        <HeaderButton startIcon={<FontAwesomeIcon icon={faPlus} />}>
          ADD
        </HeaderButton>

        <HeaderButton startIcon={<FontAwesomeIcon icon={faPen} />}>
          EDIT
        </HeaderButton>

        <HeaderButton startIcon={<FontAwesomeIcon icon={faTrash} />}>
          DELETE
        </HeaderButton>
      </SmallContainer>
    </Container>
  );
});

export default ShowHeader;
