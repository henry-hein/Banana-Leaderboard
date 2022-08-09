import { useState } from 'react';
import './App.css';
import Leaderboard from './data/leaderboard.json';

const App = () => {

  const [searchInput, setSearchInput] = useState('');
  const [renderArr, setRenderArr] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(true);
 
  // Sort converts number into string so instead we execute compareFunction. Thereby, comparing return value of the compare function instead, which in our case is typeOf Number.
  // If a > b sort a after b
  // If b > a sort b after a
  // If a = b do not change order
  // return b-a to sort in descending order
  // here we sort by numbers of bananas

  const sortDescending = Object.values(Leaderboard).splice('').sort((a, b) => {
    return b.bananas - a.bananas;
  });

  // Modified sortDescending Array of objects and inserted a rank property
  const rankedArray = () => {
    let rank = 1;
    for (let i = 0; i < sortDescending.length; i++) {
    // increase rank only if current bananas are less than previous
    if (i > 0 && sortDescending[i].bananas < sortDescending[i - 1].bananas) {
      rank++;
    }
      sortDescending[i].rank = rank;
    } 
  }
  rankedArray(); //sortDescending is ranked

  const top10BananasCount = [...sortDescending].slice(0,10); //Create new array limited to people with top 10 bananas

  const onClick = () => {
    // If uid matches searchInput returns the found object sortDescending Array
    const findPersonById = sortDescending.find((person) => {
      if(searchInput !== person.uid){
        setCurrentUserId(false);
      }
      return person.uid === searchInput;
    });
    //if person banana count rank is more than 10 remove rank 10 and replace with found person
    if(findPersonById?.rank > 10){
      top10BananasCount.pop();
      top10BananasCount.push(findPersonById);
      setRenderArr(top10BananasCount);
      setCurrentUserId(findPersonById?.uid);
    } 
    setRenderArr(top10BananasCount);
    setCurrentUserId(findPersonById?.uid);
  }
 
  return (
    <div className="container">
      <form className="input-group mb-3 mt-5">
        <input type="text" className="form-control" placeholder="Insert User ID" onChange={ (e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button className="btn btn-outline-primary" type="button" onClick={onClick}>
          Search
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rank</th>
            <th scope="col">Number Of Bananas</th>
            <th scope="col">isCurrentUser?</th>
          </tr>
        </thead>
        <tbody>
          {renderArr.map((data) => {
            return (
                <tr key={data.uid} className={data.uid === currentUserId? "active" : "inactive"}>
                  <td>{data.name}</td>
                  <td>{data.rank}</td>
                  <td>{data.bananas}</td>
                  <td>{data.uid === currentUserId ? 'Yes': 'No'}</td>
                </tr>
            );
          })}          
        </tbody>  
      </table>
    </div>
  );
}

export default App;
