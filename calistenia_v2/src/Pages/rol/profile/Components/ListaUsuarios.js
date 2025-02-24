import { SNavigation } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import Model from '../../../../Model';

const Parent = {
    name: "Usuaio del rol",
    path: `/usuario`,
    model: Model.usuario
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            type: "componentTitle",
            Parent: Parent,
            title: "Usuarios",
            excludes: ["key", "fecha_on", "key_usuario", "Password", "Telefono", "Correo", "CI"]
        });
    }

    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    onNew() {
        SNavigation.navigate("/usuario/new", {
            key_rol: this.props.key_rol, onSelect: (itm) => {
                this.props.onSelect(itm);
                SNavigation.goBack();
            }
        });
    }
    // $allowTable() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    // }
    // $allowAccess() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    // }
    $filter(data) {
        return data.estado != "0"
    }
    $getData() {
        var usuarios = Model.usuario.Action.getAll();
        var usuarioRol = Model.usuarioRol.Action.getAllByKeyRol(this.props.key_rol);
        if (!usuarios) return null;
        if (!usuarioRol) return null;
        var obj_final = {};
        Object.values(usuarioRol).map((obj) => {
            var enabled = usuarios[obj.key_usuario]
            if (enabled) {
                obj["usuarioRol"] = obj;
                obj_final[obj.key] = enabled
            }
        })
        return obj_final;
    }
}
export default connect(index);