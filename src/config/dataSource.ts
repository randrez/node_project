import config from '../config/config'
import { TYPE_DATABASE } from './constants'
import { DataSource } from 'typeorm'
import { Auth } from '../app/models/entities/Auth'
import { User } from '../app/models/entities/User'

const dbConfig = config[`${process.env.ENV}`];
const dataSource = new DataSource({
    type: TYPE_DATABASE,
    host: dbConfig.host,
    port: parseInt(dbConfig.port),
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities:[Auth, User]
})

export default dataSource