import { PdfDocument } from "../utils/helpers"

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
            <div className="flex gas align-ic" key={topic.name}>
              <dt>{topic.label}</dt> <dd>{topic.score.toFixed(2)}</dd>
            </div>
          ))}
        </dl>
      {!isNaN(scoreAverage) && scoreAverage && 
        <div className="average">
          <h3>Snitt:</h3>
          <div>
            {scoreAverage.toFixed(2)}
          </div>
          <button onClick={() => PdfDocument(selectedArea)}>Last ned PDF</button>
        </div>
      }
      </div>
    </div>
  )
}

export default Summary