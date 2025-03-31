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
}: TopicsProps) => {
  return (
    <div className="topics flex flex-dir-col gam">
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
        <div className="flex flex-dir-col gam">
          {isSuperior && !isSuperiorTotal &&
            <button onClick={updateScores}>
              Beregn områdesnitt
            </button>
          }
          {!isSuperiorTotal &&
            <button onClick={resetScores}>
              Nullstill
            </button>
          }
        </div>
    </div>
  );
};

export default Topics;
