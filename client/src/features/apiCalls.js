import axios from "axios"
import { addClientFailure, addClientStart, addClientSuccess, deleteClientFailure, deleteClientStart, deleteClientSuccess, getClientFailure, getClientStart, getClientSuccess, updateClientFailure, updateClientStart, updateClientSuccess } from "./clientSlice"

const url = "http://localhost:5000/api/clients"

export const getAllClients = async (dispatch) => {
    dispatch(getClientStart())
    try {
        const res = await axios.get(url)
        dispatch(getClientSuccess(res.data))
    } catch (err) {
        dispatch(getClientFailure())
    }
}

export const addClient = async (dispatch,clientData) => {
    dispatch(addClientStart())
    try {
        const res = await axios.post(url,clientData)
        dispatch(addClientSuccess(res.data))
    } catch (err) {
        dispatch(addClientFailure())
    }
}

export const editClient = async (dispatch,id,editData) => {
    dispatch(updateClientStart())
    try {
        const res = await axios.put(`${url}/${id}`,editData)
        dispatch(updateClientSuccess({id,clientData:res.data}))
    } catch (err) {
        dispatch(updateClientFailure())
    }
}

export const deleteClient = async (dispatch,id) => {
    dispatch(deleteClientStart())
    try {
        await axios.delete(`${url}/${id}`)
        dispatch(deleteClientSuccess({id}))
    } catch (err) {
        dispatch(deleteClientFailure())
    }
}