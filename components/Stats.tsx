"use client"

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react"

type StatsProps = {
  stats: string[]
}

const Stats = ({ stats }: StatsProps) => {
  const statsInNumbers = stats.map(i => +i)

  const scoresSum = statsInNumbers.reduce(
    (cum, cur) => cum + cur,
    0
  )

  return (
    <StatGroup className="my-5 mx-auto w-fit">
      <Stat className="mx-3 min-w-[60px]">
        <StatLabel className="text-primary-blue">
          أعلي درجة
        </StatLabel>
        <StatNumber>
          {Math.max(...statsInNumbers)}
        </StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />✌
        </StatHelpText>
      </Stat>

      <Stat className="mx-3 min-w-[60px]">
        <StatLabel className="text-red-500">
          اقل درجة
        </StatLabel>
        <StatNumber>
          {Math.min(...statsInNumbers)}
        </StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          🤦‍♂️
        </StatHelpText>
      </Stat>

      <Stat className="mx-3 min-w-[60px]">
        <StatLabel className="text-indigo-700">
          المعدل
        </StatLabel>
        <StatNumber>
          {scoresSum / statsInNumbers.length}
        </StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />✨
        </StatHelpText>
      </Stat>
    </StatGroup>
  )
}
export default Stats
