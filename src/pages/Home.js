import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import service from '../services';
import Scream from '../components/Scream';

const Home = () => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    service
      .getScreams()
      .then(res => setScreams(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {screams ? (
          screams.map(scream => <Scream data={scream} />)
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile</p>
      </Grid>
    </Grid>
  );
};

export default Home;
