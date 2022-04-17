package component;

import org.eclipse.jetty.util.ArrayUtil;
import org.json.JSONArray;
import org.json.JSONObject;
import SocketCliente.SocketCliete;

/**
 * ZKTeco
 */
public class ZKTeco {

    public ZKTeco(JSONObject obj) {
        
        if (!obj.isNull("type")) {
            switch (obj.getString("type")) {
                case "init":
                    init(obj);
                    break;
                case "sincronizarAll":
                    sincronizarAll(obj);
                    break;
                case "sincronizarUsuario":
                    sincronizarUsuario(obj);
                    break;
                case "onEvent":
                    onEvent(obj);
                    break;
            }
        }
    }

    public static void onEvent(JSONObject obj){
        try{
            System.out.println("Evento...");
            System.out.println(obj.toString());
            
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public static boolean sincronizarUsuario(JSONObject obj){
        try{
            System.out.println("Sincronizando...");
            
            JSONObject cliente_activo = ClientesActivos.getbyKeyUsuario(obj.getJSONObject("data").getString("key_usuario"));
            String [] keys = JSONObject.getNames(cliente_activo);

            JSONObject send = new JSONObject();
            send.put("component", "permiso");
            send.put("type", "getAllUsuarios");
            send.put("estado", "cargando");
            send.put("key_permiso", "4f30c543-10d8-4566-b577-4d94442f217d");

            JSONArray lista = new JSONArray();
            if(keys!=null){
                lista = new JSONArray(keys.toString());
            }
            

            JSONObject roles_permisos = SocketCliete.sendSinc("roles_permisos", send);

            if(roles_permisos.getJSONObject("data").has(obj.getJSONObject("data").getString("key_usuario"))){
                lista.put(obj.getJSONObject("data").getString("key_usuario"));
            }            

            JSONObject objSend = new JSONObject();
            objSend.put("component", "punto_venta");
            objSend.put("type", obj.getString("type"));
            objSend.put("data", lista);
            objSend.put("estado", "cargando");
            objSend.put("delete_all", false);
            SocketCliete.send("zkteco", objSend.toString());

        }catch(Exception e){
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
        }
        return false;
    }
    
    public static boolean sincronizarAll(JSONObject obj){
        try{
            System.out.println("Sincronizando...");
            
            JSONObject clientes_activos = ClientesActivos.getAll();
            String [] keys = JSONObject.getNames(clientes_activos);
            obj.put("component", "punto_venta");
            obj.put("data", new JSONArray(keys));
            obj.put("estado", "cargando");
            obj.put("delete_all", true);
            SocketCliete.send("zkteco", obj.toString());

        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean init(JSONObject obj){
        System.out.println("init...");
        if(obj.getString("estado").equals("cargando")){
            System.out.println("cargando...");
            return false;
        }
        if(obj.getString("estado").equals("error")){
            System.out.println("Error al iniciar ZKTeco");
            return false;
        }
        System.out.println(obj.toString());
        return false;
    }
    public static boolean dos(){
        
        System.out.println("Sincronizando...");
        JSONObject obj = new JSONObject();
        obj.put("component", "dispositivo");
        obj.put("type", "getAll");
        SocketCliete.send("zkteco", obj.toString());

        return false;
    }
    
}