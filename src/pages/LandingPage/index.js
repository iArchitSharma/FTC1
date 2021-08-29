import React, {useEffect} from 'react'
import {Link} from "react-router-dom"

var slideIndex = 1;
export default function Index() {

    useEffect(() => {
        showDivs(slideIndex);
    }, [])

    function plusDivs(n) {
        slideIndex+=n
        showDivs(slideIndex);
    }

    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
        }
            x[slideIndex-1].style.display = "block";  
        }


    return (
        <div>

            <nav>
                <div class="navbar">
                    <span><img src="https://iarchitsharma.github.io/FTC/img/SharkLogo-3.png" alt="logo" /></span>
                    <a class="active" href="#"><i class="fa fa-fw fa-home"></i> Home</a>
                    <a href="#"><i class="fa fa-fw fa-search"></i> Search</a>
                    <a href="#"><i class="fa fa-fw fa-envelope"></i> Contact</a>
                    <a href="#aboutus"><i class="fa fa-fw fa-user"></i> About us</a>
                </div>
            </nav>          
            

            {/* header  */}
            <header class="w3-display-container w3-center">
                <div class="w3-button w3-block w3-indigo w3-hide-large w3-hide-medium" href="#">
                <Link to = "/map" >
                    Get Started
                </Link>        
                </div>
                {/* <!--Slide 1 --> */}
                <div class="mySlides w3-animate-opacity">
                    <img class="w3-image" src="https://iarchitsharma.github.io/FTC/img/trash1.jpg" alt="Image 1" style= {{minWidth: "500px"}} width="1500" height="1000" />
                    <div class="w3-display-left w3-padding w3-hide-small" style= {{width: "35%"}}>
                    <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large w3-round-large">
                        <h1 class="w3-xlarge">Find Trash Cans near you</h1>
                        <hr class="w3-opacity" />
                        <p>Easy and Free: Use Now</p>
                        <p><div class="w3-button w3-block w3-indigo w3-round" href="#">
                        <Link to = "/map" >
                            <div style= {{width: "100%"}}>
                                Get started 
                            </div>
                        </Link>
                        </div></p>
                    </div>
                    </div>
                </div>
                {/* <!--Slide 2--> */}
                <div class="mySlides w3-animate-opacity">
                    <img class="w3-image" src="https://iarchitsharma.github.io/FTC/img/trash2.jpg" alt="Image 2" style= {{minWidth: "500px"}} width="1500" height="1000" />
                    <div class="w3-display-left w3-padding w3-hide-small" style= {{width:"35%" }}>
                    <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large w3-round-large">
                        <h1 class="w3-xlarge"><b>CLICK!</b> Fast and Easy</h1>
                        <hr class="w3-opacity" />
                        <p>Choose from thousands of features</p>
                        <p><a class="w3-button w3-block w3-indigo w3-round" href="#">
                        <Link to = "/map" >
                            <div style= {{width: "100%"}}>
                                Get started 
                            </div>
                        </Link>
                        </a></p>
                    </div>
                    </div>
                </div>
                {/* <!--Slide 3--> */}
                <div class="mySlides w3-animate-opacity">
                    <img class="w3-image" src="https://iarchitsharma.github.io/FTC/img//trash3.jpg" alt="Image 3" style= {{minWidth:"500px"}} width="1500" height="1000" />
                    <div class="w3-display-left w3-padding w3-hide-small" style= {{width: "35%"}}>
                    <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large w3-round-large">
                        <h1 class="w3-xlarge">Smart Design</h1>
                        <hr class="w3-opacity" />
                        <p>Find and add Trash Cans as you go</p>
                        <p><a class="w3-button w3-block w3-indigo w3-round" href="#">
                        <Link to = "/map" >
                            <div style= {{width: "100%"}}>
                                Get started 
                            </div>
                        </Link>
                        </a></p>
                    </div>
                    </div>
                </div>
                <a class="w3-button w3-black w3-display-right w3-margin-right w3-round w3-hide-small w3-hover-light-grey" onClick= { () => plusDivs(1) }>Next <i class="fa fa-angle-right"></i></a>
                <a class="w3-button w3-block w3-black w3-hide-large w3-hide-medium" onClick= { () => plusDivs(1) }>Take Tour <i class="fa fa-angle-right"></i></a>
            </header>

            {/* app section  */}
            <div class="w3-padding-64 w3-white">
                <div class="w3-row-padding">
                    <div class="w3-col l8 m6">
                    <h1 class="w3-jumbo"><b>FTC</b></h1>
                    <h1 class="w3-xxxlarge w3-text-blue"><b>Why use it?</b></h1>
                    <p><span class="w3-xlarge">Find Trash Cans</span> You should use this web app because it helps you to find the nearest Trash Can and also gives you the option to add a Trash Can if not already present in the map. Our platform helps to find and map assets users to nearest Trash Can.</p>
                    <a class="w3-button w3-light-grey w3-padding-large w3-section w3-hide-small" href="#">
                        <i class="fa fa-info-circle"></i> Learn to Use</a>
                    </div>
                    <div class="w3-col l4 m6">
                    <img src="https://iarchitsharma.github.io/FTC/img/why.jpg" class="w3-image w3-right w3-hide-small" width="335" height="471" />
                    <div class="w3-center w3-hide-large w3-hide-medium">
                        <a class="w3-button w3-block w3-padding-large" href="#">
                        <i class="fa fa-info-circle"></i> Learn to Use</a>
                        <img src="https://iarchitsharma.github.io/FTC/img/why.jpg" class="w3-image w3-margin-top" width="335" height="471" />
                    </div>
                    </div>
                </div>
            </div>

            {/* <!-- Clarity Section --> */}
            <div class="w3-padding-64 w3-light-grey">
            <div class="w3-row-padding">
                <div class="w3-col l4 m6">
                <img class="w3-image w3-round-large w3-hide-small w3-grayscale" src="https://iarchitsharma.github.io/FTC/img/app5.jpg" alt="FTC Web App" width="335" height="471" />
                </div>
                <div class="w3-col l8 m6">
                <h1 class="w3-jumbo" id="aboutus"><b>About us</b></h1>
                <h1 class="w3-xxxlarge w3-text-red"><b>FTC, who?</b></h1>
                <p><span class="w3-xlarge">Push back the limits of knowledge.</span><br /> This project was created for our submission in SharkHacks3 hackathon. We were initially inspired to solve one of the common problems we find on beaches (as this environment is fitted to the theme of this hackathon). However, it turns out that our program can also be implemented for anywhere else besides from beaches.</p>
                </div>
            </div>
            </div>

            {/* <!-- Features Section --> */}
            <div style = {{backgroundColor: "#5688d0"}} class="w3-container w3-padding-64 w3-center">
            <h1 class="w3-jumbo"><b>Features</b></h1>
            <p>Our FTC Web app is: </p>

            <div class="w3-row" style= {{marginTop: "64px" }}>
                <div class="w3-col s3">
                <i class="fa fa-bolt w3-text-orange w3-jumbo"></i>
                <p>Fast</p>
                </div>
                <div class="w3-col s3">
                <i class="fa fa-heart w3-text-red w3-jumbo"></i>
                <p>Loved</p>
                </div>
                
                <div class="w3-col s3">
                <i class="fa fa-globe w3-text-amber w3-jumbo"></i>
                <p>Global</p>
                </div>
                <div class="w3-col s3">
                <i class="fa fa-user w3-text-sand w3-jumbo"></i>
                <p>Safe</p>
                </div>
            </div>
            <div class="w3-row" style= {{marginTop: "64px"}}>
                
                <div class="w3-col s3">
                <i class="fa fa-shield w3-text-orange w3-jumbo"></i>
                <p>Stabile</p>
                </div>
                <div class="w3-col s3">
                <i class="fa fa-wifi w3-text-grey w3-jumbo"></i>
                <p>Connected</p>
                </div>
            </div>
            </div>


            {/* <!-- Footer --> */}
            <footer class="w3-container w3-padding-32 w3-light-grey w3-center w3-xlarge">
            <p>Follow us</p>
            <div class="w3-section">
                <i class="fa fa-facebook-official w3-hover-opacity"></i>
                <i class="fa fa-instagram w3-hover-opacity"></i>
                <i class="fa fa-snapchat w3-hover-opacity"></i>
                <i class="fa fa-pinterest-p w3-hover-opacity"></i>
                <i class="fa fa-twitter w3-hover-opacity"></i>
                <i class="fa fa-linkedin w3-hover-opacity"></i>
            </div>
            
            </footer>
        </div>
    )
}
