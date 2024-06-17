import Calendar from '@/components/Calendar';
import useChallengeData from '@/hooks/useChallengeData';

export default function Tabs() {
  const data = useChallengeData();

  return (
    <Calendar data={data} />
  );
}