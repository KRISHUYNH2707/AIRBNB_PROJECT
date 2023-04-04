import { DistrictsDto } from "interfaces/address";
import { ProvincesDto } from "interfaces/address";
import { notification } from "antd";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDistrictsListApi, fetchProvincesListApi } from "services/address";
export interface AddressState {
  countryList: Country[];
  provincesList: ProvincesDto[];
  districtsList: DistrictsDto[];
  provinceCode: number;
}

interface Country {
  name: string;
}

const DEFAULT_STATE = {
  countryList: [],
  provincesList: [],
  districtsList: [],
  provinceCode: 1,
} as AddressState;

if (localStorage.getItem("USER_INFO_KEY")) {
  const { token, user } = JSON.parse(
    localStorage.getItem("USER_INFO_KEY") || ""
  );
  //   DEFAULT_STATE.token = token;
  //   DEFAULT_STATE.user = user;
}

export const fetchProvincesListApiAction = createAsyncThunk(
  "locationReducer/fetchProvincesListApiAction",
  async () => {
    const result = await fetchProvincesListApi();
    return result.data;
  }
);
export const fetchDistrictsListApiAction = createAsyncThunk(
  "locationReducer/fetchDistrictsListApiAction",
  async (province_code: number = 1) => {
    const result = await fetchDistrictsListApi(province_code);
    return result.data;
  }
);

const addressSlice = createSlice({
  name: "loginReducer",
  initialState: DEFAULT_STATE,
  reducers: {
    setProvinceCode(state: AddressState, action) {
      state.provinceCode = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchProvincesListApiAction.fulfilled,
      (state: AddressState, action: PayloadAction<ProvincesDto[]>) => {
        state.provincesList = action.payload;
      }
    );
    builder.addCase(fetchProvincesListApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
    builder.addCase(
      fetchDistrictsListApiAction.fulfilled,
      (state: AddressState, action: PayloadAction<DistrictsDto[]>) => {
        state.districtsList = action.payload;
      }
    );
    builder.addCase(fetchDistrictsListApiAction.rejected, () => {
      notification.error({
        message: "Error !",
      });
    });
  },
});

export const addressActions = addressSlice.actions;

export const addressReducer = addressSlice.reducer;
