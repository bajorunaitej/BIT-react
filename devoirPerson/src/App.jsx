import { useEffect, useState, useMemo } from "react";
import PeopleList from "./PeopleList";
import { callPeopleApi } from "./api";

function App() {
  const [peopleList, setPeopleList] = useState([]);
  const [selectedGender, setSelectedGender] = useState("female");
  const [sortByName, setSortByName] = useEffect("original");

  useEffect(() => {
    callPeopleApi((data) => {
      setPeopleList(data.results);
    });
  }, []);

  const filteredPeopleList = useMemo(() => {
    return peopleList
      .filter((personObj) => {
        if (selectedGender === "any") return true;
        return personObj.gender === selectedGender;
      })
      .sort((personObj1, personObj2) => {
        const comparisonValue = personObj1.name.first.localeCompare(
          personObj2.person.name.first
        );
        if (sortByName === "asc") return comparisonValue;
        else if (sortByName === "desc") return comparisonValue * -1;
        else return 0;
      });
  }, [peopleList, selectedGender]);

  return (
    <div>
      <select
        value={selectedGender}
        onChange={(e) => {
          setSelectedGender(e.target.value);
        }}
      >
        <option>male</option>
        <option>female</option>
        <option>any</option>
      </select>
      <select
        value={sortByName}
        onChange={(e) => {
          setSortByName(e.target.value);
        }}
      >
        <option value="asc">Ascending name</option>
        <option value="desc">descending name</option>
        <option value="original">Original order</option>
      </select>
      <PeopleList
        people={selectedGender === "any" ? peopleList : filteredPeopleList}
      />
    </div>
  );
}

export default App;
