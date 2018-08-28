import React from 'react'

import DonateView from './donate'

class HomeView extends React.Component {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-4">Koodorukkam</h1>
                    <p className="lead">Use the unused utensils and appliances at your home to make a BIG difference</p>
                    <p>Those small appliances and utensils that are lying around at our homes, unused or rarely used, could make a huge difference to the people who have lost everything. An unused iron box, a dinner set you got as a gift, an emergency lamp you rarely use and much more. Donate them to the people who have lost everything in the flood and be part of rebuilding Kerala. </p>
                    <br/>
                    <a className="btn btn-primary btn-lg" href="#donate" role="button">Donate</a>
                    {/* &nbsp;&nbsp;
                    <a className="btn btn-primary btn-lg" href="#request" role="button">Request</a>
                    &nbsp;&nbsp;
                    <a className="btn btn-primary btn-lg" href="#partners" role="button">Partners</a> */}
                </div>
                <DonateView />
            </div>
        )
    }
}

export default HomeView;