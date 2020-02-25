import React, {useState, useReducer} from 'react';
import {Container} from '@material-ui/core'
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";

import './PGATable.css';

const useStyles = makeStyles(theme => ({
    modal: {
        marginTop: '50px',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

const golferList = [
    {firstName: "Kylynn", lastName: "Lathey", score: 89},
    {firstName: "Cly", lastName: "Dukelow", score: 76},
    {firstName: "Afton", lastName: "Chaffer", score: 76},
    {firstName: "Deva", lastName: "Cowope", score: 94}
];

export default function PGATable() {
    const classes = useStyles();
    const title = "Leaderboard";
    const [showEdit, setShowEdit] = useState(false);
    const [editing, setEditing] = useState(false);
    const [people, updatePeople] = useState(sortPeople(golferList));
    const [editPerson, saveEditPerson] = useState({});
    const [editIndex, setEditIndex] = useState(0);

    const handleOpenEdit = (dataIndex) => {
        setEditing(true);
        setShowEdit(true);
        saveEditPerson(people[dataIndex]);
    };

    const handleOpenAdd = () => {
        saveEditPerson({firstName:'',lastName:'',score:'',id:0});
        setEditing(false);
        setShowEdit(true);
    };

    const handleUpdatePerson = (person) => {
        let dataCopy = [...people];
        // let index = dataCopy.findIndex(obj => obj.id === person.id);
        dataCopy[editIndex] = person;
        updatePeople(sortPeople(dataCopy));
    };

    const handleAddPerson = (person) => {
        people.push(person);
        updatePeople(sortPeople(people));
    };

    const handleClose = () => {
        setShowEdit(false);
    };

    const options = {
        serverSide: false,
        selectableRows: false,
        elevation: 5,
        textLabels: {
            selectedRows: {
                text: "row(s) selected",
                delete: "Delete",
                deleteAria: "Delete Selected Rows",
            },
        },
        responsive: 'scrollFullWidth',
        viewColumns: false,
        print: false,
        filter: false,
        download: false
    };

    const columns = [
        {
            name: 'lastName',
            label: "Name",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>{tableMeta.rowData[0]}, {tableMeta.rowData[1]}</div>
                    )
                },
                sort:false
            }
        },
        {
            name: 'firstName',
            options: {
                sort: false,
                display: false,
                filter: false
            }
        },
        {
            name: "score",
            label: "Score",
            options: {
                sort: false
            }
        },
        {
            name: '',
            label: "",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button variant="contained" onClick={() => {
                            setEditIndex(tableMeta.rowIndex);
                            handleOpenEdit(tableMeta.rowIndex);
                        }}>
                            Edit
                        </Button>
                    );
                }
            }
        },
        {
            name: '',
            label: "",
            options: {
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowId = tableMeta.rowData[3];
                    return (
                        <Button variant="contained" color="secondary"
                                onClick={() => deletePerson(rowId)}>Delete</Button>
                    )
                },
                filter: false
            }
        },
    ];

    function sortPeople(source) {
        let p = [...source].sort((a, b) => {
            if (a.score < b.score) return -1;
            if (a.score > b.score) return 1;
            if (a.score === b.score && a.lastName < b.lastName) return -1;
            return 1;
        });
        return p;
    }

    function deletePerson(id) {
        updatePeople(people.filter(person => person.id !== id));
    }

    function handleFirstNameChange(event) {
        saveEditPerson({
            ...editPerson,
            firstName: event.target.value
        });
    }

    function handleLastNameChange(event) {
        saveEditPerson({
            ...editPerson,
            lastName: event.target.value
        });
    }

    function handleScoreChange(event) {
        saveEditPerson({
            ...editPerson,
            score: event.target.value
        });
    }

    return (
        <Container maxWidth="sm">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={showEdit}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showEdit}>
                    <div className={classes.paper}>
                        <h2>{editing ? "Edit" : "Add"} Person</h2>
                        <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                <TextField id="firstName" label="First Name" value={editPerson.firstName}
                                           onChange={handleFirstNameChange}/>
                                <TextField id="lastName" label="Last Name" value={editPerson.lastName}
                                           onChange={handleLastNameChange}/>
                                <TextField id="score" type="number" label="Score" value={editPerson.score}
                                           onChange={handleScoreChange}/>
                            </div>
                            <div>
                                <Button onClick={() => {
                                    if (editing)
                                        handleUpdatePerson(editPerson,);
                                    else
                                        handleAddPerson(editPerson);
                                    handleClose();
                                }}>Save</Button>
                                <Button onClick={() => {
                                    handleClose()
                                }}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
            <MUIDataTable
                columns={columns}
                data={people}
                options={options}
                title={title}
            />
            <Button variant="contained" color="primary" onClick={handleOpenAdd}>Add</Button>
        </Container>
    )
}
