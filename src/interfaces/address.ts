export interface DistrictsDto {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: any[];
}
export interface ProvincesDto {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: any[];
}
