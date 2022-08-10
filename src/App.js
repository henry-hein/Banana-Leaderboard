import { useState } from 'react';
import './App.css';
import Leaderboard from './data/leaderboard.json';

const App = () => {
  const [state, setState] = useState({
    searchInput: '',
    renderArr: [],
    currentUserId: true,
  });
 
  // Here we sort array of objects by number of bananas and create sortDescending array
  // If b - a < 0, b is bigger than a, therefore, b comes first
  // If b - a > 0, b is smaller than a, therefore, a comes first
  // if b - a = 0, position remains same
  // sort by numbers of most bananas to fewest bananas
  const sortDescending = Object.values(Leaderboard).sort((currPos, nextPos) => {
    return nextPos.bananas - currPos.bananas;
  });

  // This self-invoked function modifies sortDescending array and adds rank to sorted Array of objects by bananas count.
  // People with same banana counts are assigned same rank but rank doesn't get incremented until below if condition is matched.
  // For example: There are 5 people with banana count of 1000 and rank is 25, next person with banana count of 999 is assigned rank 26 instead of rank 30
  // (() => {
  //   let rank = 1;
  //   for (let i = 0; i < sortDescending.length; i++) {
  //   // increase rank only if current bananas are less than previous
  //   if (i > 0 && sortDescending[i].bananas < sortDescending[i - 1].bananas) {
  //     rank++;
  //   }
  //     sortDescending[i].rank = rank;
  //   } 
  // })();

  // This self-invoked function modifies sortDescending array and adds rank to sorted Array of objects by bananas count.
  // People with same banana counts are assigned same rank but rank gets incremented.
  // For example: There are 5 people with banana count of 1000 and rank is 25, next person with banana count of 999 is assigned rank 30 instead of rank 26
  (() => {
    let rank = 1;
    let count = 0;
    for (let i = 0; i < sortDescending.length; i++) {
    // increase rank only if current bananas are less than previous
    if (i > 0 && sortDescending[i].bananas < sortDescending[i - 1].bananas) {
      rank++;
      rank = rank + count;
      count = 0;
    } else if(i > 0 && sortDescending[i].bananas === sortDescending[i - 1].bananas){
      count++;
    }
      sortDescending[i].rank = rank;
    } 
  })();

  const top10BananasCount = [...sortDescending].slice(0,10); //Create new array limited to people with top 10 bananas

  const onClick = () => {
    // If uid matches searchInput returns the found object sortDescending Array
    // Otherwise returns undefined
    const findPersonById = sortDescending.find((person) => {
      if(state.searchInput !== person.uid){
        setState({...state, currentUserId: false});
      }
      return person.uid === state.searchInput;
    });

    if(findPersonById?.rank > 10){
      top10BananasCount.pop();
      top10BananasCount.push(findPersonById);
      setState({
        ...state,
        renderArr: top10BananasCount,
        currentUserId: findPersonById?.uid,
      });
    } 
    setState({
      ...state,
      renderArr: top10BananasCount,
      currentUserId: findPersonById?.uid,
    });
  }
 
  return (
    <div className="container">
      <form className="input-group mb-3 mt-5">
        <input type="text" className="form-control" placeholder="Insert User ID" onChange={({ target: userIdInput }) => {
            setState({
              ...state,
              searchInput: userIdInput.value,
            });
          }}
        />
        <button className="btn btn-outline-primary" type="button" onClick={onClick}>
          Search
        </button>
      </form>
      {!state.currentUserId && (
        <div className="alert alert-danger" role="alert">
          Current user id does not exist! Please specify an existing user id!
        </div>
      )}
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
          {state.renderArr.map((data) => {
            return (
                <tr key={data.uid} className={data.uid === state.currentUserId? "active" : "inactive"}>
                  <td>{data.name}</td>
                  <td>{data.rank}</td>
                  <td>{data.bananas}</td>
                  <td>{data.uid === state.currentUserId ? 'Yes': 'No'}</td>
                </tr>
            );
          })}          
        </tbody>  
      </table>
    </div>
  );
}

export default App;
