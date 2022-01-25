import React, {memo} from "react";
import { countries } from "../data/countries";

class CountryBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
  }

  // gửi currency lên cho component cha khi thay đổi
  handleChangeCurrency(e) {
    let currency = e.target.value;
    this.props.changeCurrency(currency);
  }

  // lấy quốc kỳ
  getFlagUrl() {
    let currency = this.props.currency;
    let url = `https://flagcdn.com/48x36/${countries[
      currency
    ].toLowerCase()}.png`;
    return url;
  }

  // load danh sách quốc gia
  LoadCountryHandler() {
    let options = Object.keys(countries).map((country) => (
      <option key={country} value={country}>
        {country}
      </option>
    ));
    return options;
  }

  render() {
    return (
      <div className="select-box">
        <img src={this.getFlagUrl()} alt="flag"></img>
        <select
          value={this.props.currency}
          onChange={this.handleChangeCurrency}
        >
          {this.LoadCountryHandler()}
        </select>
      </div>
    );
  }
}

// dùng memo để ngăn re-render không cần thiết
export default memo(CountryBox);
