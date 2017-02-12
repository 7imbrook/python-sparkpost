import { connect } from 'react-redux';
import Intro from '../components/Intro';
import { hideSplash } from '../actions/splash';

function mapStateToProps(store) {
  return {
    showState: store.splash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeView: () => dispatch(hideSplash()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
