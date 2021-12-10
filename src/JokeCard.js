import React from 'react';

// components from material ui
import {
  Button,
  Chip,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core';

// custom hook
const useStyles = makeStyles({
  card: {
    marginBottom: 20,
  },
  cardContent: {
    paddingBottom: 5,
  },
  cardActions: {
    padding: 16,
  },
});

// components

const Category = withStyles({
  root: {
    marginTop: 10,
    marginBottom: 10,
  },
})(Chip);

export default function JokeCard({ joke, likeJoke, unlikeJoke, index }) {
  const classes = useStyles();
  return (
    <Card className={classes.card} id={`joke-${index}`}>
      <CardContent className={classes.cardContent}>
        {joke.categories.length > 0 ? (
          joke.categories.map((cat) => (
            <Category label={cat} key={cat} variant="outlined" />
          ))
        ) : (
          <Category label="reglar" variant="outlined" />
        )}

        <Typography>{joke.value}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => likeJoke(joke.id)}
        >
          Like
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => unlikeJoke(joke.id)}
        >
          Unlike
        </Button>
      </CardActions>
    </Card>
  );
}
