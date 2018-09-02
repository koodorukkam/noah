import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {APIService} from '../services/api'
import {addCustomItem, setSelectedState} from '../actions/choices'

const FormError = styled.span`
  color: red;
  font-size: .85em;
`


class DonateView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          formErr: {}
        }
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
                <td><input className="form-control" type="number" defaultValue="0" name={i} min="0"/></td>
            </tr>
        ))
    }

    selectState = (e) => {
        this.props.dispatch(setSelectedState(e.target.value))
    }

    addItem = (e) => {
        e.preventDefault()
        const name = prompt("Enter name of the Item")
        if (this.items.includes(name)) {
          alert(`${name} already present in the list`)
          return
        }
        if (name && name.length > 0)
            this.props.dispatch(addCustomItem(name))
    }

    /**
     * Validating form basically for phoen number and pincode
     * @param  {HTMLnode} donationForm the donation form node
     * @return {object}              List of errors
     */
    validateDonationForm = (donationForm) => {
        let { formErr } = this.state;
        let errors = {}
        const phoneRegex = /^\d{10}$/,
              pinCodeRegex = /^\d{6}$/,
              landPhoneRegex = /^0\d{10}$/,
              nameRegex = /^[a-zA-Z][a-zA-Z0-9.,$;]+$/
        if (!(phoneRegex.test(donationForm['contact_number'].value) || landPhoneRegex.test(donationForm['contact_number'].value))) {
          errors.contact_number = 'Enter 10 digit mobile number or 11 digit landline number'
        } else if(formErr.contact_number){
          // remove existing error message
          formErr = {
            ...formErr,
            contact_number: ''
          }
        }
        if (!pinCodeRegex.test(donationForm['pincode'].value)) {
          errors.pincode = 'Enter valid 6 digit pin code'
        } else if(formErr.pincode){
          // remove existing error message
          formErr = {
            ...formErr,
            pincode: ''
          }
        }

        if (!nameRegex.test(donationForm['full_name'].value)) {
          errors.full_name = 'Enter a valid name'
        } else if(formErr.full_name){
          // remove existing error message
          formErr = {
            ...formErr,
            full_name: ''
          }
        }
        this.setState({formErr: {...formErr, ...errors}})

        return errors;
    }

    registerDonation =  (e) => {
        e.preventDefault()
        const validationErrs = this.validateDonationForm(e.target)
        if (Object.keys(validationErrs).length > 0)
          return
        if (!e.target.agreeToTerms.checked) {
            alert("Please agree to donate only 'very good working condition' items by checking the box")
            return
        }

        const keys = ["full_name", "contact_number", "state", "district", "pincode"]
        let payload = {
            items: this.items.map(i => {return {name: i, count: e.target[i].value}})
        }
        for (const key of keys) {
            payload[key] = e.target[key].value
        }
        this.api.registerDonation(payload, e.target)
    }

    render() {
        const { formErr } = this.state;
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
                        {formErr['full_name'] &&
                            <FormError>{formErr['full_name']}</FormError>
                        }
                    </div>
                    <div className="col-6 form-group">
                        <label>Contact Number</label>
                        <input name="contact_number" className="form-control" type="number" minLength="10" maxLength="10" required />
                        {formErr['contact_number'] &&
                            <FormError>{formErr['contact_number']}</FormError>
                        }
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
                        {formErr['pincode'] &&
                            <FormError>{formErr['pincode']}</FormError>
                        }
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <input name="agreeToTerms" className="form-group" type="checkbox" />&nbsp;&nbsp;&nbsp;I agree that all items I donate will be in VERY GOOD WORKING condition
                    <br/>
                    <input className="form-group" type="checkbox" />&nbsp;&nbsp;&nbsp;I agree to share my contact details with the receiver of my donated item
                </div>
                <div className="row text-center">
                    <button style={{padding: "18px 20px"}} type="submit" className="btn btn-primary btn-lg btn-block">Donate</button>
                </div>
            </form>
        </div>
        <br/><br/>
        <table className="text-justify table">
            <tbody>
                <tr><td>Our team of volunteers will get in touch with you over the next 2 weeks and arrange for pickup.</td></tr>
                <tr><td>We are continuously identifying the people in need of the items and will be delivering to them directly.</td></tr>
                <tr><td>We will keep the movement of goods as transparent as possible.</td></tr>
                <tr><td>You may choose to donate used or unused items. But please donate only items in VERY GOOD condition.</td></tr>
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
})

export default connect(mapStateToProps)(DonateView);
