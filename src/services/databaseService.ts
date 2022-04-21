import EventEmitter = require('events');
import DataSource from '../config/dataSource';

class DatabaseService {
  public static emitter: EventEmitter = new EventEmitter();
  public static isConnected = false;

  public static async getConnection(callback = null, wait = false) {
    DatabaseService.handleConnectionError();
    return await DatabaseService.createConnection();
  }
  
  public static async createConnection() {
    return await DataSource.initialize().then(() => {
      DatabaseService.isConnected = true;
      console.log('info', 'database connected successfully');
    }).catch((err: Error) => {
      console.log('error', err)
      console.log('info', 'database connection error...retrying');
      DatabaseService.emitter.emit('DB_CONNECT_ERROR');
    });
  }
  
  public static async handleConnectionError() {
    DatabaseService.emitter.on('DB_CONNECT_ERROR', async () => {
      console.log('info', 'database connection error...retrying');
      setTimeout(async () => {
        await DatabaseService.createConnection();
      }, 3000)
    });
  }
}

export { DatabaseService };
