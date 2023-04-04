import React, { useState, useEffect, useRef } from "react";
import "../styles/carousel.scss"
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { fetchLocationApi } from "../services/location"; 
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useDispatch } from "react-redux";
import { setSelectedLocationReducer } from "../store/actions/locationInfor";
import { lineHeight } from "@mui/system";


interface Location {
    id: number;
    tenViTri: string;
    tinhThanh: string;
    quocGia: string;
    hinhAnh: string;
}


function LocationList() {

    const inlineStyles:{ [key: string]: React.CSSProperties } = {
        locationInput__List: {
            marginTop: "30px",
            marginBottom: "20px",
            marginRight: '80px',
            borderRadius: "0px",
            width: "500px",
            maxHeight: "50vh",
            overflow: "scroll",
            padding: "0rem 0rem 2rem 0rem",
            overflowX: "hidden",
            
        }
    }

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
                        <div style={{lineHeight:'80px'}}>
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

  return (
    <div className="" style={inlineStyles.locationInput__List}>
        {renderLocationList()}
    </div>
  )
}

export default LocationList