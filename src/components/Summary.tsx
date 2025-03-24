
type SummaryProps = {
  selectedArea: string
  scores: {
    name: string
    label: string
    score: number
  }[]
}

const Summary = ({ scores, selectedArea }:SummaryProps) => {
  let scoreAverage = 0
  scores.map((topic) => (
    scoreAverage = scoreAverage + topic.score
  ))
  scoreAverage = scoreAverage / scores.length
  return (
    <div className="summary">
      <h2>{selectedArea} summary</h2>
      <div className="flex gal">
        <dl>
          {scores.map((topic) => (
            <div className="flex gas" key={topic.name}>
              <dt>{topic.label}</dt> <dd>{topic.score}</dd>
            </div>
          ))}
        </dl>
      {scoreAverage !== 0 &&
        <div className="average">
          <h3>Snitt:</h3>
          <span>
            {scoreAverage}
          </span>
        </div>
      }
      </div>
    </div>
  )
}

export default Summary