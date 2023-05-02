import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
  {name: 'Temprium.db', location: 'default'},
  () => {},
  error => {
    console.log(error);
  },
);

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Usuarios (Id_usu INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, contrasena TEXT NOT NULL)'
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS HORAS (Id_hor INTEGER PRIMARY KEY AUTOINCREMENT, Usuario INTEGER NOT NULL, Tipohoras TEXT NOT NULL, Horas INTEGER NOT NULL, minutos INTEGER NOT NULL, Categoria TEXT NOT NULL, Dia DATE NOT NULL, Clase TEXT NOT NULL, FOREIGN KEY (Usuario) REFERENCES Usuarios(Id_usu))'
  );
});

export function addUsuario(email, contrasena) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Usuarios(email,contrasena) VALUES (?,?)',
        [email, contrasena],
        (_, results) => {
          console.log('Datos insertados correctamente');
          resolve(results);
        },
        (_, error) => {
          console.log(`Error adding todo: ${error}`);
          reject(error);
        },
      );
    });
  });
}

export function addHoras(usuario, tipoHoras, horas, minutos, categoria, dia, clase) {
  return new Promise((resolve, reject)=>db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO HORAS (Usuario,Tipohoras,Horas,minutos,Categoria,Dia,Clase) VALUES (?,?,?,?,?,?,?)',
      [usuario, tipoHoras, horas, minutos, categoria, dia, clase],
      (_, results) => {
        console.log('Horas añadidas correctamente');
        resolve(results)
      },
      (_, error) => {
        console.log(`Error adding todo: ${error}`);
        reject(error)
      },
    );
  })
  );
}

export function getAllHoras(usuario, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM HORAS INNER JOIN USUARIOS ON HORAS.Usuario = USUARIOS.Id_usu AND USUARIOS.email =?',
      [usuario],
      (_, results) => {
        const todos = [];
        for (let i = 0; i < results.rows.length; i++) {
          todos.push(results.rows.item(i));
        }
        callback(todos);
      },
      (_, error) => {
        console.log(`Error getting todos: ${error}`);
      },
    );
  });
}

export function selectHoras(
  tipoHoras,
  usuario,
  horas,
  minutos,
  categoria,
  dia,
  clase,
  solucion,
  error,
) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM HORAS INNER JOIN USUARIOS ON HORAS.Usuario = USUARIOS.Id_usu WHERE HORAS.Tipohoras =? AND HORAS.Horas=? AND HORAS.minutos=? AND HORAS.Categoria=? AND HORAS.Dia=? AND HORAS.Clase=?  AND USUARIOS.email =?',
      [tipoHoras, horas, minutos, categoria, dia, clase, usuario],
      (_, results) => {
        const todos = [];
        for (let i = 0; i < results.rows.length; i++) {
          todos.push(results.rows.item(i));
        }
        solucion(todos);
      },
      err => {
        error(err);
      },
    );
  });
}

export function getIdUsuario(usuario, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT Id_usu FROM USUARIOS WHERE email=?',
      [usuario],
      (_, results) => {
        const id = results.rows.item(0).Id_usu;
        callback(id);
      },
      error => {
        console.log('Error al obtener el id del usuario: ', error.message);
      },
    );
  });
}



export function getUsuemail(db, usuario, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT email FROM USUARIOS WHERE email=?',
      [usuario],
      (tx, results) => {
        const id = results.rows.item(0).email;
        callback(id);
      },
      (error) => {
        console.log('Error al obtener el email del usuario: ', error.message);
      }
    );
  });
};

export function verificarUsuario(email, contrasena) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Usuarios WHERE email = ? AND contrasena = ?',
        [email, contrasena],
        (_, results) => {
          const numRows = results.rows.length;
          if(numRows > 0){
            resolve(numRows > 0);
            console.log("rows " + numRows);

          } else {
            console.log("No hay datos");
          }
        },
        (_, error) => {
          console.log(`Error verificando el usuario: ${error}`);
          reject(error);
        }
      );
    });
  });
}

export function updateUsu(db, nuevoemail, nuevacontrasena, email) {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE USUARIOS SET emai=?, contrasena=? WHERE email=?',
      [nuevoemail, nuevacontrasena, email],
      (tx, results) => {
        console.log('Usuario modificado correctamente');
      },
      (error) => {
        console.log('Error al actualizar el usuario: ', error.message);
      }
    );
  });
}

export function existeUsuario(email, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Usuarios WHERE email = ?',
      [email],
      (_, results) => {
        const numRows = results.rows.length;
        callback(numRows > 0);
      },
      (_, error) => {
        console.log(`Error verificando si existe el usuario: ${error}`);
        callback(false);
      }
    );
  });
}

export function updateHoras(db, Tipohoras, horas, minutos, categoria, dia, clase, email) {
  getIdUsuario(db, email, (id_usuario) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE Horas SET TipoHoras = ?, Horas = ?, minutos = ?, Categoria = ?, Dia = ?, Clase = ? WHERE Usuario = ?',
        [Tipohoras, horas, minutos, categoria, dia, clase, id_usuario],
        (tx, results) => {
          console.log('Horas modificado correctamente');
        },
        (error) => {
          console.log('Error al actualizar las horas: ', error.message);
        }
      );
    });
  });
};

export function deleteHoras(db, email) {
  getIdUsuario(db, email, (id_usuario) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE * FROM HORAS WHERE Usuario = ?',
        [id_usuario],
        (tx, results) => {
          console.log('Horas borradas correctamente');
        },
        (error) => {
          console.log('Error al borrar las horas: ', error.message);
        }
      )
    });
  });
};


