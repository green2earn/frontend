import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface SolarData{
    MaxSunshineHoursPerYear: string,
    MinSunshineHoursPerYear:string,
    RadiationIntensity:string
}
type ToggleState = {
    isDisplayedPanelList: boolean
    isDisplayedInventerlList: boolean
    address: string
    displayLayout: boolean
    displayStep1: boolean
    displayRoofType: boolean
    displayMap:boolean
    roofType: string
    propertyType: string
    quanlity:string
    solarData: {
        MaxSunshineHoursPerYear: string,
        MinSunshineHoursPerYear:string,
        RadiationIntensity:string
    }
};

const initialState: ToggleState = {
    isDisplayedPanelList: false,
    isDisplayedInventerlList: false,
    address: '',
    displayLayout: false,
    displayStep1: false,
    displayMap:false,
    displayRoofType: false,
    roofType: '',
    propertyType: '',
    quanlity:'High-End',
    solarData: {
        MaxSunshineHoursPerYear: '',
        MinSunshineHoursPerYear:'',
        RadiationIntensity:''
    }
};

export const toggleSlice = createSlice({
	name: "select",
	initialState,
    reducers: {
        activeDisplayPanelList: (state, actions: PayloadAction<boolean>) => {
            state.isDisplayedPanelList = actions.payload,
            state.isDisplayedInventerlList =false
        },
        activeDisplayInterverList: (state, actions: PayloadAction<boolean>)=>{
            state.isDisplayedPanelList = false
            state.isDisplayedInventerlList = actions.payload
        },
        setAddress: (state,actions:PayloadAction<string>) => {
			state.address = actions.payload
        },
        setDisplayLayout: (state, actions: PayloadAction<boolean>) => {
            state.displayLayout = actions.payload
        },
        setDisplayStep1: (state,actions:PayloadAction<boolean>) => {
            state.displayStep1 = actions.payload
        },
        setDisplayRoofType:(state,actions:PayloadAction<boolean>) => {
            state.displayRoofType = actions.payload
        },
        setChooseRoofType:(state,actions:PayloadAction<string>) => {
            state.roofType = actions.payload
        },
        setDisplayMap: (state, actions: PayloadAction<boolean>) => {
            state.displayMap = actions.payload
        },
        setPropertyType: (state, actions: PayloadAction<string>) => {
            state.propertyType = actions.payload
        },
        setSolarData: (state, actions: PayloadAction<SolarData>) => {
            state.solarData = {
                MaxSunshineHoursPerYear: actions.payload.MaxSunshineHoursPerYear,
                MinSunshineHoursPerYear: actions.payload.MinSunshineHoursPerYear,
                RadiationIntensity:actions.payload.RadiationIntensity,
            }
        },
        setQuanlity :(state, actions: PayloadAction<string>) => {
           state.quanlity = actions.payload
        }
    }
});

export const {
    activeDisplayPanelList, activeDisplayInterverList, setAddress, setDisplayLayout, setDisplayStep1, setDisplayRoofType, setChooseRoofType, setDisplayMap,
    setPropertyType,setSolarData, setQuanlity
} = toggleSlice.actions;
export default toggleSlice.reducer;
