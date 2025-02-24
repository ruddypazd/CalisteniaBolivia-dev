export default {
  debug: true,
  name: 'calistenia',
  // -- Producción --
  // host: '192.168.2.2',
  host: 'calistenia.servisofts.com',
  ssl: true,
  // -- Producción --
  // host: '192.168.2.1',
  // ssl: false,
  // --CONFIGURACIONES--
  port: {
    native: 10018,
    web: 20018,
    http: 30018,
  },
  cert: "MIID4DCCAsigAwIBAgIEYPcLQjANBgkqhkiG9w0BAQsFADCBsTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxEzARBgNVBAsMCmNhbGlzdGVuaWExIjAgBgNVBAMMGWNhbGlzdGVuaWEuc2Vydmlzb2Z0cy5jb20xJzAlBgkqhkiG9w0BCQEWGHJpY2t5LnBhei5kLjk3QGdtYWlsLmNvbTAeFw0yMTA3MjAxNzQzMzBaFw0yMTA3MjExNzQzMzBaMIGxMQswCQYDVQQGEwJCTzESMBAGA1UECAwJQXYgQmFuemVyMRMwEQYDVQQHDApTYW50YSBDcnV6MRcwFQYDVQQKDA5TZXJ2aXNvZnRzIFNSTDETMBEGA1UECwwKY2FsaXN0ZW5pYTEiMCAGA1UEAwwZY2FsaXN0ZW5pYS5zZXJ2aXNvZnRzLmNvbTEnMCUGCSqGSIb3DQEJARYYcmlja3kucGF6LmQuOTdAZ21haWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApmh2C08WWdchIIvherrb85fwRsRearKZvFCViF4z+iMF/hO8+/I5cJBAdrw/ieNcSUq1QdhTgRmwb3GYf156vJomWw755300Ij3cvnGTPvVwKTmi6MYnpK+37cOfKQzxXQ+X8BCkOLJRvwcEidELZkcq1X7vlc5NOy3K+Ik59IDjWFzjTl1/or9YJh0aW1saRUTpPxit+49WdSQS5Xyd6pY6gyJ05wHz0qVR+S9tBVwAx+S+snS+1XYFozn2yopcaMZ0Il819QCV4Gio9CY743jl/8hm6IYFoxVOjUwkPMFEakXN+4d8xVP016Orah4qhSlGoym2m5SteHkkeZct6wIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBSjd1xKe7nb02RnDRyTwC4qtkBdifkpDLPkGtpAPIGAnBiWGirqEZRc1uhMPxTYEpd5jTHeI0+vmtHRrP7jZKEnaV10z0q+jd27stvqUDXTtFPyUWXYGeJygOeokFeB2tzS+WDuh3idqt0g8cNxbmBX0qdOCnxZ+mQm6R7Yr8Up2vORC1Ay8noaSc8xwG8XA7vBSLOitKyDrqFou45bJquwCvxiIPkZ9+R32rRgVbUQxxtFdUUqzlAzCaYcQkenHTjWMiHy3jAflenOKQOe59M3NigcNhhalLWI7vHNaFLgPUIde/gAC8JLaebDBWr0R/F6aiw8Sk5SccUD7jfnAdT",
  apis: {
    roles_permisos: 'https://rolespermisos.servisofts.com/http/',
    empresa: 'https://empresa.servisofts.com/http/',
    inventario: 'https://inventario.servisofts.com/http/',
    compra_venta: 'https://compraventa.servisofts.com/http/',
    rp: "https://rolespermisos.servisofts.com/http/",
    contabilidad: "https://contabilidad.servisofts.com/http/",
    // contabilidad: "http://192.168.2.1:30011/",
  }
}
