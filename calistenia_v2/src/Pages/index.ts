import { SPage, SPageListProps } from 'servisofts-component'

// PAGES OLD //
import InicioPage from "./InicioPage";
import CargaPage from './CargaPage/index';
import Presentacion from './Presentacion';
import Usuario from './Usuario';
import SSRolesPermisosPages from '../SSRolesPermisos/Pages';
import AjustesPage from './AjustesPage';
import Sucursal from './Sucursal';
import TipoPago from './TipoPago';
import Paquete from './Paquete';
import PaqueteVenta from './PaqueteVenta';
import Servicio from './Servicio';
import Banco from './Banco';
import Caja from './Caja';
import Entrenamiento from './Entrenamiento';
import Asistencia from './Asistencia';
import Finanza from './Finanza';
import DashBoard from './DashBoard';
import Manual from './Manual';
import Billetera from './Billetera';
import Test from './Test';
import prorroga from './prorroga';
import Inversiones from './Inversiones';
import Services from '../Services';
import Client from '../Client';
import clientes_activos from './clientes_activos';
// PAGES NEW//
import root from './root';
import empresa from "./empresa";
import contabilidad from './contabilidad';
import rol from './rol';

const newPages = SPage.combinePages("/", {
    "": root,
    "test": Test,
    ...empresa,
    ...contabilidad,
    ...rol
});


export default {
    ...newPages,
    // "inicio": InicioPage,
    "inicio": root,
    "carga": CargaPage,
    "presentacion": Presentacion,
    "clientes_activos": clientes_activos,
    AjustesPage,
    ...Usuario.Pages,
    ...Sucursal.Pages,
    // ...SSRolesPermisosPages,
    ...TipoPago.Pages,
    ...Paquete.Pages,
    ...Servicio.Pages,
    ...Banco.Pages,
    ...Caja.Pages,
    ...PaqueteVenta.Pages,
    ...Entrenamiento.Pages,
    ...Asistencia.Pages,
    ...Finanza.Pages,
    ...DashBoard.Pages,
    ...Manual.Pages,
    ...Billetera.Pages,
    ...prorroga.Pages,
    ...Inversiones.Pages,
    ...Services.Pages,
    ...Client.Pages,

};