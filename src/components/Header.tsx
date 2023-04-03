import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import { TbWorld } from "react-icons/tb";
import { BiMenu } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import background from "../assets/background.jpg";
import "../styles/header.css";
import { fetchLocationApi } from "../services/location";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(): JSX.Element {
    const [settingMenu, setSettingMenu] = useState<boolean>(false);
    
    //TODO - NEED TO CHANGE THE CORRECT REDUCER WHEN MERGING
    const userDetailState = useSelector((state:any) => state.selectedLocationReducer)

    const userMenuRef = useRef<any>()
    
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!userMenuRef.current.contains(event.target)) {
                setSettingMenu(false)
            }
            if (!userMenuRef.current.contains(event.target)) {
                setSettingMenu(false)
            }
        })
    })

    const navigate = useNavigate();
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
                            <a
                                href=""
                                className="text-decoration-none text-white opacity-25"
                            >
                                <li>Đón tiếp khách</li>
                            </a>
                        </ul>
                    </div>
                    <div>
                        <TbWorld
                            style={{ fontSize: "1.5rem", color: "white" }}
                        ></TbWorld>
                    </div>

                    <div
                        className="header__setting--outer"
                        ref={userMenuRef}
                        onClick={() => setSettingMenu(!settingMenu)}
                    >
                        <div className="header__setting">
                            <BiMenu
                                style={{ fontSize: "1.5rem", color: "black" }}
                            ></BiMenu>
                            <HiUserCircle
                                style={{ fontSize: "1.5rem", color: "black" }}
                            ></HiUserCircle>
                        </div>
                        {settingMenu && (
                            <div className="user__info">
                                <div className="user__info--top">
                                    {/* //TODO - CHANGE TO THE CORRECT ATTRIBUTE, NOT LOCATIONAME WHEN MERGING */}
                                    {userDetailState.locationName == '' 
                                    ?(
                                        <div className="user__info--wrapper">
                                                                        <div className="user__signinup">
                                                                            <div className="user__signin">
                                                                                <button
                                                                                    onClick={() =>
                                                                                        navigate("/sign-in")
                                                                                    }
                                                                                >
                                                                                    Đăng nhập
                                                                                </button>
                                                                            </div>
                                                                            <div className="user__signup">
                                                                                <button
                                                                                    onClick={() =>
                                                                                        navigate("/sign-up")
                                                                                    }
                                                                                >
                                                                                    Đăng ký
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                        </div>)
                                    :
                                    <div className="user__features">
                                    <div className="feature__item">
                                        <div className="feature__item--inner">
                                            <a href="">Tin nhắn</a>
                                        </div>
                                    </div>
                                    <div className="feature__item">
                                        <div className="feature__item--inner">
                                            <a href="">Thông báo</a>
                                        </div>
                                    </div>
                                    <div className="feature__item">
                                        <div className="feature__item--inner">
                                            <a href="">Chuyến đi</a>
                                        </div>
                                    </div>
                                    <div className="feature__item">
                                        <div className="feature__item--inner">
                                            <a href="">Yêu thích</a>
                                        </div>
                                    </div>
                                </div>}


                                </div>

                                <div className="user__info--wrapper">
                                    <div className="user__info--bottom">
                                    <div className="user__services">
                                        <ul>
                                            <li>
                                                <a href="">Trải nghiệm</a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    Trở thành host
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">{userDetailState.locationName == '' ? 'Trợ giúp' : 'Tài khoản'}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                

                                
                                </div>
                                {userDetailState.locationName !== '' 
                                &&
                                <div className="user__info--addedBottom">
                                <div className="user__info--wrapper">
                                    <div className="user__services">
                                        <ul>
                                            <li>
                                                <a href="">Trợ giúp</a>
                                            </li>
                                            <li>
                                                <a href="">Đăng xuất</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>} 

                            </div>
                        )}
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
