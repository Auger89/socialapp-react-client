import React from 'react';
import { useParams } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../utils/ScreamSkeleton';
import ProfileSkeleton from '../utils/ProfileSkeleton';
import useProfile from '../hooks/useProfile';

const User = () => {
  const { handle, screamId } = useParams();
  const { profile, screams, loading } = useProfile(handle);
  // TODO handle error from useProfile

  const userScreams = () => {
    if (screams === null) {
      return <p>No posts yet</p>;
    }

    return screams.map(scream =>
      screamId && screamId === scream.id ? (
        <Scream key={scream.id} data={scream} openDialog />
      ) : (
        <Scream key={scream.id} data={scream} />
      )
    );
  };

  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {loading ? <ScreamSkeleton /> : userScreams()}
      </Grid>
      <Grid item sm={4} xs={12}>
        {!profile ? <ProfileSkeleton /> : <StaticProfile profile={profile} />}
      </Grid>
    </Grid>
  );
};

export default User;
