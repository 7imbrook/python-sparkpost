import { connect } from 'react-redux';
import Input from '../components/Input';
import { startListening, stopListening } from '../actions/listen';
import { humanMessage } from '../actions/messages';

function mapStateToProps(store) {
  return {
    listening: store.listen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onListening: () => dispatch(startListening()),
    onStopListening: () => dispatch(stopListening()),
    onChange: (value) => dispatch(humanMessage(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
