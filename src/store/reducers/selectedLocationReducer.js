const DEFAULT_STATE = {
    locationID: -1,
    locationName: '',
    checkinDate: new Date(),
    checkoutDate: new Date(),
    selectedNumGuest: 1,
}

export const selectedLocationReducer = (state=DEFAULT_STATE, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_SELECTED_LOCATION' :{
            state.locationID = payload.selectedLocationID
            state.locationName = payload.selectedLocation
            state.checkinDate = payload.startDate
            state.checkoutDate = payload.endDate
            state.selectedNumGuest = payload.numGuest
            break
        }
        default:
            break;
    }

    return {...state}
}