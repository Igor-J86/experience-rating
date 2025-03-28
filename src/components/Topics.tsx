import { areas } from "../utils/globals";

type TopicsProps = {
  selectedArea: string;
  handleScore: React.ChangeEventHandler<HTMLInputElement>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  updateScores: () => void
  resetScores: () => void
  scores: {
    name: string;
    score: number;
  }[];
  isSuperior: boolean
  isSuperiorTotal: boolean
  inputs: {[key: string]: string}
  setIsSuperior: React.Dispatch<React.SetStateAction<boolean>>
  setIsSuperiorTotal: React.Dispatch<React.SetStateAction<boolean>>
};

const Topics = ({
  scores,
  selectedArea,
  handleScore,
  handleInputChange,
  isSuperior,
  isSuperiorTotal,
  updateScores,
  resetScores,
  inputs,
  setIsSuperior,
  setIsSuperiorTotal,
}: TopicsProps) => {
  return (
    <div className="topics flex flex-dir-col gam">
      {selectedArea && !isSuperiorTotal && (
        <button onClick={() => {
          setIsSuperior(!isSuperior)
          setIsSuperiorTotal(false)
          }
        }>
          {isSuperior ? "Individuell" : "Overordnet"}
        </button>
      )}
      <div>
      {!isSuperiorTotal && areas.find((area) => area.id === selectedArea)?.topics.map((topic) => {
        const score = scores.find((score) => score.name === topic.id);
        return (
          <fieldset key={topic.id}>
            <legend>{topic.label}</legend>
            <ul className="no-list-style justify-csb">
              {isSuperior
                ? <li className="flex flex-1 justify-csb">
                    <input type="number" min={1} max={5} onChange={handleInputChange} value={inputs[topic.id] || ''} name={topic.id} />
                  </li>
                : Array.from({ length: 5 }, (_, index) => {
                    return (
                      <li key={index}>
                        <label>
                          <input
                            type="radio"
                            name={topic.id}
                            value={index + 1}
                            onChange={handleScore}
                            checked={
                              score?.name === topic.id &&
                              score?.score === index + 1
                            }
                          />
                          {index + 1}
                        </label>
                      </li>
                    );
                  })}
            </ul>
          </fieldset>
        )
      })}
      </div>
      {isSuperior && !isSuperiorTotal &&
        <div className="flex flex-dir-col gam">
          <button onClick={updateScores}>
            Beregn områdesnitt
          </button>
          {!isSuperiorTotal &&
            <button onClick={resetScores}>
              Nullstill områdesnitt
            </button>
          }
        </div>
      }
    </div>
  );
};

export default Topics;
