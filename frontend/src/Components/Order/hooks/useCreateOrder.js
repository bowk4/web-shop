import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { orderAddNew, orderAddNewUnAvt } from "../../../store/orders/OrderNew";

export const useCreateOrder = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);

  const calculateTotalItemPrice = (price, discount = 0, quantity) => {
    return Math.round(price * (1 - discount) * quantity);
  };

  const totalCartPrice = cartItems.reduce(
    (total, item) =>
      total +
      calculateTotalItemPrice(item.price, item.discount, item.cartQuantity),
    0
  );

  const createOrder = async (values) => {
    const token = localStorage.getItem("token") || null;
    const userId = user?._id || null;
    const resultSlice = userId?.slice(1, -1);
    const currentDate = new Date();

    const orderData = {
      products: cartItems,
      userFirstName: values.firstName,
      userLastName: values.lastName,
      deliveryAddress: values.deliveryAddress,
      deliveryMethod: values.deliveryMethod,
      paymentMethod: values.paymentMethod,
      totalSum: totalCartPrice,
      email: values.email,
      canceled: false,
      mobile: values.phoneNumber,
      letterSubject: "Order Confirmation",
      status: "Pending",
      data: currentDate,
    };

    try {
      const resultAction = await dispatch(
        token && resultSlice
          ? orderAddNew({ ...orderData, customerId: userId })
          : orderAddNewUnAvt(orderData)
      );
      const order = unwrapResult(resultAction);

      return { success: true, order };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  return createOrder;
};
