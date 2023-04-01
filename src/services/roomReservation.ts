import { AxiosPromise } from "axios";
import { axiosRequest } from "configs/axios.config";
import { Request } from "enums";
import { RoomReservationsDto } from "interfaces/roomReservation";
const {
  GET,
  //  DELETE, POST, PUT
} = Request;
export const getRoomReservationListApi = (): AxiosPromise<
  HttpResponse<RoomReservationsDto[]>
> => {
  return axiosRequest({
    url: `/dat-phong`,
    method: GET,
  });
};
