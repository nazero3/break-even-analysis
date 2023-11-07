import React, { Component } from "react";
import  './BreakEven.css';
class BreakEvenCalculator extends Component {
  constructor() {
    super();
    this.state = {
      fixedCosts: 0,
      variableCostPerUnit: 0,
      sellingPricePerUnit: 0,
      breakEvenUnits: 0,
      breakEvenDollars: 0,
    };
  }

  calculateBreakEven = () => {
    const { fixedCosts, variableCostPerUnit, sellingPricePerUnit } = this.state;

    // Calculate contribution margin per unit
    const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit;

    // Calculate break-even point in units
    const breakEvenUnits = fixedCosts / contributionMarginPerUnit;

    // Calculate break-even point in dollars
    const breakEvenDollars = breakEvenUnits * sellingPricePerUnit;

    this.setState({ breakEvenUnits, breakEvenDollars });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: parseFloat(value) || 0 });
  };
// vc: 10 sp: 20 fc: 100
  render() {
    const { fixedCosts, variableCostPerUnit, sellingPricePerUnit, breakEvenUnits, breakEvenDollars } = this.state;
    fetch("http://localhost:4000/calculateBreakEven", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fixedCosts,
          variableCostPerUnit,
          sellingPricePerUnit,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            breakEvenUnits: data.breakEvenUnits,
            breakEvenDollars: data.breakEvenDollars,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    return (
      <div className="container">
        <h2>Break-Even Calculator</h2>
        <label >
          Fixed Costs:
          <input  type="number" name="fixedCosts" value={Number(fixedCosts).toString()} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Variable Cost Per Unit:
          <input className="input" type="number" name="variableCostPerUnit" value={Number(variableCostPerUnit).toString()} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Selling Price Per Unit:
          <input   type="number" name="sellingPricePerUnit" value={Number(sellingPricePerUnit).toString()} onChange={this.handleChange} />
        </label>
        <br />
        <button  onClick={this.calculateBreakEven}>Calculate Break-Even</button>
        <div>
          <p>Break-Even Point (Units): {breakEvenUnits}</p>
          <p>Break-Even Point (Dollars): ${breakEvenDollars}</p>
        </div>
      </div>
    );
  }
}

export default BreakEvenCalculator;