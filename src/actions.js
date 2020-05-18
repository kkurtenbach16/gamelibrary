export const Action = Object.freeze({
    LoadGames: 'LoadGames',
    FinishAddingGame: 'FinishAddingGame',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingGame: 'FinishSavingGame',
    FinishDeletingGame: 'FinishDeletingGame',
});

export function loadGames(games) {
    return {
        type: Action.LoadGames,
        payload: games,
    };
}

export function finishAddingGame(game) {
    return {
        type: Action.FinishAddingGame,
        payload: game,
    };
}

export function finishSavingGame(game) {
    return {
        type: Action.FinishSavingGame,
        payload: game,
    };
}

export function finishDeletingGame(game) {
    return {
        type: Action.FinishDeletingGame,
        payload: game,
    };
}

export function enterEditMode(memory) {
    return {
        type: Action.EnterEditMode,
        payload: memory,
    };
}

export function leaveEditMode(memory) {
    return {
        type: Action.LeaveEditMode,
        payload: memory,
    };
}

function checkForErrors(response) {
    if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = 'https://gamelibrary.duckdns.org:8442';

export function loadDay(release_month, release_day) {
    return dispatch => {
        fetch(`${host}/gamelibrary`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(loadGames(data.games));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startAddingGame(release_year, release_month, release_day) {
    const game = {release_year, release_month, release_day, description: ''};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    }
    return dispatch => {
        fetch(`${host}/gamelibrary`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    game.game_id = data.game_id;
                    dispatch(finishAddingGame(game));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startSavingGame(game) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    }
    return dispatch => {
        fetch(`${host}/gamelibrary/${game.game_id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(finishSavingGame(game));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startDeletingGame(game) {
    const options = {
        method: 'DELETE',
    };

    return dispatch => {
        fetch(`${host}/gamelibrary/${game.game_id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(finishDeletingGame(game));
                }
            })
            .catch(e => console.error(e));
    };
}


