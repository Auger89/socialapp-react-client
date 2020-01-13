import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { useUser } from '../contexts/userContext';

const StyledIconButton = styled(IconButton)`
  float: right;
`;

const EditDetails = () => {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);
  const { userData, editUserDetails } = useUser();
  const { credentials } = userData || {};

  const mapUserDataToState = () => {
    setBio(credentials.bio || '');
    setWebsite(credentials.website || '');
    setLocation(credentials.location || '');
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDataToState();
  };

  const handleSumbit = () => {
    editUserDetails({ bio, website, location });
    setOpen(false);
  };

  useEffect(() => {
    if (credentials) mapUserDataToState();
  }, [credentials]);

  return (
    <>
      <Tooltip title="Edit Details" placement="top">
        <StyledIconButton onClick={handleOpen}>
          <EditIcon color="primary" />
        </StyledIconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              value={bio}
              onChange={evt => setBio(evt.target.value)}
              multiline
              rows="3"
              fullWidth
              placeholder="A short bio about yourself"
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              value={website}
              onChange={evt => setWebsite(evt.target.value)}
              placeholder="Your personal or professional website"
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              value={location}
              onChange={evt => setLocation(evt.target.value)}
              placeholder="Where you live"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSumbit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDetails;
