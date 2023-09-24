export const getAllPaidOrders = (orders) => {
	return orders.filter((order) => order.status === "paid");
};
