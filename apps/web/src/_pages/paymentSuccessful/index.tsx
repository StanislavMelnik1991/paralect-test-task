import { RoutePath } from '_app/routes';
import { PaymentResults } from '_entities';

const PaymentSuccessful = () => (
  <PaymentResults
    text="Hooray, you have completed your payment!"
    route={RoutePath.History}
    image="/images/payment/success.png"
    title="Payment Successful"
  />
);

export default PaymentSuccessful;
