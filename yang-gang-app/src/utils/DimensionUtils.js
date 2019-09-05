import { Dimensions } from "react-native";
import create from "zustand";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const [useStore] = create(set => ({
  deviceWidth,
  deviceHeight,
  setDimensions: layout =>
    set(state => {
      return {
        deviceWidth: layout.width,
        deviceHeight: layout.height
      };
    })
}));

export const useDimensionStore = useStore;
