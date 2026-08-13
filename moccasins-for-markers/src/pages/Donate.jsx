import Seo from '../components/ui/Seo';
import RemembranceSplit from '../components/donate/RemembranceSplit';

export default function Donate() {
  return (
    <div className="page">
      <Seo
        title="Give"
        description="Support permanent headstones for unmarked graves of former residential school survivors."
        path="/donate"
      />
      <RemembranceSplit id="give" />
    </div>
  );
}
