import './App.css';
import Leaderboard from './data/leaderboard.json';

const App = () => {
  return (
    <div className="container">
      <div className="input-group mb-3 mt-5">
        <input type="text" className="form-control" placeholder="Insert User ID"/>
        <button className="btn btn-outline-primary" type="button">Search</button>
      </div>

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
          {Object.values(Leaderboard).map((data) => {
            // console.log(data.name);
            return (
              <tr key={data.uid}>
                <td>{data.name}</td>
                <td>Rank</td>
                <td>{data.bananas}</td>
                <td>Rank</td>
              </tr>
            );
          })}
          
        </tbody>
        
        
      </table>
    </div>
  );
}

export default App;
