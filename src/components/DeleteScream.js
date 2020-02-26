import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { useScreams } from '../contexts/screamsContext';

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 10%;
  left: 90%;
`;

const DeleteScream = ({ screamId }) => {
  const [open, setOpen] = useState(false);
  const { deleteScream } = useScreams();

  const confirmDelete = async () => {
    await deleteScream(screamId);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete Scream" placement="top">
        <DeleteButton onClick={() => setOpen(true)}>
          <DeleteIcon color="secondary" />
        </DeleteButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired
};

export default DeleteScream;
