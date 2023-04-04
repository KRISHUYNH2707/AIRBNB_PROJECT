export const setSelectedLocationReducer = (data) => {
    return {
        type: 'SET_SELECTED_LOCATION',
        payload: data
    }
}

export const setFavoriateRoom = (data) => {
    return {
        type: 'SET_FAVORITE_ROOM',
        payload: data
    }
}