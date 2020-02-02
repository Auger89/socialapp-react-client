import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import service from '../services';

const ScreamsContext = createContext();

const ScreamsProvider = ({ children }) => {
  const [screams, setScreams] = useState([]);
  const [loadingScreams, setLoadingScreams] = useState();

  const updateScreamLikes = (id, amount) => {
    const updatedScreams = screams.map(scream => {
      if (scream.id === id) {
        return { ...scream, likeCount: scream.likeCount + amount };
      }
      return scream;
    });
    setScreams(updatedScreams);
  };

  const getScreams = () => {
    setLoadingScreams(true);
    service
      .getScreams()
      .then(res => setScreams(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoadingScreams(false));
  };

  const likeScream = screamId => {
    service
      .likeScream(screamId)
      .then(() => {
        updateScreamLikes(screamId, 1);
      })
      .catch(err => console.log(err));
  };

  const unlikeScream = screamId => {
    service
      .unlikeScream(screamId)
      .then(() => {
        updateScreamLikes(screamId, -1);
      })
      .catch(err => console.log(err));
  };

  // In order to execute an async function in a hook, we must create it inside (scoped)
  useEffect(() => {
    const getAllScreams = async () => {
      await getScreams();
    };
    getAllScreams();
  }, []);

  const value = { screams, loadingScreams, likeScream, unlikeScream };
  return (
    <ScreamsContext.Provider value={value}>{children}</ScreamsContext.Provider>
  );
};

ScreamsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const useScreams = () => {
  const context = useContext(ScreamsContext);
  if (context === undefined) {
    throw new Error('useScreams must be used within a ScreamsProvider');
  }
  return context;
};

export { ScreamsProvider, useScreams };
