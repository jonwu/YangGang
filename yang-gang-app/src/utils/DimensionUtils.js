import { Dimensions } from "react-native";
import create from "zustand";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const [useStore] = create(set => ({
  deviceWidth,
  deviceHeight,
  setDimensions: () =>
    set(state => {
      const { width, height } = Dimensions.get("window");
      return {
        deviceWidth: width,
        deviceHeight: height
      };
    })
}));

export const useDimensionStore = useStore;
