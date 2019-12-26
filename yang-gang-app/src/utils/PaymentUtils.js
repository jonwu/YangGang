import { Platform } from "react-native";
import {
  connectAsync,
  setPurchaseListener,
  IAPResponseCode,
  finishTransactionAsync,
  getProductsAsync,
  getPurchaseHistoryAsync
} from "expo-in-app-purchases";

const initializeIAP = async () => {
  const history = await connectAsync();
  if (history.responseCode === IAPResponseCode.OK) {
    history.results.forEach(result => {
      // Restore history if needed
    });
  }
  setupPurchaseListener();
  retrieveItems();
};

const setupPurchaseListener = () => {
  setPurchaseListener(({ responseCode, results, errorCode }) => {
    // Purchase was successful
    if (responseCode === IAPResponseCode.OK) {
      results.forEach(purchase => {
        if (!purchase.acknowledged) {
          console.log(`Successfully purchased ${purchase.productId}`);
          // Process transaction here and unlock content...

          // Then when you're done
          finishTransactionAsync(purchase, true);
        }
      });
    }

    // Else find out what went wrong
    if (responseCode === IAPResponseCode.USER_CANCELED) {
      console.log("User canceled the transaction");
    } else if (responseCode === IAPResponseCode.DEFERRED) {
      console.log(
        "User does not have permissions to buy but requested parental approval (iOS only)"
      );
    } else {
      console.warn(
        `Something went wrong with the purchase. Received errorCode ${errorCode}`
      );
    }
  });
};

const retrieveItems = async () => {
  const items = Platform.select({
    ios: [
      "monthly.3",
      "monthly.4",
      "monthly.5",
      "monthly.6",
      "monthly.7",
      "monthly.8",
      "monthly.9",
      "monthly.10",
      "monthly.11",
      "monthly.12"
    ],
    android: [
      "monthly.3",
      "monthly.4",
      "monthly.5",
      "monthly.6",
      "monthly.7",
      "monthly.8",
      "monthly.9",
      "monthly.10",
      "monthly.11",
      "monthly.12"
    ]
  });

  const { responseCode, results } = await getProductsAsync(items);
  if (responseCode === IAPResponseCode.OK) {
    this.setState({ items: results });
  }
};

const updatePurchaseItem = (productId, oldProductId) => {
  purchaseItemAsync(productId, oldProductId);
};

const getPurchaseHistory = async () => {
  const { responseCode, results } = await getPurchaseHistoryAsync();
  if (responseCode === IAPResponseCode.OK) {
    results.forEach(result => {
      // Handle purchase history
    });
  }
};
