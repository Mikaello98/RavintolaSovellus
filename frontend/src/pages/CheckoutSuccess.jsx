import { useParams } from "react-router-dom";

export default function CheckoutSuccess() {
  const { orderId } = useParams();

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold">Tilaus vahvistettu!</h1>
      <p className="mt-3 text-xl">Kiitämme — tilauksesi ID on:</p>
      <p className="font-mono text-2xl mt-2">{orderId}</p>
    </div>
  );
}