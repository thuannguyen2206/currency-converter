import React from "react";
import CountryBox from "./components/CountryBox";
import Amount from "./components/Amount";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      from: "USD",
      to: "VND",
      result: "Get Exchange Rate ...",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFromCurrency = this.handleFromCurrency.bind(this);
    this.handleToCurrency = this.handleToCurrency.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleSwapCurrency = this.handleSwapCurrency.bind(this);
  }

  // xử lý kết quả
  handleResult() {
    let { amount, from, to } = this.state;

    if (amount === null || amount === 0) {
      amount = 1;
    }

    let apiKey = "8878926664398eba900ff359";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let exchangeRate = data.conversion_rates[to];
        let totalExRate = amount * exchangeRate;

        this.setState({
          result: `${amount} ${from} = ${totalExRate} ${to}`,
        });
      })
      .catch(() => {
        this.setState({
          result: "Some thing went wrong.",
        });
      });
  }

  // khi component được render lần đầu
  componentDidMount() {
    this.handleResult();
  }

  // khi nhấn submit
  handleSubmit(e) {
    e.preventDefault();
    this.handleResult();
  }

  // khi from currency thay đổi
  handleFromCurrency(currency) {
    console.log("from: " + currency);
    this.setState({
      from: currency,
    });
  }

  // khi to currency thay đổi
  handleToCurrency(currency) {
    console.log("to: " + currency);
    this.setState({
      to: currency,
    });
  }

  // khi số tiền chuyển đổi thay đổi
  handleChangeAmount(amount) {
    this.setState({
      amount: amount,
    });
  }

  // khi swap currency
  handleSwapCurrency() {
    let temp = this.state.from;
    this.setState(
      {
        from: this.state.to,
        to: temp,
      },
      function(){
        this.handleResult();
      }
    );
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <h3 className="title">Currency Converter</h3>
          <form action="" onSubmit={this.handleSubmit}>
            <Amount changeAmount={this.handleChangeAmount}></Amount>
            <div className="drop-list">
              <div className="from">
                <span>From</span>
                <CountryBox
                  type="from"
                  currency={this.state.from}
                  changeCurrency={this.handleFromCurrency}
                ></CountryBox>
              </div>
              <div className="swap">
                <i
                  onClick={this.handleSwapCurrency}
                  className="fas fa-exchange-alt"
                ></i>
              </div>
              <div className="to">
                <span>To</span>
                <CountryBox
                  type="to"
                  currency={this.state.to}
                  changeCurrency={this.handleToCurrency}
                ></CountryBox>
              </div>
            </div>
            <div className="exchange-rate">{this.state.result}</div>
            <button onClick={this.handleSubmit}>Get Exchange Rate</button>
          </form>
        </div>
      </>
    );
  }
}

export default App;
