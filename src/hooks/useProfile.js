import { useState, useEffect } from 'react';
import service from '../services';

const useProfile = handle => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProfile(null);
    setScreams(null);

    service
      .getUserData(handle)
      .then(res => {
        if (res.data) {
          setProfile(res.data.user);
          setScreams(res.data.screams);
        }
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [handle]);

  return { loading, error, profile, screams };
};

export default useProfile;
