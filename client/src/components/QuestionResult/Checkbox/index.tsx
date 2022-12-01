import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AnswerTotal } from "types/result";
import randomRGBGenerator from "utils/randomRGBGenerator";

function Checkbox({ answerTotal }: { answerTotal: AnswerTotal }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { length } = Object.keys(answerTotal);
  const hasMoreThanOneValue = Object.values(answerTotal).filter((v) => v).length > 1;

  const colorSet = Array.from(
    {
      length,
    },
    () => randomRGBGenerator()
  );

  const data = {
    labels: Object.keys(answerTotal),
    datasets: [
      {
        data: Object.values(answerTotal),
        borderWidth: hasMoreThanOneValue ? 2 : 0,
        hoverBorderWidth: hasMoreThanOneValue ? 1 : 0,
        backgroundColor: colorSet.map(({ backgroundColor }) => backgroundColor),
        hoverBorderColor: colorSet.map(({ borderColor }) => borderColor),
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "start" as const,
      },
    },
  };

  return (
    <Doughnut
      data={data}
      options={options}
      redraw
      width={400}
      height={240}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    />
  );
}

export default Checkbox;
