import { PdfDocument } from "../utils/helpers"
import { Download } from "./Icons"

type SummaryProps = {
  selectedArea: string
  scores: {
    name: string
    label: string
    score: number
  }[]
  isSuperior: boolean
}

const Summary = ({ scores, selectedArea, isSuperior }:SummaryProps) => {
  let scoreAverage = 0
  scores.map((topic) => (
    scoreAverage = scoreAverage + topic.score
  ))
  scoreAverage = scoreAverage / scores.length

  return (
    <div className="summary flex-1">
      <h2>{selectedArea} {isSuperior ? 'oppsummering' : 'kompetanse'}</h2>
      <div className="columns-grid">
        <dl className="columns-grid">
          {scores.map((topic) => (
            <div className="flex gas align-ic" key={topic.name}>
              <dt>{topic.label}</dt> <dd>{topic.score.toFixed(2)}</dd>
            </div>
          ))}
        </dl>
      {!isNaN(scoreAverage) && scoreAverage && 
        <div className="flex flex-dir-col gal align-ic">
          <div className="flex flex-dir-col align-ic">
            <h3>Snitt:</h3>
            <div className="average">
              {scoreAverage.toFixed(2)}
            </div>
          </div>
          <button onClick={() => PdfDocument(selectedArea)}>
            <Download />
            Last ned PDF
          </button>
        </div>
      }
      </div>
    </div>
  )
}

export default Summary