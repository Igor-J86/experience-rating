import { areas } from "../utils/globals";

type TopicsProps = {
  selectedArea: string;
  handleScore: React.ChangeEventHandler<HTMLInputElement>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  updateScores: () => void
  scores: {
    name: string;
    score: number;
  }[];
  isSuperior: boolean
  inputs: {[key: string]:{
    id: string
    label: string
    score: number
  }}
};

const Topics = ({
  scores,
  selectedArea,
  handleScore,
  handleInputChange,
  isSuperior,
  updateScores,
  inputs
}: TopicsProps) => {
  console.log(inputs)
  return (
    <div className="topics">
      {areas.find((area) => area.id === selectedArea)?.topics.map((topic) => {
        const score = scores.find((score) => score.name === topic.id);
        return (
          <fieldset key={topic.id}>
            <legend>{topic.label}</legend>
            <ul className="no-list-style justify-csb">
              {isSuperior
                ? <li className="flex flex-1 justify-csb">
                    <input type="number" min={1} max={5} onChange={handleInputChange} value={inputs[topic.id] || 1} name={topic.id} />
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
      <button onClick={updateScores}>
        Beregn snitt
      </button> 
    </div>
  );
};

export default Topics;
