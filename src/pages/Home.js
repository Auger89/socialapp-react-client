import React from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import { useScreams } from '../contexts/screamsContext';

const Home = () => {
  const { screams, loadingScreams } = useScreams();
  console.log('screams: ', screams);
  
  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {loadingScreams ? (
          <p>Loading...</p>
        ) : (
          screams.map(scream => <Scream key={scream.id} data={scream} />)
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
