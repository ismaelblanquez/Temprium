import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase(
  { name: 'Temprium.db', location: 'default' },
  () => { },
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
  tx.executeSql(
    "INSERT OR IGNORE INTO Usuarios (email, contrasena) VALUES ('dummy@nosession.com', '92r8hfv2n9fuvy<9v8h')"
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
export function addHoras(Usuario, Tipohoras, Horas, minutos, Categoria, Dia, Clase) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO HORAS (Usuario,Tipohoras,Horas,minutos,Categoria,Dia,Clase) VALUES (?,?,?,?,?,?,?)',
        [parseInt(Usuario), Tipohoras, parseInt(Horas), parseInt(minutos), Categoria, Dia, Clase],
        (_, results) => {
          console.log("BBDD Usuario " + Usuario + " Tipo horas " + Tipohoras + " horas: " + Horas + " minutos: " + minutos + " Categoria: " + Categoria + " dia: " + Dia + " clase: " + Clase);
          console.log('Horas añadidas correctamente:', results);
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
  categoria,
  fechaInicio,
  fechaFin,
  clase,
) {
  return new Promise((resolve, reject) => {
    let consulta = '';
    let parametros = [];
    if (fechaInicio && fechaFin) {
      consulta = 'SELECT * FROM HORAS INNER JOIN USUARIOS ON HORAS.Usuario = USUARIOS.Id_usu WHERE HORAS.Tipohoras = ? AND HORAS.Categoria = ? AND HORAS.Dia BETWEEN ? AND ? AND HORAS.Clase = ? AND USUARIOS.email = ?';
      parametros = [tipoHoras, categoria,fechaInicio, fechaFin, clase, usuario];
    } else if (fechaInicio) {
      consulta = 'SELECT * FROM HORAS INNER JOIN USUARIOS ON HORAS.Usuario = USUARIOS.Id_usu WHERE HORAS.Tipohoras = ? AND HORAS.Categoria = ? AND HORAS.Dia = ? AND HORAS.Clase = ? AND USUARIOS.email = ?';
      parametros = [tipoHoras, categoria,fechaInicio, clase, usuario];
    }
    db.transaction(tx => {
      tx.executeSql(
        consulta,
        parametros,
        (_, results) => {
          const todos = [];
          for (let i = 0; i < results.rows.length; i++) {
            todos.push(results.rows.item(i));
          }
          resolve(todos);
        },
        err => {
          reject(err);
        },
      );
    });
  });
}


export function getIdUsuario(usuario, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT Id_usu FROM USUARIOS WHERE email=?',
      [usuario],
      (_, results) => {
        if (results.rows.length > 0) {
          const id = results.rows.item(0).Id_usu;
          callback(id);
        } else {
          console.log('No se encontraron resultados');
        }
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
          if (numRows > 0) {
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
export function buscarUsuario(email) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Usuarios WHERE email = ?',
        [email],
        (_, results) => {
          console.log('Datos encontrados correctamente');
          resolve(results.rows.item(0));
        },
        (_, error) => {
          console.log(`Error buscando usuario: ${error}`);
          reject(error);
        },
      );
    });
  });
}


export function updateUsu(db, nuevoemail, nuevacontrasena, email) {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE USUARIOS SET contrasena=? WHERE email=?',
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

export function deleteHoras(id) {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM HORAS where Id_hor =?',
      [id],
      (tx, results) => {
        console.log('Horas borradas correctamente');
      },
      (tx, error) => {
        console.log('Error al borrar las horas: ', error);
      }
    );
  }, (error) => {
    console.log('Error al iniciar la transacción: ', error);
  }, () => {
    console.log('Transacción finalizada con éxito.');
  });
}


