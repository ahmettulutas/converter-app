export interface BMIResult {
  bmi: number;
  category: BMICategory;
  healthyBmiRange: string;
  healthyWeightRange: string;
  bmiPrime: number;
  ponderalIndex: number;
}

export type Gender = 'male' | 'female';
export type UnitSystem = 'metric' | 'us';
export type BMICategory = 'Thin' | 'Normal' | 'Overweight' | 'Obese';

export interface BMIResult {
  bmi: number;
  category: BMICategory;
  healthyBmiRange: string;
  healthyWeightRange: string;
  bmiPrime: number;
  ponderalIndex: number;
}
export function calculateBMI(
  height: number,
  weight: number,
  age: number,
  gender: Gender,
  unitSystem: UnitSystem
): BMIResult {
  let heightInM = height;
  let weightInKg = weight;

  if (unitSystem === 'us') {
    heightInM = height * 0.0254; // Convert inches to meters
    weightInKg = weight * 0.453592; // Convert pounds to kg
  } else if (unitSystem === 'metric') {
    heightInM = height / 100; // Convert cm to meters
  }

  // Calculate BMI
  const bmi = weightInKg / (heightInM * heightInM);

  // Determine BMI category with age and gender consideration
  let category: BMICategory;
  let minHealthyBmi: number;
  let maxHealthyBmi: number;

  if (age < 18) {
    // For children and adolescents
    if (bmi < 18.5) category = 'Thin';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    minHealthyBmi = 18.5;
    maxHealthyBmi = 25;
  } else if (age >= 65) {
    // For older adults
    if (bmi < 22) category = 'Thin';
    else if (bmi < 27) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    minHealthyBmi = 22;
    maxHealthyBmi = 27;
  } else {
    // Standard adult categories with gender differences
    if (gender === 'male') {
      if (bmi < 18.5) category = 'Thin';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      minHealthyBmi = 18.5;
      maxHealthyBmi = 25;
    } else {
      // female
      // Slightly different ranges for women
      if (bmi < 18.5) category = 'Thin';
      else if (bmi < 24) category = 'Normal';
      else if (bmi < 29) category = 'Overweight';
      else category = 'Obese';

      minHealthyBmi = 18.5;
      maxHealthyBmi = 24;
    }
  }

  // Calculate healthy weight range for height
  const minHealthyWeight = minHealthyBmi * (heightInM * heightInM);
  const maxHealthyWeight = maxHealthyBmi * (heightInM * heightInM);

  let healthyWeightRange = '';
  if (unitSystem === 'us') {
    // Convert back to pounds
    const minLbs = Math.round(minHealthyWeight * 2.20462);
    const maxLbs = Math.round(maxHealthyWeight * 2.20462);
    healthyWeightRange = `${minLbs} - ${maxLbs} lbs`;
  } else {
    healthyWeightRange = `${minHealthyWeight.toFixed(1)} - ${maxHealthyWeight.toFixed(1)} kg`;
  }

  // Calculate BMI Prime (ratio of actual BMI to upper limit of normal BMI)
  const bmiPrime = bmi / maxHealthyBmi;

  // Calculate Ponderal Index (kg/m³)
  const ponderalIndex = weightInKg / (heightInM * heightInM * heightInM);

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    healthyBmiRange: `${minHealthyBmi} - ${maxHealthyBmi} kg/m²`,
    healthyWeightRange,
    bmiPrime: parseFloat(bmiPrime.toFixed(1)),
    ponderalIndex: parseFloat(ponderalIndex.toFixed(1)),
  };
}
export const getCategoryColor = (category: BMICategory) => {
  switch (category) {
    case 'Thin':
      return '#3b82f6';
    case 'Normal':
      return '#22c55e';
    case 'Overweight':
      return '#f97316';
    case 'Obese':
      return '#ef4444';
    default:
      return '#333333';
  }
};
