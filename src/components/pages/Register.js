import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

//MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  registerForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  registerInputs: {
    margin: "8px",
  },
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "warning");
    } else {
      register({ name, email, password });
      setAlert("Account registered , please log in.", "success");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        SIGN IN
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1>Sign In</h1>
            <form
              className={classes.registerForm}
              noValidate
              autoComplete="on"
              onSubmit={(e) => onSubmit(e)}
            >
              <TextField
                className={classes.registerInputs}
                label="Name"
                required
                name="name"
                value={name}
                variant="outlined"
                onChange={(e) => onChange(e)}
              />
              <TextField
                required
                type="email"
                name="email"
                value={email}
                className={classes.registerInputs}
                label="Email"
                variant="outlined"
                onChange={(e) => onChange(e)}
              />
              <TextField
                className={classes.registerInputs}
                label="Password"
                name="password"
                type="password"
                value={password}
                variant="outlined"
                onChange={(e) => onChange(e)}
              />
              <TextField
                className={classes.registerInputs}
                label="Confirm Password"
                name="password2"
                type="password"
                value={password2}
                variant="outlined"
                onChange={(e) => onChange(e)}
              />
              <Button type="submit" variant="outlined">
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
