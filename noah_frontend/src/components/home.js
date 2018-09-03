import React from 'react'

import DonateView from './donate'
import HeaderView from './header'
import HelpView from './help'
import AboutView from './about'
import PartnerView from './partners'

class HomeView extends React.Component {
    render() {
        return (
            <React.Fragment>
                <HeaderView />
                <PartnerView />
                <DonateView />
                <AboutView />
                <HelpView />
            </React.Fragment>
        )
    }
}

export default HomeView;
