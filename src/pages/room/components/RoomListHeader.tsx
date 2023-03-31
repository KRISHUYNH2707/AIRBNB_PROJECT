import React from "react";
import { TbWorld } from "react-icons/tb";
import { BiMenu } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import background from "../assets/background.jpg";
import logo from "../../../assets/logo.png";
import { BsSearch } from "react-icons/bs";
import styles from "../../../styles/roomheader.module.css"
import "../../../styles/carousel.css"
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils";
import { fetchLocationApi } from "../../../services/location";
import LocationList from "../../../components/LocationList";


function RoomListHeader() {

    const selectedLocationState = useSelector((state:any) => state.selectedLocationReducer);

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <a className={styles.nav__left} href="/">
                    <img src={logo} className={styles.logo} alt="" />
                </a>

                <div className={styles.nav__middle}>
                        <div className={styles.searchbar__room__wrapper}>
                            <div className={styles.room__places}  style={{'fontWeight': '500'}}>
                                <p>Khu vực {selectedLocationState.locationName}</p>
                            </div>
                            <div className={styles.room__bookinout}  style={{'fontWeight': '500'}}>
                                <p>{formatDate(selectedLocationState.checkinDate) + ' - ' + formatDate(selectedLocationState.checkoutDate)}</p>
                            </div>
                            <div className={styles.room__guest}  style={{'fontWeight': 'lighter'}}>
                                <p>{selectedLocationState.selectedNumGuest} khách</p>
                                <div>
                                  <button>
                                          <BsSearch></BsSearch>
                                  </button>
                                </div>
                            </div>
                        </div> 
                </div>
                <div className={styles.nav__right}>
                    <ul className="list-unstyled my-0">
                        <a
                            href=""
                            className="text-decoration-none text-dark opacity-25"
                        >
                            <li>Trở thành chủ nhà</li>
                        </a>
                    </ul>
                    <TbWorld
                        style={{ fontSize: "1.5rem", color: "black" }}
                    ></TbWorld>
                    <div className="header__setting">
                        <BiMenu
                            style={{ fontSize: "1.5rem", color: "black" }}
                        ></BiMenu>
                        <HiUserCircle
                            style={{ fontSize: "1.5rem", color: "black" }}
                        ></HiUserCircle>
                    </div>
                </div>
            </div>

            <LocationList></LocationList>

        </div>
    );
}

export default RoomListHeader;
