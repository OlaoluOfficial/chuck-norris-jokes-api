import React, { useEffect, useState } from 'react';

// importing from the material ui and destructuring
import {
  Badge,
  AppBar,
  CssBaseline,
  Container,
  CircularProgress,
  Typography,
  Tab,
  Tabs,
} from '@material-ui/core';

// import css
import './index.css';

// components import
import JokeCard from './JokeCard';

// components
const Spinner = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <CircularProgress />
    </div>
  );
};

// main app
function App() {
  // our useStates
  const [jokes, setJokes] = useState([]);
  const [displayJokes, setDisplayJokes] = useState([]);

  const [likedJokes, setLikedJokes] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);

  const [loading, setLoading] = useState(false);

  // effect
  useEffect(() => {
    // fetch data
    fetch('https://api.chucknorris.io/jokes/search?query=all')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setJokes(res.result);
        setDisplayJokes(res.result.slice(0, 10));
      })
      .catch((err) => console.log(err));
  }, []);

  // onclick functions
  const likeJoke = (id) => {
    if (likedJokes.find((joke) => joke.id === id)) return;

    const likedJoke = jokes.find((joke) => joke.id === id);
    setLikedJokes([likedJoke, ...likedJokes]);
  };
  const unlikeJoke = (id) => {
    const newLikedJokes = likedJokes.filter((joke) => joke.id !== id);
    setLikedJokes(newLikedJokes);
  };

  const changeTab = (event, value) => {
    setCurrentTab(value);
  };

  const viewMoreJokes = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayJokes(jokes.slice(0, displayJokes.length + 10));
      setLoading(false);
    }, 400);
  };

  // load more
  const observeElement = (bottomJoke) => {
    if (!bottomJoke) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          viewMoreJokes();
          observer.unobserve(bottomJoke);
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(bottomJoke);
  };

  useEffect(() => {
    const bottomJokeElement = document.getElementById(
      `joke-${displayJokes.length - 1}`
    );
    observeElement(bottomJokeElement);
  }, [displayJokes]);

  // rendering
  return (
    <div className="container">
      <CssBaseline />
      <Container>
        <Typography variant="h2" align="center" style={{ margin: 20 }}>
          Chuck Norris Jokes
        </Typography>
        <AppBar
          style={{ marginBottom: 20 }}
          position="sticky"
          color={'primary'}
        >
          <Tabs value={currentTab} onChange={changeTab} centered>
            <Tab label="Home" id="home-tab" aria-controls="home-panel" />
            <Tab
              label={
                <Badge
                  color="secondary"
                  badgeContent={
                    likedJokes.length > 0 ? likedJokes.length : null
                  }
                >
                  Likes
                </Badge>
              }
              id="like-tab"
              aria-controls="like-panel"
            />
          </Tabs>
        </AppBar>
        <div role="tabpanel" hidden={currentTab !== 0}>
          {/* Joke cards */}
          {displayJokes.map((joke, index) => {
            return (
              <JokeCard
                key={joke.id}
                joke={joke}
                likeJoke={likeJoke}
                unlikeJoke={unlikeJoke}
                index={index}
              />
            );
          })}
          {loading && <Spinner />}
        </div>
        <div role="tabpanel" hidden={currentTab !== 1}>
          {likedJokes.map((joke) => {
            return (
              <JokeCard
                key={joke.id}
                joke={joke}
                likeJoke={likeJoke}
                unlikeJoke={unlikeJoke}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default App;
