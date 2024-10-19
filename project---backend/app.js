const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "todoApplication.db");
const app = express();
app.use(express.json())
let db = null;

const initializeDbServer = async() => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, () => {
            console.log("server starts running")
        });
    }
    catch(e) {
        console.log(e.message)
    }
}

initializeDbServer();

app.get("/todo/", async(request, response) => {
    try {
        const getDetailsQuery = `SELECT * FROM todo;`;
        const responseDb = await db.all(getDetailsQuery);
        response.send(responseDb);
        console.log(responseDb);
    }
    catch(e) {
        console.log(e.message)
    }
})

// second api 
app.post("/todo/", async(request, response) => {
    try {
        const {id, todo, priority, status} = request.body;
        const addTodoQuery = `
            INSERT INTO 
                todo (id, todo, priority, status)
            VALUES
                (${id}, '${todo}', '${priority}', '${status}');`;
        const responeAddTodo = await db.run(addTodoQuery);
        response.send("successfully add");
        console.log(responeAddTodo.last_id)
    }
    catch(e) {
        console.log(e.message);
    }
});

app.delete("/todo/:todoId/", async (request, response) => {
    try {
      const { todoId } = request.params;
      const deleteTodoQuery = `
              DELETE FROM todo WHERE id = ${todoId};`;
      await dataBase.run(deleteTodoQuery);
      response.send(`Todo Deleted`);
    } catch (e) {
      console.log(`error: ${e.message}`);
    }
});

module.exports = app; 


