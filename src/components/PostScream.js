import React, { useState } from 'react';
import styled from '@emotion/styled';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { useScreams } from '../contexts/screamsContext';

const SubmitButton = styled(Button)`
  position: relative;
  margin-top: 16px;
`;

const LoadingSpinner = styled(CircularProgress)`
  position: absolute;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  left: 90%;
  top: 10%;
`;

const PostScream = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const { postScream, loadingPostScream } = useScreams();

  const handleSubmit = async evt => {
    evt.preventDefault();
    const errorResult = await postScream(content);
    console.log(errorResult);
    if (errorResult) {
      setErrors(errorResult);
    } else {
      setOpen(false);
    }
    setContent('');
  };

  const close = () => {
    setOpen(false);
    setErrors({});
  };

  return (
    <>
      <Tooltip title="Post a Scream" placement="top">
        <IconButton onClick={() => setOpen(true)} style={{ color: '#fff' }}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
        <Tooltip title="Close" placement="top">
          <CloseButton onClick={close}>
            <CloseIcon />
          </CloseButton>
        </Tooltip>
        <DialogTitle>Post a new Scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!"
              fullWidth
              multiline
              rows="3"
              placeholder="Scream at your friends!"
              onChange={evt => setContent(evt.target.value)}
              error={!!(errors && errors.body)}
              helperText={errors.body}
            />
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={loadingPostScream}
            >
              Submit
              {loadingPostScream && <LoadingSpinner size={30} />}
            </SubmitButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostScream;
