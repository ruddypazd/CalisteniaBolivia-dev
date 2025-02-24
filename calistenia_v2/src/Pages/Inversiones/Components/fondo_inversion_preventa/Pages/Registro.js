import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SNavigation, SPage, SText, SView, SLoad, SDate, STheme } from 'servisofts-component';
import Parent from '../index';
import SSocket from 'servisofts-socket';

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");

        Parent.struct.fk.map((item) => {
            this[item] = SNavigation.getParam(item);
        })
    }
    createStruct() {
        var resp = {};
        Parent.struct.metas.map((item) => {
            if (item.hidden) return null;
            resp[item.key] = {
                label: item.label,
                isRequired: item.required,
                type: item.type,
                defaultValue: this.data[item.key]
            };

        })
        return resp;
    }
    getContent() {
        this.data = {};
        if (this.key) {
            this.data = Parent.Actions.getByKey(this.key, this.props);
            if (!this.data) return <SLoad />
        } else {
            this.data = {};
            var params = {}
            Parent.struct.fk.map((item) => {
                if (this[item]) this.data[item] = this[item];
            })

        }
        return <SForm
            center
            ref={(form) => { this.form = form; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                ...this.createStruct(),
            }}


            onSubmitName={"Guardar"}
            onSubmit={(values) => {
                values.fecha = new SDate(values.fecha, "yyyy-MM-dd").toString();
                if (this.key) {
                    Parent.Actions.editar({ ...this.data, ...values }, this.props);
                } else {
                    Parent.struct.fk.map((item) => {
                        values[item] = this[item];
                    })
                    Parent.Actions.registro(values, this.props);
                }
            }}
        />
    }

    render() {
        var reducer = this.props.state[Parent.component + "Reducer"];
        if (reducer.type == "registro" || reducer.type == "editar") {
            if (reducer.estado == "exito") {
                if (reducer.type == "registro") this.key = reducer.lastRegister?.key;
                if (this.form) {
                    this.form.uploadFiles(SSocket.api.root + "upload/" + Parent.component + "/" + this.key);
                }

                reducer.estado = "";
                SNavigation.goBack();
            }
        }

        return (
            <SPage title={'Nueva preventa'} center>
                <SView height={30}></SView>
                <SText col={"xs-11 sm-9 md-7 lg-5 xl-4"} color={STheme.color.lightGray} center>{`Desde la siguiente fecha las acciones vendidas recibirán una comisión de el siguiente monto por cada paquete vendido.`}</SText>
                <SHr />
                <SHr />
                {this.getContent()}
                <SHr />
                <SHr />

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);