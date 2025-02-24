import { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SImage, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import * as SImageImput from '../SImageImput';
class FotoPerfilUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var usuario = this.props.usuario;
    return (<TouchableOpacity style={{
      width: "90%",
      height: "90%",
      backgroundColor: STheme.color.card,
      // borderRadius: 8,
      borderColor: STheme.color.card,
      borderWidth: 4,
      borderRadius: "50%",
      overflow: "hidden",
    }} onPress={() => {
      if (this.props.disable) {
        return;
      }
      SImageImput.choseFile({
        servicio: "root",
        service: "usuario",
        component: "usuario",
        type: "subirFoto",
        estado: "cargando",
        key: usuario.key,
        key_usuario: usuario.key,
      }, (resp) => {
        this.props.dispatch({
          component: "image",
          type: "cambio",
          url: SSocket.api.root + "usuario_" + usuario.key,
        })
        // this.state.repaint = new Date().getTime()
        // this.setState({ ...this.state });
      });
    }}>
      {/* {"foto"} */}
      <SImage src={SSocket.api.root + "usuario/" + usuario.key} />
    </TouchableOpacity>
    )
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(FotoPerfilUsuario);
