function generateOrderId() {
  const prefix = "ORD";
  const timestamp = Date.now(); // current time in ms
  const random = Math.floor(Math.random() * 1000000); // random 6-digit number
  return `${prefix}-${timestamp}-${random}`;
}

export default generateOrderId;