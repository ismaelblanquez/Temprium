import { SQLiteDatabase } from "react-native-sqlite-storage";

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

function add(){
    db.transaction((tx) =>{
        tx.executeSql(
            'INSERT INTO todos (title) VALUES (?)',
      [title],
      (tx, results) => {
        console.log('Todo added successfully');
      },
      (tx, error) => {
        console.log(`Error adding todo: ${error}`);
      },
        )
    })
}

function getTodos(callback) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM todos',
        [],
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
  

  export default {
    initDatabase,
    addTodo,
    getTodos,
  };