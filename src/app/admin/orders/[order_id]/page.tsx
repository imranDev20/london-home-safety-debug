import OrderDetails from "./_components/order-details";
import { Suspense } from "react";

export default function SingleOrderPage() {
  return (
    <Suspense fallback="Loading">
      <OrderDetails />
    </Suspense>
  );
}
