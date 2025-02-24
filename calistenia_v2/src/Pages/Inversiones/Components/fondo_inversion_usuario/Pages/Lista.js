import { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SMath, SNavigation, SPage, SPopup, STable2, SView } from 'servisofts-component';
import Parent from "..";
import Model from '../../../../../Model';
class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    Parent.struct.fk.map((item) => {
      this[item] = SNavigation.getParam(item);
    })
  }

  createStruct() {
    var struct = [];
    Parent.struct.metas.map((item) => {
      if (item.hidden) return null;
      struct.push({
        key: item.key,
        label: item.label,
        type: item.type,
        width: item.width
      })
    })
    return struct;
  }
  getLista() {
    var data = Parent.Actions.getAll(this.props);
    var usuarios = Model.usuario.Action.getAll();
    if (!data) return <SLoad />
    if (!usuarios) return <SLoad />
    console.log("alvaroski ", data);
    return <STable2
      header={[
        { key: "index", label: "#", width: 50 },
        { key: "key_usuario_inversionista", label: "Usuario", width: 150, render: (item) => { return usuarios[item]?.Nombres + " " + usuarios[item]?.Apellidos } },
        { key: "fecha_aprobacion", label: "Estado", width: 130, center: true, render: (itm) => { return itm ? "Aprovado" : "Pendiente" } },
        { key: "comision", label: "Comision", width: 130, center: true, render: (itm) => { return SMath.formatMoney(itm) } },
        { key: "inversion", label: "Inversion", width: 130, center: true, render: (itm) => { return SMath.formatMoney(itm) } },
        {
          key: "key-editar", label: "Editar", width: 50, center: true,
          component: (item) => {
            return <SView onPress={() => { SNavigation.navigate(Parent.component + "/registro", { key: item }) }}>
              <SIcon name={"Edit"} width={35} />
            </SView>
          }
        },


        {
          key: "key-eliminar", label: "Eliminar", width: 70, center: true,
          component: (key) => {
            return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Parent.Actions.eliminar(data[key], this.props) } }) }}>
              <SIcon name={'Delete'} />
            </SView>
          }
        },
        {
          key: "key_usuario_inversionista-ganancias", label: "Ganancias", width: 80, center: true,
          component: (item) => {
            return <SView onPress={() => {
              SNavigation.navigate("mis_inversiones/perfil", { key: this["key_fondo_inversion"], key_usuario: item });
            }}>
              <SIcon name={"Money"} width={35} />
            </SView>
          }
        },
        {
          key: "key-aprobar", label: "Aprobar", width: 70, center: true,
          component: (item) => {
            if (data[item].fecha_aprobacion) return "-";
            return <SView onPress={() => {
              SPopup.confirm({
                title: "aprobar", message: "¿Esta seguro de aprobar?", onPress: () => {
                  Parent.Actions.aprobar(data[item], this.props)
                }
              });
            }} >
              <SIcon name={"Alert"} fill={"#F1B10F"} width={35} />
            </SView >
          }
        },



      ]}
      filter={(data) => {
        if (data.estado != 1) return false;
        var isValid = true;
        Parent.struct.fk.map((item) => {
          if (this[item] != data[item]) isValid = false;
        })
        return isValid;
      }}
      data={data}
    />
  }

  render() {
    return (
      <SPage title={'Lista de ' + Parent.component} disableScroll>
        {this.getLista()}
        {/* <FloatButtom onPress={() => {
                    Parent.Actions._getReducer(this.props).estado = "";
                    var params = {}
                    Parent.struct.fk.map((item) => {
                        if (this[item]) params[item] = this[item];
                    })
                    SNavigation.navigate(Parent.component + "/registro", params);
                }} /> */}
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Lista);