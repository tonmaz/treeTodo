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
    minHeight: 20,
    margin: 20,
    display: "flex",
  },
  title: {
    fontSize: 18,
    marginLeft: 40,
  },
  btn: {
    marginLeft: "auto",
    textTransform: "none",
  },
}));

const TodoItem = ({todo, edit}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // const [todo, setTodo] = useState(todo);

  const handleToggle = (tod) => {
    console.log(tod.id);
    dispatch(
        completeTodo({
          id: tod.id,
          completed: !tod.completed,
        })
    );
  };

  const handleDelete = (tod) => {
    console.log(tod.id);
    dispatch(
        deleteTask({
          id: tod.id,
        })
    );
  };

  return (
      <>
        <Card className={classes.card}>
          <Button onClick={() => edit(todo)}>
            <CreateIcon/>
          </Button>

          <Typography className={classes.title}>{todo.task}</Typography>
          <Button className={classes.btn} onClick={() => handleToggle(todo)}>
            {todo.completed ? "Done" : "Pending"}
          </Button>
          <Button onClick={() => handleDelete(todo)}>
            <DeleteIcon/>
          </Button>
        </Card>
      </>
  );
};

export default TodoItem;
