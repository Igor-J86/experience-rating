import { useEffect, useState } from "react";
import Chart from "./components/Chart";
import { areas } from "./utils/globals";
import { loadLocal, saveLocal } from "./utils/helpers";
import Topics from "./components/Topics";
import Summary from "./components/Summary";

const App = () => {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [scores, setScores] = useState<
    { name: string; label: string; score: number }[]
  >([]);
  const [averageScores, setAverageScores] = useState<
    { name: string; label: string; score: number }[]
  >([]);
  const [isSuperior, setIsSuperior] = useState<boolean>(false);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  // Handles input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  // Handles score update when clicking "Update Scores"
  const updateScores = () => {
    const updatedItems = averageScores.map((item) => {
      const inputValue = parseFloat(inputs[item.name]); // Get input value
      if (!isNaN(inputValue)) {
        return {
          ...item,
          score: (item.score + inputValue) / 2, // Average calculation
        };
      }
      return item;
    });

    setAverageScores(updatedItems);
    setInputs({}); // Reset input fields after updating
  };

  const handleScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const topicId = e.currentTarget.name;
    const score = +e.currentTarget.value;

    if (score > 5 || score <= 0) return;

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
    const getFromLocal = loadLocal(
      `posten-kompetanse-${selectedArea}${isSuperior ? "-SU" : ""}`
    );
    if (getFromLocal) {
      const localData = JSON.parse(getFromLocal);
      setScores(localData);
      if (isSuperior) {
        setAverageScores(localData);
      }
    } else {
      if (isSuperior) {
        setAverageScores(
          areas
            .find((area) => area.id === selectedArea)
            ?.topics.map((topic) => ({
              name: topic.id,
              label: topic.label,
              score: 1,
            })) || []
        );
      } else {
        setScores(
          areas
            .find((area) => area.id === selectedArea)
            ?.topics.map((topic) => ({
              name: topic.id,
              label: topic.label,
              score: 3,
            })) || []
        );
      }
    }
  }, [selectedArea, isSuperior]);

  useEffect(() => {
    if (isSuperior && selectedArea && averageScores.length > 0) {
      saveLocal(
        `posten-kompetanse-${selectedArea}-SU`,
        JSON.stringify(averageScores)
      );
    } else if (selectedArea && scores.length > 0) {
      saveLocal(
        `posten-kompetanse-${selectedArea}`,
        JSON.stringify(scores)
      );
    }
  }, [scores, selectedArea, isSuperior, averageScores]);

  console.log(averageScores);

  return (
    <div className="wrapper">
      <h1>Min kompetanse</h1>
      <div className="container flex flex-wrap gal">
        <div className="flex flex-wrap gal justify-csb w100p">
          {selectedArea && <div style={{ width: "6rem" }} />}
          <ul className="no-list-style top-nav">
            {areas.map((area) => {
              return (
                <li key={area.id}>
                  <button
                    value={area.id}
                    disabled={area.id === selectedArea}
                    onClick={(e) => {
                      setSelectedArea(e.currentTarget.value);
                    }}
                  >
                    {area.label}
                  </button>
                </li>
              );
            })}
          </ul>
          {selectedArea && (
            <button onClick={() => setIsSuperior(!isSuperior)}>
              {isSuperior ? "Individ" : "Overordnet"}
            </button>
          )}
        </div>
        {selectedArea && (
          <>
            <div className="flex flex-1 gam">
              <Topics
                isSuperior={isSuperior}
                scores={scores}
                selectedArea={selectedArea}
                handleScore={handleScore}
                handleInputChange={(e) => handleInputChange(e)}
                updateScores={updateScores}
                resetScores={() => setAverageScores((prevScores) => prevScores.map((item) => ({...item, score: 1})))}
                inputs={inputs}
              />
              <div className="container canvas">
                <Chart
                  area={selectedArea}
                  scores={isSuperior ? averageScores : scores}
                  isSuperior={isSuperior}
                />
              </div>
            </div>
            <Summary
              scores={isSuperior ? averageScores : scores}
              selectedArea={
                areas.find((area) => area.id === selectedArea)?.label || ""
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
