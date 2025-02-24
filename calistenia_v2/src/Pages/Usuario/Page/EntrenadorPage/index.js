import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Buscador from '../../../../Components/Buscador';
import FloatButtom from '../../../../Components/FloatButtom';
import SSRolesPermisos, { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';
import { SScrollView2, SView, SOrdenador, SPage, SButtom, SImage, SLoad, SNavigation, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usuario from '../..';
import sucursal_usuario from '../../../sucursal_usuario';
import Model from '../../../../Model';

class EntrenadorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      }
    };
    this.key_rol = "b5b4a616-dd16-4443-b859-39245f50c8df";
  }
  componentDidMount() {
    // var object = {
    //   service: "usuario",
    //   component: "usuario",
    //   version: "2.0",
    //   type: "getAll",
    //   estado: "cargando",
    //   cabecera: "registro_administrador",
    //   key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
    // }
    // SSocket.send(object);

  }
  pagination = (listaKeys) => {
    if (!listaKeys) {
      return [];
    }
    if (listaKeys.length <= 0) {
      return [];
    }
    var pageLimit = 50
    var tamanho = listaKeys.length;
    var nroBotones = Math.ceil(tamanho / pageLimit);
    if (this.state.pagination.curPage > nroBotones) {
      this.state.pagination.curPage = nroBotones;
    }
    var actual = pageLimit * (this.state.pagination.curPage - 1);
    return listaKeys.slice(0, actual + pageLimit);
  }
  getRecuperar(data, isRecuperar) {
    if (!isRecuperar) {
      return <View />
    }
    if (data.estado != 0) {
      return <View />
    }
    return <SButtom
      props={{
        type: "danger",
        variant: "confirm"
      }}
      onPress={() => {
        Usuario.Actions.editar({
          ...data,
          estado: 1,
        }, this.props)
      }} >Recuperar</SButtom>
  }

  render() {

    const getLista = () => {
      var data = Model.usuario.Action.getAll();
      // var dataRU = SSRolesPermisos.Events.getUsuarioRol(this.key_rol, this.props)
      var dataRU = Model.usuarioRol.Action.getAllByKeyRol(this.key_rol);
      var arr_sc_us = sucursal_usuario.Actions.getAll(this.props);
      if (!data) return <SLoad />
      if (!dataRU) return <SLoad />
      if (!arr_sc_us) return <SLoad />
      if (!this.state.buscador) {
        return <View />
      }
      var isAll = SSRolesPermisosValidate({ page: "SucursalPage", permiso: "admin_all" });

      var objFinal = {};

      Object.keys(dataRU).map((key) => {
        var rol_user = dataRU[key];
        if (!data[rol_user.key_usuario]) {
          return;
        }
        if (!isAll) {
          var suc_por_usuario = sucursal_usuario.Actions.getAllByKeyUsuario(key, this.props);
          var isActive = false;

          suc_por_usuario.map((suc) => {
            if (!isActive) {
              isActive = sucursal_usuario.Actions.isActive(suc.key_sucursal, this.props);
            }
          })
          if (!isActive) return null;
        }

        objFinal[rol_user.key_usuario] = data[rol_user.key_usuario]
      });

      var isRecuperar = SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "recuperar_eliminado" });

      return this.pagination(
        new SOrdenador([
          // { key: "Peso", order: "desc", peso: 4 },
          { key: "Nombres", order: "asc", peso: 2 },
          { key: "Apellidos", order: "asc", peso: 1 },
        ]).ordernarObject(
          this.state.buscador.buscar(objFinal)
        )
      ).map((key) => {
        var obj = data[key];
        return <TouchableOpacity style={{
          width: "90%",
          maxWidth: 600,
          height: 50,
          margin: 4,
          borderRadius: 10,
          backgroundColor: STheme.color.card
        }} onPress={() => {
          SNavigation.navigate("registro", {
            key: key
          })
        }}>
          <View style={{
            flex: 1,
            justifyContent: "center"
          }}>
            <View style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
              alignItems: "center"
            }}>
              <View style={{
                width: 40,
                height: 40,
                marginRight: 8,
                justifyContent: "center",
                alignItems: "center",
                // padding: 1,
                // borderRadius: 200,
                backgroundColor: STheme.color.card,
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario/" + key + `?date=${new Date().getTime()}`} />

              </View>
              <View style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: STheme.color.text,
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"]}</Text>
              </View>
              {this.getRecuperar(obj, isRecuperar)}
            </View>
          </View>
        </TouchableOpacity>
      })
    }
    return (
      <SPage hidden disableScroll>
        <BarraSuperior title={"Entrenadores"} navigation={this.props.navigation} goBack={() => {
          SNavigation.goBack();
        }} />
        <Buscador placeholder={"Buscar por CI, Nombres, Apellidos, Correo o Telefono."} ref={(ref) => {
          if (!this.state.buscador) this.setState({ buscador: ref });
        }} repaint={() => { this.setState({ ...this.state }) }}
        />
        <SView flex style={{
          width: "100%",
        }}>
          <SScrollView2
            disableHorizontal
            onScroll={(evt) => {
              var evn = evt.nativeEvent;
              var posy = evn.contentOffset.y + evn.layoutMeasurement.height;
              var heigth = evn.contentSize.height;
              if (heigth - posy <= 0) {
                this.state.pagination.curPage += 1;
                this.setState({ ...this.state })
              }
            }}
          >
            <SView col={"xs-12"} center>
              {getLista()}
            </SView>
          </SScrollView2>

        </SView>
        <FloatButtom esconder={!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "crear" })} onPress={() => {
          SNavigation.navigate("registro", {
            key_rol: this.key_rol
          })
        }} />
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(EntrenadorPage);