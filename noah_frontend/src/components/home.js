import React from 'react'

import DonateView from './donate'
import HeaderView from './header'
import HelpView from './help'
import AboutView from './about'

class HomeView extends React.Component {
    render() {
        return (
            <div>
                <HeaderView />
                <DonateView />
                <AboutView />
                <HelpView />
            </div>
        )
    }
}

export default HomeView;