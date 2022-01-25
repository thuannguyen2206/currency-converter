import React, {memo} from "react";

class Amount extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
  }

  // thay đổi state khi amount changed
  handleChangeAmount(e) {
    let amount = e.target.value;
    this.props.changeAmount(amount);
  }

  render() {
    return (
      <div className="input-amount">
        <span>Enter amount</span>
        <input
          type="number"
          id="amount"
          onChange={this.handleChangeAmount}
          defaultValue={1}
        ></input>
      </div>
    );
  }
}

// dùng memo để ngăn re-render không cần thiết
export default memo(Amount);
