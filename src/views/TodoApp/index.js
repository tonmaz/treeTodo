import React from "react";
import Page from "../../components/Page";
import TodosList from "./TodosList";
import AddTodo from "./AddTodo";

const TodoApp = () => {
    return (
        <Page title="TodoApp">
            <div>
                <AddTodo/>
                <TodosList/>
            </div>
        </Page>
    );
};

export default TodoApp;
