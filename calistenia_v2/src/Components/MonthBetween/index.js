import { Component } from 'react';
import { SDate, SIcon, SInput, STheme, SView } from 'servisofts-component';

type TypeProps = {
  fecha_inicio: "yyyy-MM-dd",
  fecha_fin: "yyyy-MM-dd",
  onChange: Function,
}
export default class MonthBetween extends Component<TypeProps> {
  constructor(props) {
    super(props);
    var fecha_inicio = new SDate();
    fecha_inicio.setDay(1)
    if (this.props.fecha_inicio) {
      fecha_inicio = new SDate(this.props.fecha_inicio, "yyyy-MM-dd");
    }
    var fecha_fin = new SDate();
    if (this.props.fecha_fin) {
      fecha_fin = new SDate(this.props.fecha_fin, "yyyy-MM-dd");
    }
    this.state = {
      fecha_inicio: fecha_inicio.toString("yyyy-MM-dd"),
      fecha_fin: fecha_fin.toString("yyyy-MM-dd"),
    };
    this.props.onChange(this.state.fecha_inicio, this.state.fecha_fin);
  }
  onChange(fi, ff) {
    if (this.props.onChange) {
      if (this.state.fecha_inicio != fi || this.state.fecha_fin != ff) {
        this.state.fecha_inicio = fi;
        this.state.fecha_fin = ff;
        this.props.onChange(this.state.fecha_inicio, this.state.fecha_fin);

      }

      this.setState({ ...this.state });
    }
  }
  render() {
    return (
      <SView col={"xs-12"}
        height={40}
        style={{
          height: 40,
          // backgroundColor: "#ff0000",
          alignItems: "center",
          justifyContent: "center"
        }} row>
        <SView col={"xs-6 md-4 xl-3"} style={{ height: "100%", padding: 4, }} row center>


          <SInput
            col={"xs-10"}
            type="date_my"
            // customStyle: "primary",
            placeholder="Fecha Inicio"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 4,
              backgroundColor: STheme.color.card,
              borderColor: "#666"
            }}
            defaultValue={this.state.fecha_inicio}
            onChangeText={(val) => {
              var date = new SDate(val + "-01", "yyyy-MM-dd");
              let fecha_ini = date.toString("yyyy-MM-dd");
              date.addMonth(1)
              date.addDay(-1);
              this.onChange(fecha_ini, date.toString("yyyy-MM-dd"));
              // this.onChange("fecha_fin", val+"-31");
              // this.state.fecha_inicio = val
              // this.setState({ ...this.state })
            }}
          />
          <SView col={"xs-2"} backgroundColor={"transparent"}>

            <SIcon name={"Calendar"} style={{ width: 32, height: 32 }} />
          </SView>
        </SView>
        {/* <SView col={"xs-6 md-4 xl-3"} style={{ height: "100%", padding: 4, }}>
                    <SInput
                        type="date_my"
                        // customStyle: "primary",
                        placeholder="Fecha Fin"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 4,
                            backgroundColor: STheme.color.card,
                            borderColor: "#666"
                        }}
                        defaultValue={this.state.fecha_fin}
                        onChangeText={(val) => {
                            this.onChange("fecha_fin", val);
                            // this.state.fecha_fin = val
                            // this.setState({ ...this.state })
                        }}
                    />
                </SView> */}


      </SView>
    );
  }
}
