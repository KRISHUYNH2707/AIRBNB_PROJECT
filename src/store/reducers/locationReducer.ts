import {
  createLocationApi,
  deleteLocationApi,
  updateLocationApi,
  uploadImageLocationApi,
} from "services/location";
import { fetchLocationSearchListApi } from "services/location";
import { Content } from "interfaces/searchContent";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LocationsDto } from "interfaces/location";
import { notification } from "antd";
import { LoginDto, UserInfo } from "interfaces/login";

interface SelectedLocation {
  locationID: number;
  locationName: string;
  checkinDate: Date;
  checkoutDate: Date;
  selectedNumGuest: number;
}

export interface LocationState {
  token: string;
  locationInfo: LocationsDto;
  locationList: Content<LocationsDto>;
  selectedLocation: SelectedLocation;
}

const DEFAULT_STATE = {
  countryList: "12",
  provincesList: [],
  districtsList: [],
  token: "",
  selectedLocation: {
    locationID: -1,
    locationName: "",
    checkinDate: new Date(),
    checkoutDate: new Date(),
    selectedNumGuest: 1,
  },
  locationInfo: {
    id: 1,
    quocGia: "",
    hinhAnh: "",
    tenViTri: "",
    tinhThanh: "",
  },
  locationList: {
    pageIndex: 1,
    pageSize: 3,
    totalRow: 3,
    keywords: "",
    data: [],
  },
} as LocationState;

if (localStorage.getItem("USER_INFO_KEY")) {
  const { token }: LoginDto<UserInfo> = JSON.parse(
    localStorage.getItem("USER_INFO_KEY") || ""
  );

  DEFAULT_STATE.token = token;
}

export const fetchLocationSearchListApiAction = createAsyncThunk(
  "locationReducer/fetchLocationSearchListApiAction",
  async (search: { page: number; size: number; keyword: string }) => {
    const { size, page, keyword } = search;
    if (size) {
      const result = await fetchLocationSearchListApi(page, size, keyword);
      return result.data.content;
    }
    const result = await fetchLocationSearchListApi(
      page,
      DEFAULT_STATE.locationList.pageSize,
      keyword
    );
    return result.data.content;
  }
);

export const fetchCreateLocationApiAction = createAsyncThunk(
  "locationReducer/fetchCreateLocationApiAction",
  async (data: LocationsDto) => {
    await createLocationApi(data);
  }
);

export const fetchUpdateLocationApiAction = createAsyncThunk(
  "locationReducer/fetchUpdateLocationApiAction",
  async (upload: { id: number; data: LocationsDto }) => {
    await updateLocationApi(upload.id, upload.data);
  }
);

export const fetchDeleteLocationApiAction = createAsyncThunk(
  "locationReducer/fetchDeleteLocationApiAction",
  async (id: number) => {
    await deleteLocationApi(id);
  }
);

export const fetchUploadImageLocationApiAction = createAsyncThunk(
  "locationReducer/fetchUploadImageLocationApiAction",
  async (upload: { locationId: number; data: FormData }) => {
    const { locationId, data } = upload;
    await uploadImageLocationApi(locationId, data);
  }
);

const locationSlice = createSlice({
  name: "locationReducer",
  initialState: DEFAULT_STATE,

  reducers: {
    updateLocationInfo(state, action: PayloadAction<LocationsDto>) {
      state.locationInfo = action.payload;
    },
    setSelectedLocationReducer(state, action: PayloadAction<SelectedLocation>) {
      state.selectedLocation.locationID = action.payload.locationID;
      state.selectedLocation.locationName = action.payload.locationName;
      state.selectedLocation.checkinDate = action.payload.checkinDate;
      state.selectedLocation.checkoutDate = action.payload.checkoutDate;
      state.selectedLocation.selectedNumGuest = action.payload.selectedNumGuest;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchLocationSearchListApiAction.fulfilled,
      (state: LocationState, action: PayloadAction<Content<LocationsDto>>) => {
        state.locationList = action.payload;
      }
    );
    builder.addCase(fetchLocationSearchListApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
    builder.addCase(fetchCreateLocationApiAction.fulfilled, () => {
      notification.success({
        message: "Create location successfully !",
      });
    });
    builder.addCase(fetchCreateLocationApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
    builder.addCase(fetchUpdateLocationApiAction.fulfilled, () => {
      notification.success({
        message: "Update location successfully !",
      });
    });
    builder.addCase(fetchUpdateLocationApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
    builder.addCase(fetchUploadImageLocationApiAction.fulfilled, () => {
      notification.success({
        message: "Upload image location successfully !",
      });
    });
    builder.addCase(fetchUploadImageLocationApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
  },
});

export const locationActions = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
