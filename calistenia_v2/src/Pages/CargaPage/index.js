import React, { Component } from 'react';
import { SPage, SText, SThread, SView, SNavigation, STheme, SIcon } from 'servisofts-component';
import Usuario from '../Usuario';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import LogoAnimado from './LogoAnimado';

class CargaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        new SThread(2500, "cargaHilo", true).start(() => {
            if (!Usuario.Actions.getUsuarioLogueado(this.props)) {
                SNavigation.replace("presentacion");
            } else {
                SNavigation.replace("inicio");

            }
        });
    }
    render() {

        return (
            <SPage
                hidden
                title="CargaPage"
                disableScroll
            >
                <SView col={"xs-12"} center flex>
                    <SView col={"xs-11 sm-10 md-9 lg-8 xl-6"} height={300}>
                        <LogoAnimado />
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CargaPage);