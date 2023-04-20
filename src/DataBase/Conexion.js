import { SQLite } from "react-native-sqlite-storage";

const databaseName = 'Temprium.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'My Database';
const databaseSize = 200000;

const db = SQLite.openDatabase(
  databaseName,
  databaseVersion,
  databaseDisplayName,
  databaseSize,
); 

const closeDatabase = (db) => {
  if(db){
    db.close();
  }
};

function addUsuario(db,usuario,contrasena){
    db.transaction((tx) =>{
        tx.executeSql(
            'INSERT INTO USUARIO (title) VALUES (?,?)',
      [usuario,contrasena],
      (tx, results) => {
        console.log('Todo added successfully');
      },
      (tx, error) => {
        console.log(`Error adding todo: ${error}`);
      },
        )
    })
}

function addHoras(db,usuario,tipoHoras,horas,minutos,categoria,dia,clase){
  db.transaction((tx) =>{
      tx.executeSql(
          'INSERT INTO HORAS (title) VALUES (?,?,?,?,?,?,?)',
    [usuario,tipoHoras,horas,minutos,categoria,dia,clase],
    (tx, results) => {
      console.log('Todo added successfully');
    },
    (tx, error) => {
      console.log(`Error adding todo: ${error}`);
    },
      )
  })
}



function getAllHoras(db,usuario,callback) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM HORAS INNER JOIN USUARIOS ON HORAS.Usuario = USUARIOS.Id_usu AND USUARIOS.email =?',
        [usuario],
        (tx, results) => {
          const todos = [];
          for (let i = 0; i < results.rows.length; i++) {
            todos.push(results.rows.item(i));
          }
          callback(todos);
        },
        (tx, error) => {
          console.log(`Error getting todos: ${error}`);
        },
      );
    });
  }

function selectHorasPorTipoUsuario(db,tipoHoras,usuario){
    db.transaction((tx)=> {
      tx.executeSql(
       'SELECT * FROM HORAS INNER JOIN USUARIOS ON HORAS.Usuario = USUARIOS.Id_usu WHERE HORAS.Tipohoras =? AND USUARIOS.email =?',
       [tipoHoras, usuario],
       (tx, results) => {
        const todos = [];
        for (let i = 0; i < results.rows.length; i++) {
          todos.push(results.rows.item(i));
        }
        solucion(todos);
       },
       (err) => {
        error(err);
       }
      );
    });
};
  

  export default {
    closeDatabase,
    addHoras,
    addUsuario,
    getAllHoras,
    selectHorasPorTipoUsuario
  };