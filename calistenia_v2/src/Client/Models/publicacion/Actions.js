import SSocket from 'servisofts-socket';
import Model from '../../../Model';
import Parent from './index';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }
    static getAll = (props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                component: Parent.component,
                version: Parent.version,
                type: "getAll",
                estado: "cargando",
                key_usuario:Model.usuario.Action.getKey(),
            })
            return null;
        }
        return data;
    }

    static getByKey = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return data[key];
    }

    static registro = (data, props) => {
        SSocket.send({

            component: Parent.component,
            version: Parent.version,
            type: "registro",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            data: data
        })
    }
    static editar = (data, props) => {
        SSocket.send({

            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            data: data
        })
    }
    static eliminar = (data, props) => {
        SSocket.send({

            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            data: {
                ...data,
                estado: 0,
            }
        })
    }

}