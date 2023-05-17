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

export const addUsuario = async (email, contrasena) => {
  try {
    const query = 'INSERT INTO Usuarios (email, contrasena) VALUES (?, ?)';
    const params = [email, contrasena];
    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(query, params, (_, resultSet) => resolve(resultSet), (_, error) => reject(error));
      });
    });
    console.log('Datos insertados correctamente');
  } catch (error) {
    console.log(`Error adding usuario: ${error}`);
    throw error;
  }
};


export const addHoras = async (
  Usuario,
  Tipohoras,
  Horas,
  minutos,
  Categoria,
  Dia,
  Clase
) => {
  try {
    const query =
      'INSERT INTO HORAS (Usuario,Tipohoras,Horas,minutos,Categoria,Dia,Clase) VALUES (?,?,?,?,?,?,?)';
    const params = [Usuario, Tipohoras, Horas, minutos, Categoria, Dia, Clase];
    await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(query, params, resolve, reject);
      });
    });
    console.log(
      "BBDD Usuario " +
      Usuario +
      " Tipo horas " +
      Tipohoras +
      " horas: " +
      Horas +
      " minutos: " +
      minutos +
      " Categoria: " +
      Categoria +
      " dia: " +
      Dia +
      " clase: " +
      Clase
    );
    console.log('Horas añadidas correctamente');
  } catch (error) {
    console.log(`Error adding horas: ${error}`);
    throw error;
  }
};

export const getAllHoras = async (email) => {
  try {
    const query =
      'SELECT Id_hor, Tipohoras, Horas, minutos, Categoria, Dia, Clase FROM HORAS INNER JOIN Usuarios ON HORAS.Usuario = Usuarios.Id_usu WHERE Usuarios.email = ? ORDER BY Id_hor DESC';
    const params = [email];
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, resultSet) => resolve(resultSet),
          (_, error) => reject(error)
        );
      });
    });

    const todos = [];
    for (let i = 0; i < results.rows.length; i++) {
      todos.push(results.rows.item(i));
      console.log(
        "resultados" + JSON.stringify(results.rows.item(i))
      );
    }
    console.log("todos" + todos);
    return todos;
  } catch (error) {
    console.log(`Error getting horas: ${error}`);
    throw error;
  }
};






export const selectHoras = async (
  tipoHoras,
  categoria,
  fechaInicio,
  clase,
  usuario
) => {
  try {
    let consulta =
      'SELECT * FROM HORAS INNER JOIN Usuarios ON Usuarios.Id_usu = HORAS.Usuario ';
    const parametros = [];

    if (tipoHoras !== '') {
      consulta += 'AND HORAS.Tipohoras = ? ';
      parametros.push(tipoHoras);
    }

    if (categoria !== '') {
      consulta += 'AND HORAS.Categoria = ? ';
      parametros.push(categoria);
    }

    if (fechaInicio !== '') {
      consulta += 'AND HORAS.Dia = ? ';
      parametros.push(fechaInicio);
    }

    if (clase !== '') {
      consulta += 'AND HORAS.Clase = ? ';
      parametros.push(clase);
    }

    if (usuario !== '') {
      consulta += 'AND Usuarios.email = ? ';
      parametros.push(usuario);
    }

    console.log(consulta);
    console.log(parametros);

    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          consulta,
          parametros,
          (_, resultSet) => resolve(resultSet),
          (_, error) => reject(error)
        );
      });
    });

    const todos = [];
    for (let i = 0; i < results.rows.length; i++) {
      todos.push(results.rows.item(i));
    }

    console.log(todos);
    return todos;
  } catch (error) {
    console.log(`Error selecting horas: ${error}`);
    throw error;
  }
};

export const getIdUsuario = async (usuario) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT Id_usu FROM Usuarios WHERE email = ?',
          [usuario],
          (_, resultSet) => resolve(resultSet),
          (_, error) => reject(error)
        );
      });
    });
    if (results.rows.length > 0) {
      const id = results.rows.item(0).Id_usu;
      return id;
    } else {
      console.log('No se encontraron resultados');
      return null;
    }
  } catch (error) {
    console.log(`Error getting usuario id: ${error}`);
    throw error;
  }
};

export const getUsuemail = async (usuario) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT email FROM USUARIOS WHERE email = ?',
          [usuario],
          (_, resultSet) => resolve(resultSet),
          (_, error) => reject(error)
        );
      });
    });
    const id = results.rows.item(0).email;
    return id;
  } catch (error) {
    console.log(`Error getting usuario email: ${error}`);
    throw error;
  }
};

export const verificarUsuario = async (email, contrasena) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Usuarios WHERE email = ? AND contrasena = ?',
          [email, contrasena],
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
    console.log(`Error verifying usuario: ${error}`);
    throw error;
  }
};

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
};
