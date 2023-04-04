export interface LocationsDto {
    id: number;
    tenViTri: string;
    tinhThanh: string;
    quocGia: string;
    hinhAnh: string;
  }
  
  export interface UploadImageLocation {
    id: number;
    formFile: FormData;
  }