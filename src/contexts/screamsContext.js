import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import service from '../services';

const ScreamsContext = createContext();

const ScreamsProvider = ({ children }) => {
  const [screams, setScreams] = useState([]);
  const [loadingScreams, setLoadingScreams] = useState();
  const [loadingPostScream, setLoadingPostScream] = useState();

  const updateScreamLikes = (id, amount) => {
    const updatedScreams = screams.map(scream => {
      if (scream.id === id) {
        return { ...scream, likeCount: scream.likeCount + amount };
      }
      return scream;
    });
    setScreams(updatedScreams);
  };

  const getScreams = async () => {
    setLoadingScreams(true);
    try {
      const response = await service.getScreams();
      setScreams(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingScreams(false);
    }
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

  const deleteScream = screamId => {
    service
      .deleteScream(screamId)
      .then(() => {
        const updatedScreams = screams.filter(scream => scream.id !== screamId);
        setScreams(updatedScreams);
      })
      .catch(err => console.log(err));
  };

  const postScream = async newScream => {
    let errors;
    setLoadingPostScream(true);

    try {
      const response = await service.postScream({ body: newScream });
      setScreams([response.data, ...screams]);
    } catch (err) {
      console.log(err.toJSON());
      errors = err.response.data;
    }

    setLoadingPostScream(false);
    return errors;
  };

  const getScream = async screamId => {
    let response;
    try {
      response = await service.getScream(screamId);
    } catch (err) {
      console.log(err);
    }
    return response && response.data;
  };

  const submitComment = async (screamId, comment) => {
    let errors;

    try {
      await service.submitComment(screamId, { body: comment });
    } catch (err) {
      console.log(err.toJSON());
      errors = err.response.data;
    }

    return errors;
  };

  // In order to execute an async function in a hook, we must create it inside (scoped)
  useEffect(() => {
    const getAllScreams = async () => {
      await getScreams();
    };
    getAllScreams();
  }, []);

  const value = {
    screams,
    loadingScreams,
    loadingPostScream,
    likeScream,
    unlikeScream,
    deleteScream,
    postScream,
    getScream,
    submitComment
  };
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
