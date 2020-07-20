import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

//Material
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="default">
        LOG IN
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
            <h1>Log In</h1>
            <form
              className={classes.registerForm}
              noValidate
              autoComplete="on"
              onSubmit={(e) => onSubmit(e)}
            >
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
                value={password}
                type="password"
                variant="outlined"
                onChange={(e) => onChange(e)}
              />
              <Button type="submit" variant="outlined" color="primary">
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

export default connect(mapStateToProps, { login })(Login);
