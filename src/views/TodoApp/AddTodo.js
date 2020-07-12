import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";
import {submitTodo, updateTask} from "../../store/todos";
import {clearTodo} from "../../store/UpdateTodo";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minWidth: 500,
    },
  },
}));

const AddTodo = () => {
  const task = useSelector((state) => state.updateSlice);
  const [todo, setTodo] = useState("");
  console.log(task);

  useEffect(() => {
    setTodo(task.task);
  }, [task]);

  const details = {todo, task};

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      return;
    }
    if (task.task) {
      dispatch(updateTask(details));
      setTodo("");
      dispatch(clearTodo());
    } else dispatch(submitTodo(todo));
    setTodo("");
    console.log(todo);
  };

  return (
      <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => handleAddTodo(e)}
      >
        <Input
            placeholder="your task here ...."
            inputProps={{"aria-label": "description"}}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
        />
        {/*<Input placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} />*/}
        {/*<Input defaultValue="Disabled" inputProps={{ 'aria-label': 'description' }} />*/}
        {/*<Input defaultValue="Error" error inputProps={{ 'aria-label': 'description' }} />*/}

        <Button type="submit">SUBMIT</Button>
      </form>
  );
};

export default AddTodo;
