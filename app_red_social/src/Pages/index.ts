import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import carga from "./carga"
import restaurante from './restaurante';
import explorar from './explorar';
import favoritos from './favoritos';
import mapa from './mapa';
import billetera from './billetera';
import login from "./login";
import registro from './registro';
import direccion from './direccion';
import pedido from './pedido';
import contacto from './contacto';
import novedades from './novedades';
import compras from './compras';
import perfil from './perfil';
import tarjeta from './tarjeta';
import notificaciones from './notificaciones';
import chat from './chat';
import ajustes from './ajustes';
import ayuda from './ayuda';
import filtros from './filtros';
import cupones from './cupones';
import test from './test';
export default SPage.combinePages("/", {
  "": carga,
  "root": root,
  "carga": carga,
  ...login,
  "test": test,
  "contacto": contacto,
  "novedades": novedades,
  "compras": compras,
  notificaciones,
  explorar,
  favoritos,
  mapa,
  ajustes,
  filtros,
  ...restaurante,
  ...billetera,
  ...registro,
  ...direccion,
  ...pedido,
  ...perfil,
  ...tarjeta,
  ...chat,
  ...ayuda,
  ...cupones
  // ...ayuda
});