import { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SForm, SInput, SNavigation, SPage, SPopup, SPopupClose, SPopupOpen, SScrollView2, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import BancoSelect from "../BancoSelect";
import TipoMovimiento from './TipoMovimiento';
let ReducerName = "cuentaBancoMovimientoReducer";
let component = "cuentaBancoMovimiento";

class CuentaBancoMovimientoRegistroPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      cuenta: {
        descripcion: "Cuenta a transferir"
      },
      tipoSelect: "ingreso"
    };
    this.key_banco = SNavigation.getParam("key_banco", null);
    this.key_cuenta_banco = SNavigation.getParam("key_cuenta_banco", null);
    // if (!key) {
    //     this.data = {};
    // } else {
    //     this.data = this.props.state["bancoReducer"].data[key];
    // }

  }
  getName() {
    switch (this.state.tipoSelect) {
      case "ingreso": return "Ingreso";
      case "egreso": return "Egreso";
      case "traspaso": return "Traspaso";
    }
    return "";
  }
  getBancoSelect() {
    if (this.state.tipoSelect != "traspaso") {
      return <View />
    }
    return <>
      <SView col={"xs-12"} height={16}></SView>
      <SView col="xs-11 md-6 xl-4">
        <SInput
          editable={false}
          {...{

            label: `${this.state.cuenta.descripcion}`,
            // type: "select",
            customStyle: "calistenia",
            isRequired: true,
            placeholder: "Cuenta",
            style: {
              height: 50,
            },


          }}
          value={this.state.cuenta.codigo}
          onPress={() => {
            // if (this.props.preventEdit) return;
            SPopupOpen({
              key: "selectbanco",
              content: <BancoSelect onSelect={(cuenta_banco) => {
                SPopupClose("selectbanco");
                // if (!this.props.preventEdit) {
                //     if (!cuenta) {
                //         Actions.SucursalTipoPagoCuentaBanco.registro({
                //             key_sucursal: this.props.key_sucursal,
                //             key_tipo_pago: obj.key,
                //             key_cuenta_banco: cuenta_banco.key
                //         }, this.props)
                //     } else {
                //         Actions.SucursalTipoPagoCuentaBanco.editar({
                //             ...cuenta,
                //             key_cuenta_banco: cuenta_banco.key
                //         }, this.props)
                //     }
                // }
                this.state.cuenta = cuenta_banco;
                this.setState({ ...this.state });
              }} />
            })
            // this.props.navigation.navigate("BancoPage", {
            //     onSelect: (cuenta) => {

            //     }
            // });
          }} />
      </SView>
      <SView col={"xs-12"} height={16}></SView>
    </>
  }

  render() {
    var reducer = this.props.state[ReducerName]
    if (reducer.estado == "exito" && reducer.type == "registro") {
      reducer.estado = "";
      SNavigation.goBack();
      // this.props.navigation.goBack();
    }
    if (reducer.estado == "exito" && reducer.type == "editar") {
      reducer.estado = "";
      SNavigation.goBack();
      // this.props.navigation.goBack();
    }
    return (
      <SPage hidden
        disableScroll
      >
        <BarraSuperior goBack={() => {
          SNavigation.goBack();
        }} />
        <SScrollView2
          style={{ width: "100%" }}
          disableHorizontal
        >
          <SView col={"xs-12"} center>

            {/* <Sucursal navigation={this.props.navigation}
                            key_sucursal={this.state.key_sucursal}
                            sucursal={this.state.sucursal}
                            key_caja={this.state.key_caja}
                            setSucursal={(suc) => {
                                this.setState({ sucursal: suc, key_sucursal: suc.key });
                            }} /> */}

            <TipoMovimiento value={this.state.tipoSelect} onChange={(tipo) => {
              this.setState({ tipoSelect: tipo })
            }} />
            {this.getBancoSelect()}

            <SForm
              props={{
                variant: "center",
                col: "xs-11 md-6 xl-4",
                // direction: "row",
              }}
              inputProps={{
                customStyle: "calistenia",
              }}
              inputs={{
                monto: {
                  type: 'money',
                  label: 'monto',
                  placeholder: '0.00',
                  isRequired: true,
                  col: "xs-12",

                },
                descripcion: {
                  type: 'text',
                  label: 'motivo',
                  isRequired: true,
                  col: "xs-12",
                  multiline: true,
                  style: {
                    height: 100
                  }
                },
                fecha_on: {
                  type: 'date',
                  label: 'Fecha',
                  // placeholder: '0.00',
                  defaultValue: new SDate().toString("yyyy-MM-dd"),
                  isRequired: true,
                  col: "xs-12",

                },
              }}
              onSubmitProps={{
                type: (this.state.tipoSelect != "ingreso" ? "danger" : "success")
              }}
              onSubmit={(data) => {
                if (this.state.tipoSelect == "traspaso") {
                  if (!this.state.cuenta.key) {
                    SPopup.alert("Seleccione la cuenta a transferir")
                    return;
                  }
                  var object = {
                    component: component,
                    type: "traspaso",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: {
                      ...data,
                      fecha_on: data.fecha_on + new SDate().toString("Thh:mm:ss"),
                      tipo_movimiento: this.state.tipoSelect,
                      key_cuenta_banco: this.key_cuenta_banco,
                      key_cuenta_banco_to: this.state.cuenta.key,
                      key_tipo_gasto: "1",
                      key_tipo_pago: "1",
                      key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                      monto: data.monto,
                    },
                  }
                  SSocket.send(object)
                  return;
                }
                var object = {
                  component: component,
                  type: "registro",
                  estado: "cargando",
                  key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                  data: {
                    ...data,
                    fecha_on: data.fecha_on + new SDate().toString("Thh:mm:ss"),
                    tipo_movimiento: this.state.tipoSelect,
                    key_cuenta_banco: this.key_cuenta_banco,
                    key_tipo_gasto: "1",
                    key_tipo_pago: "1",
                    // Alvaro aqui agregue el estado, para que muestre
                    estado: "1",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    monto: data.monto * (this.state.tipoSelect != "ingreso" ? -1 : 1),
                  },
                }
                SSocket.send(object)
              }}
              onSubmitName={this.getName()}
            />
          </SView>
        </SScrollView2>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(CuentaBancoMovimientoRegistroPage);