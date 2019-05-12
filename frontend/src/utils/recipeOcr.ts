const linesToIngredients = (lines: string[]) => {
  lines = lines.filter(x => x)
  lines = lines.map(x => x.trim())
  return lines.map(lineToIngredient)
}

const lineToIngredient = (line: string) => {
  const patterns = [
    /^(?<amount>[ \d½⅓⅔-]*)+or[\d ]*[ ]{0,1}(?<measurement>[\w]{0,15}) (?<ingredient>.*)/i,
    /^(?<amount>[ \d½⅓⅔-]*)+-[\d ]*[ ]{0,1}(?<measurement>[\w]{0,15}) (?<ingredient>.*)/i,
    /^(?<amount>[ \d½⅓⅔-]*)+[ ]{0,1}(?<measurement>[\w]{0,15}) (?<ingredient>.*)/i
  ]

  for (let i=0; i<patterns.length; i++) {
    let res = line.match(patterns[i])
    if (!res) continue;

    let ingredient = res.groups || {}
    let amount = translateSpecialAmountCharsToNumbers(ingredient.amount)

    return {
      amount,
      measurement: sanitizeMeasurement(ingredient.measurement),
      ingredient: ingredient.ingredient.trim(),
    }
  }
  return {}
}

const sanitizeMeasurement = (measurement: string) => {
  measurement = measurement.trim().toLowerCase()
  switch (measurement) {
    case "tablespoon": return "tbs"
    case "tablespoons": return "tbs"
    case "teaspoon": return "tbsp"
    case "teaspoons": return "tbsp"
    case "ounce": return "oz"
    case "ounces": return "oz"
    case "cups": return "cup"
    default: return measurement
  }
}

const translateSpecialAmountCharsToNumbers = (amount: string): number => {
  amount = amount.split(" ").join("")
  amount = amount.split("½").join(".5")
  amount = amount.split("⅓").join(".3")
  amount = amount.split("⅔").join(".6")
  amount = amount.split("¼").join(".25")
  if (amount.indexOf(".") === 0) {
    amount = `0${amount}`
  }
  return Number(amount);
}

export {
  linesToIngredients,
}
