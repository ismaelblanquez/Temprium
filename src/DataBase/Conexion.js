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
            'INSERT INTO USUARIO (email,contrasena) VALUES (?,?)',
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
          'INSERT INTO HORAS (Usuario,Tipohoras,Horas,minutos,Categoria,Dia,Clase) VALUES (?,?,?,?,?,?,?)',
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

function getIdUsuario(db,usuario,callback){
  db.transaction((tx)=> {
    tx.executeSql(
      'SELECT Id_usu FROM USUARIOS WHERE email=?',
      [usuario],
      (tx,results) => {
        const id = results.rows.item(0).Id_usu;
        callback(id);
      },
      (error)=> {
       console.log('Error al obtener el id del usuario: ',error.message);  
      }
    );
  });
};

function getUsuemail(db,usuario,callback){
  db.transaction((tx)=> {
    tx.executeSql(
      'SELECT email FROM USUARIOS WHERE email=?',
      [usuario],
      (tx,results) => {
        const id = results.rows.item(0).email;
        callback(id);
      },
      (error)=> {
       console.log('Error al obtener el email del usuario: ',error.message);  
      }
    );
  });
};
  

function updateUsu(db,nuevoemail,nuevacontrasena,email){
  db.transaction((tx)=>{
    tx.executeSql(
      'UPDATE USUARIOS SET emai=?, contrasena=? WHERE email=?',
      [nuevoemail,nuevacontrasena,email],
      (tx,results)=>{
        console.log('Usuario modificado correctamente');
      },
      (error)=>{
        console.log('Error al actualizar el usuario: ',error.message);
      }
    );
  });
}

function updateHoras(db,Tipohoras,horas,minutos,categoria,dia,clase,email){
  getIdUsuario(db,email, (id_usuario)=>{
    db.transaction((tx)=>{
      tx.executeSql(
        'UPDATE Horas SET TipoHoras = ?, Horas = ?, minutos = ?, Categoria = ?, Dia = ?, Clase = ? WHERE Usuario = ?',
        [Tipohoras,horas,minutos,categoria,dia,clase,id_usuario],
        (tx,results)=>{
          console.log('Horas modificado correctamente');
        },
        (error)=>{
          console.log('Error al actualizar las horas: ',error.message);
        }
      );
  });
});
};

function deleteHoras(db,email){
 getIdUsuario(db,email, (id_usuario) => {
  db.transaction((tx)=> {
    tx.executeSql(
      'DELETE * FROM HORAS WHERE Usuario = ?',
      [id_usuario],
      (tx,results)=>{
        console.log('Horas borradas correctamente');
      },
      (error)=>{
        console.log('Error al borrar las horas: ',error.message);
      }
    )
  });
 });
};




  export default {
    db,
    closeDatabase,
    addHoras,
    addUsuario,
    getAllHoras,
    selectHorasPorTipoUsuario,
    getIdUsuario,
    getUsuemail,
    updateUsu,
    updateHoras,
    deleteHoras
  };