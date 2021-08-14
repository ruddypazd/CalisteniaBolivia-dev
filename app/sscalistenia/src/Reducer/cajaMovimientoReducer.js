const initialState = {
    estado: "Not Found",
    data: {},
    usuario: {},
    activas: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "cajaMovimiento") {
        switch (action.type) {
            case "getByKeyCaja":
                getByKeyCaja(state, action);
                break;
            case "getAllActivas":
                getAllActivas(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const getAllActivas = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            state.activas = true;
            state.data = {
                ...state.data,
                ...action.data
            };
        }
    }
}
const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            state.data = {
                ...state.data,
                ...action.data
            };
        }
    }
}
const getByKeyCaja = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.key_caja] = action.data;
        }
    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            if (!state.data[action.data.key_caja]) {
                state.data[action.data.key_caja] = {};
            }
            var objt = {}
            objt[action.data.key] = action.data;
            state.data[action.data.key_caja] = {
                ...state.data[action.data.key_caja],
                ...objt
            };
        }
    }
}