import React from "react";
import Page from "../../components/Page";
import TodosList from "./TodosList";
import AddTodo from "./AddTodo";

const TodoApp = () => {
    return (
        <Page title="TodoApp">
            <div style={{marginTop: 25}}>
                <AddTodo/>
                <TodosList/>
            </div>
        </Page>
    );
};

export default TodoApp;
