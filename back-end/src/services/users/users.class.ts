//import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';

//let allergensMap = new Map();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host  : 'mysql.stud.ntnu.no',
  user  : 'fs_tdt4140_1_gruppe40',
  password: 'vielskerPUlol40',
  database: 'fs_tdt4140_1_gruppe40_mddb'
})

/*connection.connect( (err: any) => {
  if (err) throw err;
  connection.query(`INSERT INTO users VALUES ()`, (err: any, results: any, fields: any) => {
    if (err) throw err;
      console.log("funker:)")
      console.log(results[0])
  })
})
 */
// Type interface for user
interface UserData {
  userId?: string;
  email: string;
  passwordHash: string;
  name?: string;
  allergens?: Map<string, boolean>;
}

export class createUser {
  
  /* const mysql = require('mysql');
  const connection = this.mysql.createConnection({
    host  : 'mysql.stud.ntnu.no',
    user  : 'fs_tdt4140_1_gruppe40',
    password: 'vielskerPUlol40',
    database: 'fs_tdt4140_1_gruppe40_mddb'
  }) */
/*   this.connection.connect( (err: any) => {
    if (err) throw err;
    connection.query(`INSERT INTO users VALUES ("userID", name, email, password, created_at, updated_at, is_admin, allergens)`, (err: any, results: any, fields: any) => {
      if (err) throw err;
        console.log("funker:)")
        console.log(results[0])
    })
  })   */
}

/* export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'users'
    });}
  
  create (data: UserData, params?: Params) {
    const { email, passwordHash, name, allergens } = data;
    const userData = {
      email,
      passwordHash,
      name,
      allergens
      };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  } */

    // CRUD - Create, Read, Update, Delete.
//}
