import { axiosRequest } from "../configs/axios.config"

export const fetchRoomListApi = (location_id) => {
    return axiosRequest({
        url: `/phong-thue/lay-phong-theo-vi-tri?maViTri=${location_id}`,
        method: "GET"
    })
}