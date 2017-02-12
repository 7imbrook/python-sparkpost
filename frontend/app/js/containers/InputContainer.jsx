import { connect } from 'react-redux';
import Input from '../components/Input';
import { startListening, stopListening } from '../actions/listen';

function mapStateToProps(store) {
  return {
    listening: store.listen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onListening: () => dispatch(startListening()),
    onStopListening: () => dispatch(stopListening()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
