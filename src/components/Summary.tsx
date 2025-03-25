
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
    <div className="summary flex-1">
      <h2>{selectedArea} oppsummering</h2>
      <div className="columns-grid">
        <dl className="columns-grid">
          {scores.map((topic) => (
            <div className="flex gas" key={topic.name}>
              <dt>{topic.label}</dt> <dd>{topic.score.toFixed(2)}</dd>
            </div>
          ))}
        </dl>
      {!isNaN(scoreAverage) && scoreAverage && 
        <div className="average">
          <h3>Snitt:</h3>
          <span>
            {scoreAverage.toFixed(2)}
          </span>
        </div>
      }
      </div>
    </div>
  )
}

export default Summary