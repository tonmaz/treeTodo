import React from "react";
import "./App.css";
import Counter from "./views/counter/counter";
import TodoApp from "./views/TodoApp";

function App() {
    return (
        <div className="App">
            <Counter/>
            <TodoApp/>
        </div>
    );
}

export default App;
