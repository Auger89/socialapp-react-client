import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import service from '../services';

const ScreamsContext = createContext();

const ScreamsProvider = ({ children }) => {
  const [screams, setScreams] = useState();
  const [loading, setLoading] = useState();

  const getScreams = () => {
    setLoading(true);
    service
      .getScreams()
      .then(res => setScreams(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const likeScream = () => {};
  const unlikeScream = () => {};

  // In order to execute an async function in a hook, we must create it inside (scoped)
  useEffect(() => {
    const getAllScreams = async () => {
      await getScreams();
    };
    getAllScreams();
  }, []);

  const value = { screams, loading, likeScream, unlikeScream };
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
