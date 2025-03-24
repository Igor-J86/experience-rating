import { areas } from "../utils/globals"

type TopicsProps = {
  selectedArea: string
  handleScore: React.ChangeEventHandler<HTMLInputElement>
  scores: {
    name: string
    score: number
  }[]
}

const Topics = ({ scores, selectedArea, handleScore }:TopicsProps) => {
  return (
    <div className="topics">
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
      )}
    </div>
  )
}

export default Topics