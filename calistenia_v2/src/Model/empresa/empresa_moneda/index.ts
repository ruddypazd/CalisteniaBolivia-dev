import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        service: "empresa",
        component: "empresa_moneda"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "descripcion": { type: "text", notNull: true, editable: true, label: "Descripcion" },
        "observacion": { type: "text", editable: true, label: "Observacion" },
        "key_empresa": { type: "text", fk: "empresa", notNull: true },
        "tipo_cambio": { type: "text", notNull: true, editable: true, },
        "fecha_on": { type: "timestamp", label: "F. registro" },
        "estado": { type: "integer" },
        "key_usuario": { type: "text", fk: "usuario" },
    },
    Action,
    Reducer,
});