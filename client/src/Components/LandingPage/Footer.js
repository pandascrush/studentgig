import React from 'react'
import "./Footer.css"
import footimg  from "../Assets/web 1-01 1.png"

function Footer() {
    return (
        <section id='community'>
        <div className='container-fluid footer-body'>
            <div className='row pt-5 pb-5'>
                <div className='col-sm-12 col-lg-4'>
                <img src={footimg} id='footim' alt="Loading"/> 
                </div>
             <div className='col-lg-2'>

             </div>
            <div className='col-sm-12 footer-text text-light pt-5 col-lg-5'>
             <h1 className='headingtext'>JOIN OUR COMMUNITY</h1>
              <p className='paratext'>For students seeking experience or businesses in need of freelancers, KG Genius Labs Gig opens doors to endless opportunities. Join us now for growth, learning, and success!
               </p>
                <button className='footbox'>Join now</button>
            </div>
            </div>

        </div>
        </section>
    )
}

export default Footer
