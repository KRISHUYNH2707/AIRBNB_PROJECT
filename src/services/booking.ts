import { AxiosPromise } from "axios";
import { BookingDto } from "../interfaces/booking";
import { axiosRequest } from "../configs/axios.config";


export const postBookingApi = (
  roomId: any,
  information: BookingDto 
): AxiosPromise<HttpResponse<BookingDto>> => {
  return axiosRequest({
    url: `/dat-phong/${roomId}`,
    method: "POST",
     data: information,
  });
};
