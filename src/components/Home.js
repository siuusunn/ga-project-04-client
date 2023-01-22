const owner = 'SL';
const amount = 'HKD$5000';

export default function Home() {
  return (
    <>
      <h1>Welcome to {owner}'s Red Packet Clicker</h1>
      <h2>
        {owner} is giving out {amount} this Lunar New Year
      </h2>
      <h3>Get clicking now to claim your share</h3>
    </>
  );
}
