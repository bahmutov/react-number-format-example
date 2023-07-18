import { PatternFormat, NumericFormat } from 'react-number-format'
import './App.css'

function App() {
  return (
    <div>
      <PatternFormat
        format="+1 (###) #### ###"
        allowEmptyFormatting
        mask="_"
        data-cy="phone"
      />
      <br />
      <NumericFormat
        value={1234}
        prefix="$"
        allowNegative={false}
        decimalScale={2}
        inputMode="decimal"
        onValueChange={(values, sourceInfo) => {
          console.log(values, sourceInfo)
        }}
        data-cy="price"
      />
    </div>
  )
}

export default App
