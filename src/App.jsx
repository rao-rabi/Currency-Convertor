import { useState } from "react";
import InputBox from "./components";
import bgImage from "./assets/GettyImages-1153657433_2600-573e917e27f9442eb87ac10f45ce43ea.jpg";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(Math.floor(amount * currencyInfo[to]));
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border rounded-lg p-5 backdrop-blur-sm bg-white/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency)=> setFrom(currency)} 
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="w-full relative h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white bg-blue-600 px-2 py-0.5 text-white rounded-md"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox 
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency)=> setTo(currency)} 
              selectCurrency={to}
              amountDisable />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
