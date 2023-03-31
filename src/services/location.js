import { axiosRequest } from "../configs/axios.config"

export const fetchLocationApi = () => {
    return axiosRequest({
        url: "/vi-tri",
        method: "GET"
    })
}

export const fetchNearbyLocations = () => {
    return axiosRequest({
        url: "/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=12",
        method: 'GET'
    })
}
