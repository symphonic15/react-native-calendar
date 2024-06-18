import Calendar from '@/components/Calendar';
import useChallengeData from '@/hooks/useChallengeData';

export default function Tabs() {
  const { challengeData, setActionName } = useChallengeData();

  return (
    <Calendar data={challengeData} setActionName={setActionName} />
  );
}