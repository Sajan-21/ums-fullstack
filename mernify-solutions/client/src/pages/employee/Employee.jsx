import React from "react";
import "./employee.css";
import Profile from '../../components/profile/Profile'
import ResetPasswordEmployee from "../../components/employeePasswordReset/ResetPasswordEmployee";
import EditDetails from "../../components/editProfile/EditDetails";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Employee() {

  const navigate = useNavigate();
  let params = useParams();
  const id = params.id;
  const [selectedSection, setSelectedSection] = useState("profile");

  const renderSection = () => {
    switch (selectedSection) {
      case "profile":
        return <Profile />;
      case "editDetails":
        return <EditDetails />;
      case "resetPassword":
        return <ResetPasswordEmployee />;
      default:
        return <Profile />;
    }
  };

  const signOut = () => {
    localStorage.removeItem(id);
    console.log("token : ",localStorage.getItem(id));
    navigate('/');
  }


  return (
    <div className="height-100">
      <nav className="p-3 border border-black flex justify-between">
        <div className="mernify-logo">MERNify Solutions</div>
        <div>
          <button className="px-3 py-2 rounded-md bg-gray-600 text-white" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </nav>
      <div className="flex">
        <div className="w-1/4 border border-black bg-blue-950 col">
          <ul className="flex flex-col items-start justify-center gap-2 py-10">
            <li className="bg-blue-900 w-full p-3 font-bold text-2xl text-white" onClick={() => setSelectedSection("profile")}>
              Profile
            </li>
            <li className="bg-blue-900 w-full p-3 font-bold text-2xl text-white" onClick={() => setSelectedSection("editDetails")}>
              Edit Profile
            </li>
            <li className="bg-blue-900 w-full p-3 font-bold text-2xl text-white" onClick={() => setSelectedSection("resetPassword")}>
              Reset Password
            </li>
          </ul>
        </div>
        <div className="w-full employee-bg">
        {renderSection()}
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          {/* Company Info */}
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-evenly">
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="hover:text-gray-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-gray-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-gray-400">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-gray-400">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Employee;
