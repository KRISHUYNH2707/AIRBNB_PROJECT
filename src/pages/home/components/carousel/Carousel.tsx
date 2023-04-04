import React, { useState, useEffect, useRef } from "react";
import carousel from "../../../../assets/carousel1.jpeg";
import "../../../../styles/carousel.scss";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker} from "react-date-range";
import { fetchLocationApi } from "../../../../services/location";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useDispatch } from "react-redux";
import { setSelectedLocationReducer } from "../../../../store/actions/locationInfor";

interface Location {
    id: number;
    tenViTri: string;
    tinhThanh: string;
    quocGia: string;
    hinhAnh: string;
}

function Carousel(): JSX.Element {

    const dispatch = useDispatch()

    // STATE
    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const [locationInputOnClick, setlocationInputOnClick] =
        useState<boolean>(false);
    const [datePickerOnClick, setDatePickerOnClick] = useState<boolean>(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numGuest, setNumGuest] = useState(1);
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [selectedLocationID, setSelectedLocationID] = useState<number>()
    // END OF STATE

    const handleSelect = (ranges: any) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

 
    

    useEffect(() => {
        getLocationList();
    }, []);

    let locationRef = useRef<any>();
    let datePickerRef = useRef<any>()

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!locationRef.current.contains(event.target)) {
                setlocationInputOnClick(false)
            }
            if (!datePickerRef.current.contains(event.target)) {
                setDatePickerOnClick(false)
            }
        })
    })

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!datePickerRef.current.contains(event.target)) {
                setDatePickerOnClick(false)
            }
        })
    })

    const getLocationList = async () => {
        const result = await fetchLocationApi();
        setSuggestedLocations(result.data.content);
    };

    const renderLocationList = () => {
        return suggestedLocations.map((ele: Location, idx) => {
            return (
                <div className="locationInput__item" key={idx}>
                    <div className="locationInput__item--wrapper d-flex">
                        <div className="suggesteLocation__image">
                            <img
                                className="introLocation__image"
                                src={ele.hinhAnh}
                                alt=""
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setSelectedLocation(ele.tenViTri + ', ' + ele.tinhThanh);
                                    setSelectedLocationID(ele.id)
                                }}
                            >
                                <p className="text-black">
                                    {ele.tenViTri}, {ele.tinhThanh},{" "}
                                    {ele.quocGia}
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const navigate = useNavigate();

    const [windowSize, setWindowSize] = useState(
        window.innerWidth
);
    
      useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize(window.innerWidth);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      });

    console.log(windowSize)

    return (
        <div className="carousel">
            <div className="search__bar d-flex justify-content-center">
                <div className="search__bar--wrapper">
                    <div className="places">
                        <p>Địa điểm</p>
                        <input
                            type="text"
                            placeholder="Bạn sắp đi đâu?"
                            value={selectedLocation}
                            className=""
                            onFocus={() => {
                                setlocationInputOnClick(true);
                            }}
                            
                        />
                        {(locationInputOnClick &&
                            <div 
                            ref={locationRef}
                            className="locationInput__List">
                                {renderLocationList()}
                            </div>
                        )}
                    </div>
                    <div className="book__in">
                        <p>Nhận phòng</p>
                        <input
                            type="text"
                            placeholder={(windowSize > 524) ? startDate.toLocaleDateString() : 'Thêm ngày'}
                            value={(windowSize > 524) ? startDate.toLocaleDateString() : 'Thêm ngày'}
                            onFocus={()=>
                                setDatePickerOnClick(true)    
                                }
                        />
                    </div>
                    <div className="book__out">
                        <p>Trả phòng</p>
                        <input
                            placeholder="Thêm ngày"
                            type="text"
                            value={endDate.toLocaleDateString()}
                            onFocus={()=>setDatePickerOnClick(true)}
                        />
                    </div>
                    <div className="guest">
                        <p>Khách</p>
                        <input
                            placeholder="Thêm khách"
                            type="text"
                            value={numGuest.toLocaleString()}
                            onFocus={()=>setDatePickerOnClick(true)}
                        />
                        <span>
                            <button onClick={() => {
                                dispatch(setSelectedLocationReducer({
                                    selectedLocationID,
                                    selectedLocation,
                                    startDate,
                                    endDate,
                                    numGuest
                                }))
                                navigate("/room-list")
                            }
                               }
                                >
                                <BsSearch></BsSearch>
                            </button>
                        </span>
                    </div>
                </div>
                {datePickerOnClick && 
                                <div ref={datePickerRef} className="datePicker">
                                <DateRangePicker
                                    ranges={[selectionRange]}
                                    minDate={new Date()}
                                    rangeColors={["#FD5B61"]}
                                    onChange={handleSelect}
                                />
                                <div className="pt-4 num__guest pb-3">
                                    <div className="num__guest--wrapper d-flex justify-content-between">
                                        <h5 className="ml-3">Số khách</h5>
                                        <div className="addGuest">
                                            <PeopleAltIcon></PeopleAltIcon>
                                            <input
                                                min={1}
                                                value={numGuest}
                                                onChange={(e: any) =>
                                                    setNumGuest(e.target.value)
                                                }
                                                className="guest__input"
                                                type="number"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>}

            </div>

            <div className="carousel__wrapper">
                <div className="carousel__image">
                    <img
                        src={carousel}
                        className="carousel__background"
                        alt=""
                    />
                </div>
            </div>
            <div className="carousel__desc d-flex text-center justify-content-center align-items-center">
                <p>Nhờ Host, mọi điều đều có thể</p>
            </div>
        </div>
    );
}

export default Carousel;
