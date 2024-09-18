import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clients: [],
    isFetching: false,
    error: false
}

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        //GET ALL CLIENTS
        getClientStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients = action.payload;
        },
        getClientFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE CLIENT
        updateClientStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients[state.clients.findIndex(item => item.clientId === action.payload.id)] = action.payload.clientData
        },
        updateClientFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE CLIENT
        deleteClientStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients.splice(
                state.clients.findIndex((item) => item.clientId === action.payload.id),
                1
              );
            // state.clients[state.clients.findIndex(item => item._id === action.payload.id)] = action.payload.product
        },
        deleteClientFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // ADD NEW Client
        addClientStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients = [...state.clients,action.payload]
        },
        addClientFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

export const {
    getClientStart,
    getClientSuccess,
    getClientFailure,
    deleteClientStart,
    deleteClientSuccess,
    deleteClientFailure,
    updateClientStart,
    updateClientSuccess,
    updateClientFailure,
    addClientStart,
    addClientSuccess,
    addClientFailure,
} = clientSlice.actions;
  
  export default clientSlice.reducer;