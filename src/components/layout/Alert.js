import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function AlertUI(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Alert = ({alerts}) => {

    const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    return alerts !== null && alerts.length > 0 &&
    alerts.map(alert => (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} key={alert.id}>
            <AlertUI onClose={handleClose} severity={alert.alertType}  >
                {alert.msg}
            </AlertUI>
        </Snackbar>
))}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert)