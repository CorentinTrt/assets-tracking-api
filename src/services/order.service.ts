import OrderModel, { OrderDocument } from '../models/order.model';

export async function createOrder(input: OrderDocument) {
  try {
    return await OrderModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }

  //   try {
  //     return await OrderModel.create();
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
}
