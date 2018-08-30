import React from 'react'

import DonateView from './donate'
import HeaderView from './header'
import HelpView from './help'
import AboutView from './about'
import PartnerView from './partners'

class HomeView extends React.Component {
    render() {
        return (
            <div>
                <HeaderView />
                <PartnerView />
                <DonateView />
                <AboutView />
                <HelpView />
            </div>
        )
    }
}

export default HomeView;