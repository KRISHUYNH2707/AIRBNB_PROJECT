const DEFAULT_STATE = {
    favoriteRooms: []
}

export const favoriteRoomReducer = (state=DEFAULT_STATE, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_FAVORITE_ROOM': {
            state.favoriteRooms.push(payload.id)
            break
        }
        default:
            break;
    }

    return {...state}
}