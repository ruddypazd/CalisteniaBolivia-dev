import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SButtom, SPage, SText } from 'servisofts-component'

export default class ZKTeco extends Component {
    render() {
        return (
            <SPage title={"ZKTeco"}>
                <SButtom onPress={() => {
                    SSocket.send({
                        servicio: "zkteco",
                        component: "zkteco",
                        type: "sincronizarUsuario",
                        estado: "cargando",
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                        data: {
                            key_usuario: this.key_usuario,
                            key_sucursal: this.key_sucursal,
                        }
                    })
                }}>SINCRONIZAR</SButtom>
            </SPage>
        )
    }
}