import React from "react";
import "../styles/footer.css";
import { TbWorld } from "react-icons/tb";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

function Footer(): JSX.Element {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="footer__links row justify-content-between">
                    <div className="footer__element col-md-12 col-xl-3">
                        <h3>GIỚI THIỆU</h3>
                        <div className="intro__block--wrapper">
                            <div className="intro__block px-lg-0">
                                <ul>
                                    <li>
                                        <a href="">Phương thức hoạt động của Airbnb</a>
                                    </li>
                                    <li>
                                        <a href="">Trang tin tức</a>
                                    </li>
                                    <li>
                                        <a href="">Nhà đầu tư</a>
                                    </li>
                                    <li>
                                        <a href="">Airbnb Plus</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="intro__block px-lg-0">
                                <ul>
                                    <li>
                                        <a href="">Airbnb Luxe</a>
                                    </li>
                                    <li>
                                        <a href="">HotelTonight</a>
                                    </li>
                                    <li>
                                        <a href="">Airbnb for Work</a>
                                    </li>
                                    <li>
                                        <a href="">Nhờ có host, mọi điều đều có thể</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="intro__block px-lg-0">
                                <ul>
                                    <li>
                                            <a href="">Cơ hội nghề nghiệp</a>
                                        </li>
                                        <li>
                                            <a href="">Thư của nhà sáng lập</a>
                                        </li>
                                </ul>
                            </div>
          
                        </div>

                    </div>
                    <div className="footer__element col-md-12 col-xl-3">
                        <h3>CỘNG ĐỒNG</h3>
                        <div className="community__block--wrapper">
                            <div className="community__block px-lg-0">
                                <ul>
                                <li>
                                <a href="">Sự đa dạng và cảm giác thân thuộc</a>
                            </li>
                            <li>
                                <a href="">
                                    Tiện nghi phù hợp cho người khuyết tật
                                </a>
                            </li>
                                </ul>
                            </div>
                            <div className="community__block px-lg-0">
                                <ul>
                                <li>
                                <a href="">Đối tác liên kết Airbnb</a>
                            </li>
                            <li>
                                <a href="">Chổ ở cho tuyến đầu</a>
                            </li>
                                </ul>
                            </div>
                            <div className="community__block px-lg-0">
                                <ul>
                                <li>
                                <a href="">Lượt giới thiệu của khách</a>
                            </li>
                            <li>
                                <a href="">Airbnb.org</a>
                            </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer__element col-md-12 col-xl-3">
                        <h3>ĐÓN TIẾP KHÁCH</h3>
                        <div className="welcome__block--wrapper">
                            <div className="welcome__block px-lg-0">
                                <ul>
                                <li>
                                <a href="">Cho thuê nhà</a>
                            </li>
                            <li>
                                <a href="">Tổ chức trải nghiệm trực tuyến</a>
                            </li>
                                </ul>
                            </div>
                            <div className="welcome__block px-lg-0">
                                <ul>
                                <li>
                                <a href="">Tổ chức trải nghiệm</a>
                            </li>
                            <li>
                                <a href="">Trung tâm tài nguyên</a>
                            </li>
                                </ul>
                            </div>
                            <div className="welcome__block px-lg-0">
                                <ul>
                                <li>
                                <a href="">Trung tâm cộng động</a>
                            </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer__element col-md-12 col-xl-3">
                        <h3>HỖ TRỢ</h3>
                        <div className="support__block--wrapper">
                            <div className="support__block">
                                <ul>
                                <li>
                                <a href="">
                                    Biện pháp ứng phó với đại dịch COVID-19 của
                                    chúng tôi
                                </a>
                            </li>
                            <li>
                                <a href="">Trung tâm trợ giúp</a>
                            </li>
                                </ul>
                            </div>
                            <div className="support__block">
                                <ul>
                                <li>
                                <a href="">Các tùy chọn hủy</a>
                            </li>
                            <li>
                                <a href="">Hỗ trợ khu dân cư</a>
                            </li>
                                </ul>
                            </div>
                            <div className="support__block">
                                <ul>
                                <li>
                                <a href="">Tin cậy và an toàn</a>
                            </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright d-flex justify-content-between pb-xl-4 pt-xl-4">
                    <div className="copyright__left">
                        <ul className="legal d-flex justify-content-between align-items-center mb-lg-0">
                            <li>2021 Airbn, Inc. All rights reserved</li>
                            <div className="legal__links d-flex">
                            <li>
                                <a href="">Quyền riêng tư</a>
                            </li>
                            <li>
                                <a href="">Điều khoản</a>
                            </li>
                            <li>
                                <a href="">Sơ đồ trang web</a>
                            </li>
                            </div>

                        </ul>
                    </div>
                    <div className="copyright__right d-flex justify-content-between">
                        <div className="footer__setting d-flex justify-content-between align-items-center" >
                            <span>
                            <a className='world__icon' href="">                            
                            <TbWorld
                                style={{color: "black" }}
                            ></TbWorld></a>

                            <a className="ml-2 mr-2" href="">Tiếng Việt (VN)</a>
                            </span>
                            <span>$<a className="ml-2 mr-2" href="">USD</a></span>
                            
                        </div>
                        <div className="footer__social">
                            <ul className="d-flex mb-0">
                                <li>
                                    <a href="">
                                        <GrFacebookOption></GrFacebookOption>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <AiOutlineTwitter></AiOutlineTwitter>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <AiOutlineInstagram></AiOutlineInstagram>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
