import React from 'react'
import { connect } from 'react-redux';

import {APIService} from '../services/api'
import {addCustomItem, setSelectedState} from '../actions/choices'


class DonateView extends React.Component {
    constructor(props) {
        super(props)
        this.api = new APIService(props.dispatch)
    }

    get items() {
        return this.props.choices.constants.items.concat(this.props.choices.customItems)
    }

    componentDidMount() {
        this.api.getFormValues()
    }

    renderStates() {
        return this.props.choices.constants.states.map(state => <option key={state} value={state}>{state}</option>)
    }

    renderDistricts() {
        const state = this.props.choices.selectedState
        if (!this.props.choices.constants.districts[state])
            return null
        return this.props.choices.constants.districts[state].map(d => <option key={d} value={d}>{d}</option>)
    }

    renderItems() {
        return this.items.map(i => (
            <tr key={i}>
                <td><label>{i}</label></td>
                <td><input className="form-control" type="number" defaultValue="0" name={i} /></td>
            </tr>
        ))
    }

    selectState = (e) => {
        this.props.dispatch(setSelectedState(e.target.value))
    }

    addItem = (e) => {
        e.preventDefault()
        const name = prompt("Enter name of the Item")
        if (name && name.length > 0)
            this.props.dispatch(addCustomItem(name))
    }

    registerDonation = (e) => {
        e.preventDefault()
        const keys = ["full_name", "contact_number", "state", "district", "pincode"]
        let payload = {
            items: this.items.map(i => {return {name: i, count: e.target[i].value}})
        }
        for (const key of keys) {
            payload[key] = e.target[key].value
        }
        console.log(payload)
        this.api.registerDonation(payload, e.target)
    }

    render() {
        return (
<section id="donate" className="mx-auto" style={{maxWidth: "800px"}}>
    <div className="container">
        <div className="row">
            <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-heading">Register your Donation Now!</h2>
                <hr className="my-4" />
            </div>
        </div>
        <div className="row">
            <form className="container" onSubmit={this.registerDonation}>
                <div className="row"><div className="col-12">
                    <table className="table table-bordered">
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
                    <a href="#" onClick={this.addItem} className="btn btn-sm btn-success"><i className="fa fa-plus"></i> Donate an Item not in this List</a>
                </div></div>
                <br/>
                <div className="row">
                    <div className="col-6 form-group">
                        <label>Your Full Name</label>
                        <input name="full_name" className="form-control" type="text" required />
                    </div>
                    <div className="col-6 form-group">
                        <label>Contact Number</label>
                        <input name="contact_number" className="form-control" type="number" minLength="10" maxLength="10" required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label>State</label>
                        <select name="state" className="form-control" onChange={this.selectState} value={this.props.choices.selectedState} required >
                            {this.renderStates()}
                        </select>
                    </div>
                    <div className="col-4 form-group">
                        <label>District</label>
                        <select name="district" className="form-control" required >
                            {this.renderDistricts()}
                        </select>
                    </div>
                    <div className="col-4 form-group">
                        <label>PIN Code</label>
                        <input name="pincode" className="form-control" type="number" minLength="6" maxLength="6" required />
                    </div>
                </div>
                <br/><br/>
                <div className="row text-center">
                    <button style={{padding: "18px 20px"}} type="submit" className="btn btn-primary btn-lg btn-block">Donate</button>
                </div>
            </form>
        </div>
        <br/><br/>
        <table className="text-center table">
            <tbody>
                <tr><td>Our team of volunteers will get in touch with you over the next 2 weeks and arrange for pickup.</td></tr>
                <tr><td>We are continuously identifying the people in need of the items and will be delivering to them directly.</td></tr>
                <tr><td>We will keep the movement of goods as transparent as possible.</td></tr>
                <tr><td>You may choose to donate used or unused items. But please donate only items in VERY GOOD condition.</td></tr>
                <tr><td>If you wish to donate an item that is not in the list, please mention in the ‘Others’ box.</td></tr>
                <tr><td>When you submit the form, your contact details may be shared with a volunteer group or / and the receiver of your donations.</td></tr>
            </tbody>
        </table>
    </div>
</section>
        )
    }
}


const mapStateToProps = (state) => ({
    choices: state.choices
});

export default connect(mapStateToProps)(DonateView);