const constants = {
    webServer: {
      myLocal_Host: '127.0.100.1',
      myPort: 5001
    },
    corsOption: {
      origin: '*',                        //  Nur für development den * verwenden ansonsten bitte die exakte domain angeben z.B www.meineseite.de
      //  Sólo utilice el "*" para el desarrollo, de lo contrario, especifique el dominio exacto, por ejemplo: www.meineseite.de
      optionsSuccessStatus: 200           //  some legacy browsers (IE11, various SmartTVs) choke on 204
    },
    MongoDB: {
      URI: 'mongodb://localhost:27017/task_special'
    }
  }
  
  export default constants;