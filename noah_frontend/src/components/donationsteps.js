import React from 'react'

class DontationSteps extends React.Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <React.Fragment>
        <header className="masthead sub-page">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="text-uppercase text-white">
                  <strong>HOW TO DONATE</strong>
                </h2>
                <hr />
              </div>
            </div>
          </div>
        </header>
        <section id="donation-steps">
          <div className="container steps">
            <div className="row step">
              <div className="col-md-6 background-call step-image">

              </div>
              <div className="col-md-6 step-contents">
                <h2 className="mb-4 heading underline">Step 1</h2>
                <p>Wait for our volunteer to call you for verification. This can take upto 48 hours. </p>
              </div>
            </div>
            <div className="row step">
              <div className="col-md-6 step-contents">
                <h2 className="mb-4 heading underline">Step 2</h2>
                <p>Clean the item, as good as it can get. If it is an electronic item, you can use soap water to clean the outer cover. You can also use spirit / deo to clean the item. Make it look like a gift! </p>
              </div>
              <div className="col-md-6 background-clean step-image">

              </div>
            </div>
            <div className="row step">
              <div className="col-md-6 background-inspect step-image">

              </div>
              <div className="col-md-6 step-contents">
              <h2 className="mb-4 heading underline">Step 3</h2>
                <p>Re-check the item to make sure it is in working condition and VERY GOOD physical condition </p>
              </div>
            </div>
            <div className="row step">
              <div className="col-md-6 step-contents">
                <h2 className="mb-4 heading underline">Step 4</h2>
                <p>Pack it. Great if you could pack it in the original box. It is ok if you cannot find one too. We will take care of it. </p>
              </div>
              <div className="col-md-6 background-pack step-image">

              </div>
            </div>
            <div className="row step">
              <div className="col-md-6 background-pickup step-image">

              </div>
              <div className="col-md-6 step-contents">
                <h2 className="mb-4 heading underline">Step 5</h2>
                <p>Drop off the item at the nearest pickup point or wait for pickup (as suggested by the Koodorukkam volunteer)</p>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default DontationSteps;
