import React, {useEffect} from "react";
// import {makeStyles} from "@material-ui/core/styles";
import TodoItem from "./TodoItem";
import {useDispatch, useSelector} from "react-redux";
import {getTodos} from "../../store/todos";
import {updateTodo} from "../../store/UpdateTodo";

// const useStyles = makeStyles((theme) => ({
//         root: {
//             '& > *': {
//                 margin: theme.spacing(1),
//             },
//         }
//     })
// )

const TodosList = () => {
  const dispatch = useDispatch();
  // const [todos, setTodos] = useState([]);
  const todos = useSelector((state) => state.todoSlice.entities);
  console.log(todos);
  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const handleEdit = (tod) => {
    const toedit = todos.find((todo) => todo.id === tod.id);
    if (toedit) {
      dispatch(updateTodo(toedit));
    }
    console.log(toedit);
  };

  return (
      <>
        {todos.map((todo) => (
            <TodoItem edit={handleEdit} todo={todo} key={todo.id}/>
        ))}
      </>
  );
};

export default TodosList;
