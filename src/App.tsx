import { useEffect, useState } from "react";
import Chart from "./components/Chart";
import { areas } from "./utils/globals";
import { loadLocal, saveLocal } from "./utils/helpers";

const App = () => {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [scores, setScores] = useState<{ name: string; score: number }[]>([]);

  const handleScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const topicId = e.currentTarget.name;
    const score = +e.currentTarget.value;
    setScores((prevScore) =>
      prevScore.some((item) => item.name === topicId)
        ? prevScore.map((item) =>
            item.name === topicId ? { ...item, score: score } : item
          )
        : [...prevScore, { name: topicId, score: score }]
    );
  };

  useEffect(() => {
    const getFromLocal = loadLocal(`posten-kompetanse-${selectedArea}`);
    if (getFromLocal) {
      const localData = JSON.parse(getFromLocal);
      setScores(localData);
    } else {
      setScores(
        areas[selectedArea as keyof typeof areas]?.topics.map((topic) => ({
          name: topic.id,
          score: 3,
        }))
      );
    }
  }, [selectedArea]);

  useEffect(() => {
    if (selectedArea && scores.length > 0) {
      saveLocal(`posten-kompetanse-${selectedArea}`, JSON.stringify(scores));
    }
  }, [scores, selectedArea]);

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
                  disabled={area === selectedArea}
                  onClick={(e) => {
                    setSelectedArea(e.currentTarget.value);
                    setScores(
                      selectedArea !== e.currentTarget.value ? [] : scores
                    );
                  }}
                >
                  {areas[area as keyof typeof areas].label}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedArea && (
          <>
            <h2>{areas[selectedArea as keyof typeof areas].label}</h2>
            <div className="flex gam">
              <div>
                {areas[selectedArea as keyof typeof areas].topics.map(
                  (topic) => (
                    <fieldset key={topic.id}>
                      <legend>{topic.label}</legend>
                      <ul className="no-list-style justify-csb">
                        {Array.from({ length: 5 }, (_, index) => {
                          const score = scores.find(
                            (score) => score.name === topic.id
                          );
                          return (
                            <li key={index}>
                              <input
                                type="radio"
                                id={topic.id + index}
                                name={topic.id}
                                value={index + 1}
                                onChange={handleScore}
                                checked={
                                  score?.name === topic.id &&
                                  score?.score === index + 1
                                }
                              />
                              <label htmlFor={topic.id + index}>
                                {index + 1}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </fieldset>
                  )
                )}
              </div>
              <div className="container canvas">
                <Chart area={selectedArea} scores={scores} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
