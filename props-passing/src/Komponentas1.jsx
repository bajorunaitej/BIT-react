/* eslint-disable react/prop-types */
export default function Komponentas1({ money, perduotiDuomenis }) {
  const vardas = "Stasė";
  return (
    <div className="lime">
      <h1>Koponentas1</h1>
      <p>Pinigų kiekis: {money}</p>
      <button
        onClick={() => {
          perduotiDuomenis(vardas);
        }}
      >
        Išsiųsti duomenis
      </button>
    </div>
  );
}
