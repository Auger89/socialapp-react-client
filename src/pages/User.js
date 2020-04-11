import React from 'react';
import { useParams } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import useProfile from '../hooks/useProfile';

const User = () => {
  const params = useParams();
  const { profile, screams, loading } = useProfile(params.handle);
  // TODO handle error from useProfile

  console.log('profile', profile);
  console.log('screams', screams);

  const userScreams = () =>
    screams === null ? (
      <p>No posts yet</p>
    ) : (
      screams.map(scream => <Scream key={scream.id} data={scream} />)
    );

  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {loading ? <p>Loading...</p> : userScreams()}
      </Grid>
      <Grid item sm={4} xs={12}>
        {!profile ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

export default User;
