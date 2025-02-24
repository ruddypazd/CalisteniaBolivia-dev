
import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SLoad, SNavigation, SPage, STable2 } from 'servisofts-component';
import Parent from "..";
import Model from '../../../../../Model';
class DispositivoUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.key = SNavigation.getParam("key");
  }

  getData() {
    if (!this.key) return;
    if (this.state.data) return this.state.data;
    if (this.state.load) return;
    this.state.load = true;

    Parent.Actions.getUsuariosActivos(this.key).then((resp) => {
      this.state.load = false;
      if (resp.estado == "exito") {
        this.setState({ data: resp.data })
      }
    }).catch((e) => {
      this.state.load = false;
      console.log(e);
    })
  }

  getTable() {
    var data = this.getData();
    if (!data) return <SLoad />

    var usrs = Model.usuario.Action.getAll();
    if (!usrs) return <SLoad />
    {/* TODO: ricky and ruddy ver porque no carga */ }

    return <STable2
      rowHeight={30}
      limit={10}
      header={[
        { key: "index", label: "#", width: 30 },
        { key: "codigo", label: "Pin", width: 50 },
        {
          key: "key_usuario", label: "Usuario", width: 300, render: (itm) => {
            var usuario = usrs[itm];
            return usuario?.Nombres + " " + usuario?.Apellidos
          }
        },
        {
          key: "key_usuario-1", label: "Usuario", width: 250
        },
        {
          key: "fecha_on", label: "Fecha on", order: "desc", width: 150, render: (itm) => {
            return !itm ? "" : new SDate(itm).toString()
          }
        },
        {
          key: "fecha_edit", label: "Fecha edit", order: "desc", width: 150, render: (itm) => {
            return !itm ? "" : new SDate(itm).toString()
          }
        },

      ]}
      data={data}
    />
  }
  render() {
    return (
      <SPage title={"Usuarios del molinete"} disableScroll>
        {this.getTable()}
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(DispositivoUsuarios);