import React from 'react'

class DonateView extends React.Component {
    render() {
        return (
            <div id="donate" className="jumbotron">
                <h1 className="display-4">Donate</h1>
                <p className="lead">Every small donation can make a BIG difference</p>
                <form>
                    <div className="form-group">
                        <label>Posting for</label>
                        <select className="form-control">
                            <option>Self</option>
                            <option>Family</option>
                            <option>Friend</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Your Full Name</label>
                        <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input className="form-control" type="number" />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <select className="form-control">
                        </select>
                    </div>
                    <div className="form-group">
                        <label>District</label>
                        <select className="form-control">
                        </select>
                    </div>
                    <div className="form-group">
                        <label>PIN Code</label>
                        <input className="form-control" type="number" />
                    </div>
                </form>
                <ul>
                    <li>Our team of volunteers will get in touch with you over the next 2 weeks and arrange for pickup.</li>
                    <li>We are continuously identifying the people in need of the items and will be delivering to them directly.</li>
                    <li>We will keep the movement of goods as transparent as possible.</li>
                    <li>You may choose to donate used or unused items. But please donate only items in VERY GOOD condition.</li>
                    <li>If you wish to donate an item that is not in the list, please mention in the ‘Others’ box.</li>
                    <li>When you submit the form, your contact details may be shared with a volunteer group or / and the receiver of your donations.</li>
                </ul>
                <br />
                <a className="btn btn-primary btn-lg" href="#" role="button">Donate</a>
            </div>
        )
    }
}

export default DonateView;