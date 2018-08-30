import React from 'react'

const partnerImages =
[{
        src: "img/partners/nasscom.svg",
        width: 500,
        height: 200
},
{
        src: "img/partners/gtech.svg",
        width: 500,
        height: 200
}]

export default () => (
<section id="partners" className="mx-auto bg-dark text-white">
    <div className="container text-center">
        <h2 className="mb-4">In Association With</h2>
        <hr/><br/><br/>
        <table align="center"><tbody><tr>
            <td style={{padding: "0px 20px"}}>
                <a target="_blank" href="http://gtechindia.org/"><img height="100" src="img/partners/gtech.svg" /></a>
            </td>
            <td style={{padding: "0px 20px"}}>
                <a target="_blank" href="https://www.nasscom.in/"><img height="70" src="img/partners/nasscom.svg" /></a>
            </td>
        </tr></tbody></table>
        <div className="clearfix"></div>
    </div>
</section>
)