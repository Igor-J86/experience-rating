import { useEffect, useState } from "react";
import Chart from "./components/Chart";
import { areas } from "./utils/globals";
import { loadLocal, saveLocal } from "./utils/helpers";
import Topics from "./components/Topics";
import Summary from "./components/Summary";

const App = () => {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [scores, setScores] = useState<{ name: string; label: string; score: number }[]>([]);

  const handleScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const topicId = e.currentTarget.name;
    const score = +e.currentTarget.value;

    setScores((prevScore) => {
      const existingItem = prevScore.find((item) => item.name === topicId);

      return existingItem
        ? prevScore.map((item) =>
            item.name === topicId ? { ...item, score } : item
          )
        : [...prevScore, { name: topicId, label: existingItem!.label, score }];
      });
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
          label: topic.label,
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
      <div className="container flex flex-wrap gal">
        <ul className="no-list-style flex flex-wrap top-nav">
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
            <div className="flex flex-1 gam">
              <Topics scores={scores} selectedArea={selectedArea} handleScore={handleScore} />
              <div className="container canvas">
                <Chart area={selectedArea} scores={scores} />
              </div>
            </div>
            <Summary scores={scores} selectedArea={areas[selectedArea as keyof typeof areas].label} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
