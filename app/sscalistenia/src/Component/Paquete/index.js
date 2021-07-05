import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Params';

class Paquete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var key = this.props.key_paquete;
        let reducer = this.props.state.paqueteReducer;
        let data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return <ActivityIndicator color={"#fff"} />
            if (reducer.estado == "error") return <Text>ERROR</Text>
            var object = {
                component: "paquete",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }
        var obj = data[key];
        var urlImage = AppParams.urlImages + "paquete_" + obj.key;
        return (
            <TouchableOpacity style={{
                width: "96%",
                backgroundColor: "#66000044",
                height: 50,
                marginBottom: 8,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 4,
            }} onPress={() => {
                // if (obj.url) {
                // console.log(obj)
                this.props.onPress(key);
                // }
            }}>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                    overflow: "hidden",
                    width: 40,
                    height: 40,
                    backgroundColor: "#ff999933"
                }}>
                    {this.props.state.imageReducer.getImage(urlImage, {
                        resizeMode: "cover",
                        objectFit: "cover"
                    })}
                </View>
                <View style={{
                    flex: 6,
                    height: 20,
                    justifyContent: "center",
                    // alignItems: "center"
                    paddingStart: 8,
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                    }}>{obj.descripcion}</Text>
                </View>
                <View style={{
                    flex: 1,
                    height: 20,
                    justifyContent: "center",
                    // alignItems: "center"
                    paddingStart: 8,
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                    }}>{obj.participantes}</Text>
                </View>
                <View style={{
                    flex: 1,
                    height: 20,
                    justifyContent: "center",
                    // alignItems: "center"
                    paddingStart: 8,
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                    }}>{obj.dias}</Text>
                </View>
                <View style={{
                    flex: 2,
                    height: 20,
                    justifyContent: "center",
                    // alignItems: "center"
                    paddingStart: 8,
                }}>
                    <Text style={{
                        color: "#ffffff",
                        fontSize: 14,
                    }}>Bs. {(obj.precio).toLocaleString('en-IN')}</Text>
                </View>

            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Paquete);