import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SPage, SText, STheme, SView, SNavigation, SPopup } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
export type PublicacionPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<PublicacionPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;

        this.props.onPress(this.props.data)
    }

    renderAuthor() {
        // let user = Model.usuario.Action.getByKey(this.props.data.key_usuario);
        let user = {}
        return <SView col={"xs-12"} row height={50} center>
            <SView width={50} height center >
                <SView style={{
                    backgroundColor: STheme.color.card, borderRadius: 100, width: 40, height: 40, overflow: "hidden"
                }}>
                    <SImage src={Model.usuario._get_image_download_path(SSocket.api, this.props.data.key_usuario)} style={{
                        resizeMode: "cover"
                    }} />
                </SView>
            </SView>
            <SView flex height style={{
                justifyContent: "center"
            }}>
                <SText bold>{user?.Nombres} {user?.Apellidos}</SText>
            </SView>
            <SView width={30} colSquare center onPress={() => {
                SPopup.alert("Ajustes")
            }}>
                <SIcon name={"Menu2"} fill={STheme.color.text} />
            </SView>
        </SView>
    }
    renderImage() {
        return <SView col={"xs-12"} colSquare>
            <SImage src={Model.publicacion._get_image_download_path(SSocket.api, this.props.data.key)} style={{
                resizeMode: "cover"
            }} />
        </SView>
    }
    renderActions() {
        const size = 28;
        return <SView col={"xs-12"} row height={size} center>
            <SView width={size} height>
                <SIcon name={'Heart'} height={24} fill={STheme.color.text} />
            </SView>
            <SView width={size / 2} />
            <SView width={size} height>
                <SIcon name={'Comment'} height={24} fill={STheme.color.text} />
            </SView>
            <SView flex />
            {/* <SView width={size/2} />
            <SView width={size} height>
                <SIcon name={'Heart'} fill={STheme.color.text} />
            </SView>
            <SView flex />
            <SView width={size} height>
                <SIcon name={'Comment'} fill={STheme.color.text} />
            </SView> */}
        </SView>
    }
    renderTitle() {
        return <SView col={"xs-12"}>
            <SText>{this.props.data.descripcion}</SText>
        </SView>
    }
    renderLikes() {
        return <SView col={"xs-12"}>
            <SText bold>{"862 Me gusta"}</SText>
        </SView>
    }
    renderComments() {
        return <SView col={"xs-12"}>
            <SText bold color={STheme.color.lightGray}>{"Ver 1 comentario"}</SText>
        </SView>
    }
    render() {
        return (<SView col={"xs-12"} >
            {/* <SText>{JSON.stringify(this.props.data)}</SText> */}
            {this.renderAuthor()}
            <SHr h={8} />
            {this.renderImage()}
            <SHr h={16} />
            {this.renderActions()}
            <SHr h={16} />
            {this.renderLikes()}
            <SHr />
            {this.renderTitle()}
            <SHr />
            {/* {this.renderComments()} */}
            {/* <SHr /> */}
        </SView >
        );
    }
}
export default (index);