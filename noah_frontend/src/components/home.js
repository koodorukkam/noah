import React from 'react'
import { connect } from 'react-redux';


class HomeView extends React.Component {
    render() {
        return (
          <h1>Koodorukkam</h1>
        )
    }
}

const mapStateToProps = (state) => ({
    greeting: state.home.greeting
});

export default connect(mapStateToProps)(HomeView);