export default function Person({ person }) {
  function getFullName({ title, first, last }) {
    return `${title} ${first} ${last}`;
  }

  function savePersonToLocalStorage() {
    const currentLocalPeople = JSON.parse(localStorage.getItem("people")) || [];
    currentLocalPeople.push(person);
    const emailsList = [];
    const originalPeople = currentLocalPeople.filter((p) => {
      if (!emailsList.includes(p.email)) {
        emailsList.push(p.email);
        return true;
      } else return false;
    });
    console.log(originalPeople);
    localStorage.setItem("people", JSON.stringify([...originalPeople]));
  }

  return (
    <div className="person">
      <img src={person.picture.large} alt={getFullName(person.name)} />
      <p>Name: {getFullName(person.name)}</p>
      <p>Gender: {person.gender}</p>
      <p>Email: {person.email}</p>
      <p>Phone nr: {person.phone}</p>
      <p>Country: {person.location.country}</p>
      <button onClick={savePersonToLocalStorage}>Save</button>
    </div>
  );
}
