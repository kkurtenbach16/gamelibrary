import React, {useEffect} from 'react';
import './App.css';
import {GameLibrary} from './GameLibrary';
import {useSelector, useDispatch} from 'react-redux';
import {loadDay, startAddingGame} from './actions';

const date = new Date();
const release_year = date.getFullYear();
const release_month = date.getMonth() + 1;
const release_day = date.getDate();

function App() {

const games = useSelector(state => state.games);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(loadDay(release_month, release_day));
}, [dispatch]);

const onAdd = () => {
  dispatch(startAddingGame(release_year, release_month, release_day));
}

return (
    <div className="games-root">
      <button onClick={onAdd}>New Game</button>
      {games.map(game => <GameLibrary key={game.game_id} game={game} />)}
    </div>
  );
}

export default App;
