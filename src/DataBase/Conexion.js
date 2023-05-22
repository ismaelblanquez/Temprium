import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('Temprium.db');

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Usuarios (Id_usu INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, contrasena TEXT NOT NULL)'
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS HORAS (Id_hor INTEGER PRIMARY KEY AUTOINCREMENT, Usuario INTEGER NOT NULL, Tipohoras TEXT NOT NULL, Horas INTEGER NOT NULL, minutos INTEGER NOT NULL, Categoria TEXT NOT NULL, Dia DATE NOT NULL, Clase TEXT NOT NULL, FOREIGN KEY (Usuario) REFERENCES Usuarios(Id_usu))'
  );
  tx.executeSql(
    'INSERT INTO Usuarios (email, contrasena) VALUES (?, ?)',
    ["dummy@nosession.com", "92r8hfv2n9fuvy<9v8h"]
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
export function getAllHoras(email) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Id_hor,Tipohoras,Horas,minutos,Categoria,Dia,Clase FROM HORAS INNER JOIN USUARIOS ON HORAS.Usuario = USUARIOS.Id_usu AND USUARIOS.email =? ORDER BY Id_hor DESC',
        [email],
        (_, results) => {
          const todos = [];
          for (let i = 0; i < results.rows.length; i++) {
            todos.push(results.rows.item(i));

          }

          resolve(todos);
        },
        (_, error) => {
          console.log(`Error getting todos: ${error}`);
          reject(error)
        },
      );
    });
  })
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
    consulta = 'SELECT * FROM HORAS INNER JOIN Usuarios ON Usuarios.Id_usu = HORAS.Usuario  ';
    if (tipoHoras != '') {
      consulta += 'AND HORAS.Tipohoras = ? ';
      parametros.push(tipoHoras);
    }
    if (categoria != '') {
      consulta += 'AND HORAS.Categoria = ? ';
      parametros.push(categoria);
    }
    if (fechaFin == '' && fechaInicio !='') {
      consulta += 'AND HORAS.Dia = ? ';
      parametros.push(fechaInicio);
    }
    if (fechaFin  && fechaInicio ){
      consulta += 'AND HORAS.Dia BETWEEN ? AND ? ';
      parametros.push(fechaInicio,fechaFin);
    }
    if (clase != '') {
      consulta += 'AND HORAS.Clase = ? ';
      parametros.push(clase);
    }
    if (usuario != '') {
      consulta += 'AND Usuarios.email = ? ';
      parametros.push(usuario);
    }
    consulta += 'ORDER BY Id_hor DESC';
    console.log(consulta)
    console.log(parametros)
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
            

          } else {
            resolve('');
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
export const buscarUsuario = async (email) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Usuarios WHERE email = ?',
          [email],
          (_, resultSet) => resolve(resultSet),
          (_, error) => reject(error)
        );
      });
    });
    if (results.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Error searching usuario: ${error}`);
    throw error;
  }
};

export const updateUsu = async (email, nuevoemail, nuevacontrasena) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE Usuarios SET email = ?, contrasena = ? WHERE email = ?',
          [nuevoemail, nuevacontrasena, email],
          resolve,
          reject
        );
      });
    });
    console.log('Usuario modificado correctamente');
  } catch (error) {
    console.log(`Error updating usuario: ${error}`);
    throw error;
  }
};

export const existeUsuario = async (email) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Usuarios WHERE email = ?',
          [email],
          (_, resultSet) => resolve(resultSet),
          (_, error) => reject(error)
        );
      });
    });
    const numRows = results.rows.length;
    return numRows > 0;
  } catch (error) {
    console.log(`Error checking if usuario exists: ${error}`);
    throw error;
  }
};

export const updateHoras = async (
  Tipohoras,
  horas,
  minutos,
  categoria,
  dia,
  clase,
  email
) => {
  try {
    const id_usuario = await getIdUsuario(email);
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE Horas SET TipoHoras = ?, Horas = ?, minutos = ?, Categoria = ?, Dia = ?, Clase = ? WHERE Usuario = ?',
          [Tipohoras, horas, minutos, categoria, dia, clase, id_usuario],
          resolve,
          reject
        );
      });
    });
    console.log('Horas modificado correctamente');
  } catch (error) {
    console.log(`Error updating horas: ${error}`);
    throw error;
  }
};

export const deleteHoras = async (id) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM HORAS WHERE Id_hor = ?',
          [id],
          resolve,
          reject
        );
      });
    });
    console.log('Horas borradas correctamente');
  } catch (error) {
    console.log(`Error deleting horas: ${error}`);
    throw error;
  }
};

export function verificarContraseña(contrasena) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Usuarios WHERE contrasena = ?',
        [contrasena],
        (_, results) => {
          const numRows = results.rows.length;
          if (numRows > 0) {
            resolve(numRows > 0);
            

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

export function updateContraseña(contrasena, email) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Usuarios SET contrasena = ? WHERE email = ?',
        [contrasena,email],
        (_, results) => {
            console.log("Contraseña modificada");
        },
        (_, error) => {
          console.log(`Error verificando el usuario: ${error}`);
          reject(error);
        }
      );
    });
  });
}


export default {
  getAllHoras,
  selectHoras,
  getIdUsuario,
  getUsuemail,
  verificarUsuario,
  buscarUsuario,
  updateUsu,
  existeUsuario,
  updateHoras,
  deleteHoras,
  verificarContraseña,
  updateContraseña,
};
