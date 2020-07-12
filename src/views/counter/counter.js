import React, {useState} from "react";
import {Button, Card, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {add, addByNum, minus} from "../../store/counter";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    card: {
        maxWidth: 275,
        margin: 50,
    },
    title: {
        fontSize: 25,
    },
}));

const Counter = () => {
    const classes = useStyles();

    const [num, setNum] = useState("");

    const dispatch = useDispatch();
    const result = useSelector((state) => state.counterSlice);

    const increment = () => {
        dispatch(add());
    };

    const decrement = () => {
        dispatch(minus());
    };
    const addAmount = () => {
        dispatch(addByNum(num));
    };
    // const addo =()=>{
    //        dispatch(addAsync(num))
    // }

    const addAsyncAmount = () => {
        dispatch(addByNum(num));
    };
    console.log(num);
    return (
        <Card className={classes.card}>
            <div className={classes.root}>
                <Typography className={classes.title}>{result}</Typography>
                <TextField value={num} onChange={(e) => setNum(e.target.value)}/>
                <Button spacing={2} variant={"contained"} onClick={increment}>
                    +
                </Button>
                <Button variant={"contained"} onClick={decrement}>
                    -
                </Button>
                <Button variant={"contained"} onClick={addAmount}>
                    Add Amount
                </Button>
                <Button variant={"contained"}>Add Async</Button>
                <Button variant={"contained"} onClick={addAsyncAmount}>
                    Add Async Amount
                </Button>
            </div>
        </Card>
    );
};

export default Counter;
