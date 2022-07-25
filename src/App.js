import './App.css';
import Box from './Components/Box';
import Screen from './Components/Screen';
import Button from './Components/Button';
import CalcProvider from './Context/CalcContext';
import Footer from './Components/Footer';

const btn = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
]


function App() {
  return (
    <CalcProvider>
      <div className="wrapper">
        <Screen />
        <Box>
          {btn.flat().map((btn, i) => (
            <Button value={btn} key={i}/>
          ))}
        </Box>
      </div>
      <Footer />
    </CalcProvider>
  );
}

export default App;
