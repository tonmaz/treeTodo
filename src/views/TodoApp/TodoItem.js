import React from "react";
import {Button, Card, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {completeTodo, deleteTask} from "../../store/todos";
import {useDispatch} from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  card: {
    // maxWidth: 275,
    minHeight: 50,
    margin: 50,
    display: "flex",
  },
  title: {
    fontSize: 22,
    marginLeft: 40,
  },
  btn: {
    marginLeft: "auto",
  },
}));

const TodoItem = ({todo, edit}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // const [todo, setTodo] = useState(todo);

  const handleToggle = (tod) => {
    console.log(tod.id);
    dispatch(completeTodo(tod));
  };

  const handleDelete = (tod) => {
    console.log(tod.id);
    dispatch(deleteTask(tod.id));
  };

  return (
      <>
        <Card className={classes.card}>
          <Button onClick={() => edit(todo)}>
            <CreateIcon/>
          </Button>

          <Typography className={classes.title}>{todo.task}</Typography>
          <Button className={classes.btn} onClick={() => handleToggle(todo)}>
            {todo.completed ? "done" : "complete"}
          </Button>
          <Button onClick={() => handleDelete(todo)}>
            <DeleteIcon/>
          </Button>
        </Card>
      </>
  );
};

export default TodoItem;
