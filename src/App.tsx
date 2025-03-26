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
  const [averageTotal, setAverageTotal] = useState<
    { name: string; label: string; score: number }[]
  >(areas.map((a) => ({ name: a.id, label: a.label, score: 1})));
  const [isSuperior, setIsSuperior] = useState<boolean>(false);
  const [isSuperiorTotal, setIsSuperiorTotal] = useState<boolean>(false);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  // Handles input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  // Calculate average scores per topic
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
    setIsSuperiorTotal(false)
  };

  // Set scores per topic
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

  // Using the data from local storage
  useEffect(() => {
    const getFromLocal = loadLocal(
      `posten-kompetanse-${selectedArea}${isSuperior ? "-SU" : ""}`
    );
    if (getFromLocal && !isSuperiorTotal) {
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
  }, [selectedArea, isSuperior, isSuperiorTotal]);

  // Storing in local storage
  useEffect(() => {
    if (isSuperior && !isSuperiorTotal && selectedArea && averageScores.length > 0) {
      saveLocal(
        `posten-kompetanse-${selectedArea}-SU`,
        JSON.stringify(averageScores)
      );
    } else if (selectedArea && !isSuperiorTotal && scores.length > 0) {
      saveLocal(
        `posten-kompetanse-${selectedArea}`,
        JSON.stringify(scores)
      );
    }
  }, [scores, selectedArea, isSuperior, isSuperiorTotal, averageScores]);

  // Calculating the total areas average
  const calculateTotalAverage = () => {
    if (averageScores.length === 0) return; // Avoid unnecessary updates

    const localSuperiorData = areas.map((a) => ({ area: a.id, label: a.label, data: JSON.parse(loadLocal(
      `posten-kompetanse-${a.id}-SU`
    ) as string)}))
    
    setAverageTotal(localSuperiorData.map((a) => {
      if (!a.data || a.data.length === 0) {
        return { name: a.area, label: a.label, score: 0 }
      }
      const totalScore = a.data.reduce((sum:number, item:{score:number}) => sum + (item.score || 0), 0)
      const averageScore = totalScore / a.data.length

      return { name: a.area, label: a.label, score: +averageScore.toFixed(2)}
    }));
  
    setIsSuperiorTotal(true)
  }

  return (
    <div className="wrapper">
      <h1>Min kompetanse</h1>
      <div className="container flex flex-wrap gal">
        <div className="flex flex-wrap gal justify-cc w100p">
          {!isSuperiorTotal &&
            <nav>
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
            </nav>
          }
        </div>
        {selectedArea && (
          <>
            <div className="flex flex-1 gam">
              <Topics
                isSuperior={isSuperior}
                isSuperiorTotal={isSuperiorTotal}
                scores={scores}
                selectedArea={selectedArea}
                calculateTotalAverage={calculateTotalAverage}
                handleScore={handleScore}
                handleInputChange={(e) => handleInputChange(e)}
                setIsSuperior={(e) => setIsSuperior(e)}
                setIsSuperiorTotal={(e) => setIsSuperiorTotal(e)}
                updateScores={updateScores}
                resetScores={() => setAverageScores((prevScores) => prevScores.map((item) => ({...item, score: 1})))}
                inputs={inputs}
              />
              <div className="container canvas">
                <Chart
                  area={selectedArea}
                  scores={isSuperior && isSuperiorTotal ? averageTotal : isSuperior ? averageScores : scores}
                  isSuperior={isSuperior}
                  isSuperiorTotal={isSuperiorTotal}
                />
              </div>
            </div>
            <Summary
              scores={isSuperior && isSuperiorTotal ? averageTotal : isSuperior ? averageScores : scores}
              selectedArea={
                isSuperior && isSuperiorTotal ? 'Områder' : areas.find((area) => area.id === selectedArea)?.label || ""
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
