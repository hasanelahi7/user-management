import React from "react";
import gigImage from "../assets/gif.gif"; // Adjust the path based on your folder structure

const AboutUs = () => {
    return (
        <div className="text-center">
            <img src={gigImage} alt="Gig Image" className="mx-auto mt-2" style={{ width: "50%", maxWidth: "600px"  }} />
            <h1 className="text-2xl font-bold mt-4">About Us</h1>
            <h2 className="text-lg font-semibold mt-4">Our Mission and Vision</h2>
            <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices libero nec mauris fermentum, eget consectetur libero rutrum...
            </p>
        </div>
    );
};

export default AboutUs;
