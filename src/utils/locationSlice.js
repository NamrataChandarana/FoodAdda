import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        latitude: 12.9715987,
        longitude: 77.5945627,
        locationName: 'Banglore',
        locationDisplayName: 'Banglore, Karnataka, India',
    },

    reducers: {
        updateLocation: (state, action) => {
            const {lat, lon, name, display_name} = action.payload;
            state.latitude = lat;
            state.longitude = lon;
            state.locationName = name;
            state.locationDisplayName = display_name;
        }
    }
});

export const {updateLocation} = locationSlice.actions;

export default locationSlice.reducer;