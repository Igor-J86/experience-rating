import { useState } from "react";
import Chart from "./components/Chart";
import { areas } from "./utils/globals";

const App = () => {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [scores, setScores] = useState<{ name: string; score: number }[]>([])

  const handleScore = ({ currentTarget: { name, value } }:React.ChangeEvent<HTMLInputElement>) => {
    const topicId = name
    const score = +value
    setScores(prevScore => prevScore.some((item) => item.name === topicId)
      ? prevScore.map((item) => item.name === topicId ? { ...item, score } : item )
      : [...prevScore, { name, score }]
    )
  }

  console.log(scores)

  return (
    <div className="wrapper">
      <h1>Min kompetanse</h1>
      <div className="container">
        <ul className="no-list-style">
          {Object.keys(areas).map((area) => {
            return (
              <li key={area}>
                <button
                  value={area}
                  onClick={(e) => setSelectedArea(e.currentTarget.value)}
                >
                  {areas[area as keyof typeof areas].label}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedArea && (
          <div className="flex gam">
            <div>
            {areas[selectedArea as keyof typeof areas].topics.map((topic) => (
              <fieldset key={topic.id}>
                <legend>
                  {topic.label}
                </legend>
                <ul className="no-list-style justify-csb">
                  {Array.from({ length: 5 }, (_, index) => { 
                    return <li key={index}>
                      <input
                        type="radio"
                        id={topic.id + index}
                        name={topic.id}
                        value={index + 1}
                        onChange={handleScore}
                      />
                      <label htmlFor={topic.id + index}>
                        {index + 1}
                      </label>
                    </li>
                  })}
                </ul>
              </fieldset>
            ))}
            </div>
            <div className="container">
              <Chart area={selectedArea} scores={scores} />
            </div>
          </div>
        )}
      
        </div>
    </div>
  );
};

export default App;
