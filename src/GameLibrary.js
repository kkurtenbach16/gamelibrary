import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingGame, startDeletingGame} from './actions';


const release_months = ["January", "February", "March", "April",
"May", "June", "July", "August", "September", "October",
"November", "December"];

export function GameLibrary(props) {
    const game = props.game;
    const dispatch = useDispatch();
    const [game_name, setGameName] = useState(game.game_name);
    const [platform, setPlatform] = useState(game.platform);
    const [hours_played, setHoursPlayed] = useState(game.hours_played);
    const [release_year, setYear] = useState(game.release_year);
    const [release_month, setMonth] = useState(game.release_month);
    const [release_day, setDay] = useState(game.release_day);
    const [description, setMessage] = useState(game.description);
    const [is_beat, setIsBeat] = useState(game.is_beat);

    const onEdit = () => {
        dispatch(enterEditMode(game));
    };

    const onCancel = () => {
        dispatch(leaveEditMode(game));
    };

    const onSave = () => {
        dispatch(startSavingGame({
            game_id: game.game_id,
            game_name,
            platform,
            hours_played,
            release_year,
            release_month,
            release_day,
            description,
            is_beat,
        }));
    };

    const onDelete = () => {
        dispatch(startDeletingGame(game));
    }

    if(game.isEditing) {
        return (
            <div className="game-cards">
                <div className="game-cards_card">
                    <input type="text" title="Game Name" value={game_name} onChange={e => 
                    setGameName(e.target.value)} />
                    <input type="text" value={platform} onChange={e => 
                    setPlatform(e.target.value)} />
                    <input type="text" value={hours_played} onChange={e => 
                    setHoursPlayed(parseInt(e.target.value))} />
                    <input type="text" value={release_year} onChange={e => 
                    setYear(parseInt(e.target.value))} />
                    <input type="text" value={release_month} onChange={e => 
                    setMonth(parseInt(e.target.value))} />
                    <input type="text" value={release_day} onChange={e => 
                    setDay(parseInt(e.target.value))} />
                    <input type="text" value={is_beat} onChange={e => 
                    setIsBeat(parseInt(e.target.value))} />
                    <button onClick={onSave}>Save</button>
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
                <div className="game-cards_cardDescription">
                <textarea value={description} onChange={e =>
                    setMessage(e.target.value)} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="game-cards">
                <div className="game-cards_card">
                    <span>Game Name: {game.game_name}</span>
                    <span>Game Release Date: {release_months[game.release_month -1]} {game.release_day} {game.release_year}</span>
                    <span>Platform: {game.platform}</span>
                    <span>Hours Played: {game.hours_played}</span>
                    <button onClick={onEdit}>Edit</button>
                </div>
                <div className="game-cards_cardDescription">
                Description: {game.description}
                </div>
            </div>       
        );
    }
}