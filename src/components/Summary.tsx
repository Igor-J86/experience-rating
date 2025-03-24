
type SummaryProps = {
  selectedArea: string
  scores: {
    name: string
    label: string
    score: number
  }[]
}

const Summary = ({ scores, selectedArea }:SummaryProps) => {
  return (
    <div className="summary">
      <h2>{selectedArea} summary</h2>
      <dl>
        {scores.map((topic) => (
          <div className="flex gas" key={topic.name}>
            <dt>{topic.label}</dt> <dd>{topic.score}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default Summary