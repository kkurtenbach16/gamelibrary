import {Action} from "./actions";

const initialState = {

    isWaiting: false,
    games: [].map((d, game_id) => ({...d, game_id})),
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case Action.LoadGames:
            return {
                ...state,
                games: action.payload,
            };
        case Action.FinishAddingGame:
            return {
                ...state,
                games: [{...action.payload, isEditing: true}, ...state.games],
            };
        case Action.EnterEditMode:
        return {
            ...state,
            games: state.games.map(game => {
                if (game.game_id === action.payload.game_id) {
                    return {...game, isEditing: true};
                } else {
                    return game;
                }
            }),
        };
        case Action.LeaveEditMode:
        return {
            ...state,
            games: state.games.map(game => {
                if (game.game_id === action.payload.game_id) {
                    return {...game, isEditing: undefined};
                } else {
                    return game;
                }
            }),
        };
        case Action.FinishSavingGame:
        return {
            ...state,
            games: state.games.map(game => {
                if (game.game_id === action.payload.game_id) {
                    return action.payload;
                } else {
                    return game;
                }
            }),
        };

        case Action.FinishDeletingGame:
        return {
            ...state,
            games: state.games.filter(game => game.game_id !== action.payload.game_id),
        };
        default:
            return state;
    }
}

export default reducer;