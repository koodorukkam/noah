import React from 'react'
import { connect } from 'react-redux';

import {APIService} from '../services/api'
import {addCustomItem} from '../actions/form'


class DonateView extends React.Component {
    constructor(props) {
        super(props)
        this.api = new APIService(props.dispatch)
        this.state = {
            selectedState: "Kerala"
        }
    }

    componentDidMount() {
        this.api.getFormValues()
    }

    renderStates() {
        return this.props.form.states.map(state => <option key={state} value={state}>{state}</option>)
    }

    renderDistricts() {
        if (!this.props.form.districts[this.state.selectedState])
            return null
        return this.props.form.districts[this.state.selectedState].map(d => <option key={d} value={d}>{d}</option>)
    }

    renderItems() {
        return this.props.form.items.map(i => (
            <tr key={i}>
                <td><label>{i}</label></td>
                <td><input className="form-control" type="number" defaultValue="0" name={i} /></td>
            </tr>
        ))
    }

    selectState = (e) => {
        this.setState({selectedState: e.target.value})
    }

    addItem = (e) => {
        e.preventDefault()
        const name = prompt("Enter name of the Item")
        this.props.dispatch(addCustomItem(name))
    }

    registerDonation = (e) => {
        e.preventDefault()
        const keys = ["full_name", "contact_number", "state", "district", "pincode"]
        let payload = {
            items: this.props.form.items.map(i => {return {name: i, count: e.target[i].value}})
        }
        for (const key of keys) {
            payload[key] = e.target[key].value
        }
        console.log(payload)
        this.api.registerDonation(payload, e.target)
    }

    render() {
        return (
            <div id="donate" className="jumbotron">
                <h1 className="display-4">Donate</h1>
                <p className="lead">Every small donation can make a BIG difference</p>
                <form onSubmit={this.registerDonation}>
                    <div className="form-group">
                        <label>Your Full Name</label>
                        <input name="full_name" className="form-control" type="text" required />
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input name="contact_number" className="form-control" type="number" minLength="10" maxLength="10" required />
                    </div>
                    <div className="form-group">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderItems()}
                            </tbody>
                        </table>
                        <br/>
                        <a href="#" onClick={this.addItem} className="btn btn-sm btn-success"><i className="fa fa-plus"></i> Donate an Item not in this List</a>
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <select name="state" className="form-control" onChange={this.selectState} value={this.state.selectedState} required >
                            {this.renderStates()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>District</label>
                        <select name="district" className="form-control" required >
                            {this.renderDistricts()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>PIN Code</label>
                        <input name="pincode" className="form-control" type="number" minLength="6" maxLength="6" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">Donate</button>
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
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    form: state.form
});

export default connect(mapStateToProps)(DonateView);