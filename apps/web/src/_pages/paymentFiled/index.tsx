import { RoutePath } from '_app/routes';
import { PaymentResults } from '_entities';

const PaymentFiled = () => (
  <PaymentResults
    text="Sorry, your payment failed. Would you like to try again?"
    title="Payment Failed"
    route={RoutePath.Cart}
    image="/images/payment/failed.png"
  />
);

export default PaymentFiled;
