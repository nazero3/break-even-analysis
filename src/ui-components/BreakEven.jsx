import React, { Component } from "react";
import styles from './BreakEven.module.css';
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

  render() {
    const { fixedCosts, variableCostPerUnit, sellingPricePerUnit, breakEvenUnits, breakEvenDollars } = this.state;

    return (
      <div>
        <h2>Break-Even Calculator</h2>
        <label>
          Fixed Costs:
          <input className={styles.container} type="number" name="fixedCosts" value={fixedCosts} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Variable Cost Per Unit:
          <input className="input" type="number" name="variableCostPerUnit" value={variableCostPerUnit} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Selling Price Per Unit:
          <input  className="input" type="number" name="sellingPricePerUnit" value={sellingPricePerUnit} onChange={this.handleChange} />
        </label>
        <br />
        <button className="button" onClick={this.calculateBreakEven}>Calculate Break-Even</button>
        <div>
          <p>Break-Even Point (Units): {breakEvenUnits}</p>
          <p>Break-Even Point (Dollars): ${breakEvenDollars}</p>
        </div>
      </div>
    );
  }
}

export default BreakEvenCalculator;