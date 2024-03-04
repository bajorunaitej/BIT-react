import Person from "./Person";

export default function PeopleList({ people }) {
  console.log(people);

  return (
    <div className="personList">
      {people.map((person, index) => (
        <Person person={person} key={index} />
      ))}
    </div>
  );
}
