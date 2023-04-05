import { combineReducers } from "redux";
import { customerInfoReducer, productsReducer, selectedProductsReducer } from "./productsReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  customerInfo: customerInfoReducer
});
export default reducers;
