import { DistrictsDto } from "interfaces/address";
import axios from "axios";
import { ProvincesDto } from "interfaces/address";
import { AxiosPromise } from "axios";
export const fetchProvincesListApi = (): AxiosPromise<ProvincesDto[]> => {
  return axios({
    url: "https://provinces.open-api.vn/api/p/",
    method: "GET",
  });
};

export const fetchDistrictsListApi = (
  province_code: number
): AxiosPromise<DistrictsDto[]> => {
  return axios({
    url: `https://provinces.open-api.vn/api/d/?province_code=${province_code}`,
    method: "GET",
  });
};
