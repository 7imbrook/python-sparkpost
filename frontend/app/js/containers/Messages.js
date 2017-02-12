import { connect } from 'react-redux';
import Messages from '../components/Messages';

function mapStateToProps(store) {
  return {
    messages: store.messages,
  };
}

export default connect(mapStateToProps)(Messages);
