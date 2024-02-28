import AddScooterForm from "./AddScooter";

export default function Top({ notifyScooterAddition }) {
  return (
    <div className="container mx-auto bg-pink-50 min-h-[400px] p-4">
      <h2 className="text-center my-20 text-xl font-bold">
        Paspirtuko pridėjimas
      </h2>
      <AddScooterForm notifyScooterAddition={notifyScooterAddition} />
    </div>
  );
}
