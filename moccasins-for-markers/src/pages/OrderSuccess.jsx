import { useLocation, Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import Button from '../components/ui/Button';
import { formatMoney } from '../data/products';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const { state } = useLocation();
  const isDonation = state?.type === 'donation';

  return (
    <div className="page">
      <Seo title="Thank you" description="Thank you for supporting Moccasins for Markers." path="/order-success" />
      <section className="container success">
        <p className="kicker">Thank you</p>
        <h1>{isDonation ? 'Your gift is received.' : 'Your order is placed.'}</h1>
        <p>
          {isDonation
            ? `Thank you${state?.name ? `, ${state.name}` : ''}. Your ${state?.frequency || 'one-time'} donation${
                state?.amount ? ` of ${formatMoney(state.amount)}` : ''
              } helps place a permanent marker.`
            : `Thank you${state?.name ? `, ${state.name}` : ''}. ${
                state?.total ? `Order total ${formatMoney(state.total)}. ` : ''
              }Every purchase contributes to remembrance.`}
        </p>
        <p className="note">Every stitch honours a name. Thank you for walking with us.</p>
        <div className="success-actions">
          <Button to="/shop" variant="primary">
            Continue shopping
          </Button>
          <Button to="/impact" variant="secondary">
            See our impact
          </Button>
        </div>
        <Link to="/" className="home-link">
          Return home
        </Link>
      </section>
    </div>
  );
}
