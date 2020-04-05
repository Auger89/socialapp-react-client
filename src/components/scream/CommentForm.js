import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useUser } from '../../contexts/userContext';
import { useScreams } from '../../contexts/screamsContext';
import { VisibleSeparator } from '../common';

const FormGrid = styled(Grid)`
  text-align: center;
`;

const CommentTextField = styled(TextField)``;

const SubmitButton = styled(Button)``;

const CommentForm = ({ id, afterSubmit }) => {
  const { authenticated } = useUser();
  const { submitComment } = useScreams();
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const submit = async () => {
    const errorResult = await submitComment(id, body);
    if (errorResult) {
      setErrors(errorResult);
    } else {
      afterSubmit(body);
      setBody('');
    }
  };

  if (!authenticated) return null;
  return (
    <FormGrid item sm={12}>
      <form>
        <CommentTextField
          name="body"
          type="text"
          label="Comment on scream"
          error={!!errors.comment}
          helperText={errors.comment}
          value={body}
          onChange={evt => setBody(evt.target.value)}
          fullWidth
        />
        <SubmitButton variant="contained" color="primary" onClick={submit}>
          Submit
        </SubmitButton>
      </form>
      <VisibleSeparator />
    </FormGrid>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string.isRequired,
  afterSubmit: PropTypes.func.isRequired
};

export default CommentForm;
