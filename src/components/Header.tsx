import React from "react";
import logo from "../assets/logo.png";
import { TbWorld } from "react-icons/tb";
import { BiMenu } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import background from "../assets/background.jpg";
import "../styles/header.css"
import { fetchLocationApi } from "../services/location";

export default function Header(): JSX.Element {



    return (
        <div className="header">
            <div className="header__wrapper d-flex justify-content-between align-items-center">
                <img src={logo} className="logo" alt="" />
                <div className="flex-1 nav__middle justify-content-between">
                    <ul className="list-unstyled d-flex align-items-center">
                        <a href="">
                            <li>Nơi ở</li>
                        </a>
                        <a href="">
                            <li>Trải nghiệm</li>
                        </a>
                        <a href="">
                            <li>Trải nghiệm trực tuyến</li>
                        </a>
                    </ul>
                </div>
                <div className="nav__right d-flex align-items-center justify-content-between">
                    <div>
                        <ul className="list-unstyled my-0">
                        <a href="" className="text-decoration-none text-white opacity-25">
                                <li>Đón tiếp khách</li>
                        </a>
                        </ul>
                    </div>
                    <div>
                        <TbWorld style={{fontSize: "1.5rem", color: "white"}}></TbWorld>
                    </div>
                    <div>
                        <div className="header__setting">
                            <BiMenu style={{fontSize: "1.5rem", color: "black"}}></BiMenu>
                            <HiUserCircle style={{fontSize: "1.5rem", color: "black"}}></HiUserCircle>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div>
        //     <nav className="navbar-expand-lg navbar-light bg-light">
        //         <div className="row">
        //             <div className="col">
        //                 <a className="navbar-brand" href="#">
        //                     Navbar
        //                 </a>
        //             </div>
        //             <div className="col">
        //                 <div
        //                     className="collapse navbar-collapse"
        //                     id="navbarNav"
        //                 >
        //                     <ul className="navbar-nav">
        //                         <li className="nav-item active">
        //                             <a className="nav-link" href="#">
        //                                 Nơi ở{" "}
        //                                 <span className="sr-only">
        //                                     (current)
        //                                 </span>
        //                             </a>
        //                         </li>
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="#">
        //                                 Trải nghiệm
        //                             </a>
        //                         </li>
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="#">
        //                                 Trải nghiệm trực tiếp
        //                             </a>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>

        //             <div className="col">
        //                                         <div
        //                     className="collapse navbar-collapse"
        //                     id="navbarNav"
        //                 >
        //                     <ul className="navbar-nav">
        //                         <li className="nav-item active">
        //                             <a className="nav-link" href="#">
        //                                 Đón tiếp khách{" "}
        //                                 <span className="sr-only">
        //                                     (current)
        //                                 </span>
        //                             </a>
        //                         </li>
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="#">
        //                                 Ngôn ngữ
        //                             </a>
        //                         </li>
        //                         <li className="nav-item">
        //                             <a className="nav-link" href="#">
        //                                 Login
        //                             </a>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>
        // </div>
    );
}
