"use client"

import { useState, useEffect } from "react"
import { Card, Tabs } from "antd"
import { Line, Pie } from "@ant-design/plots"

export function SentimentChart({ history }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  // Prepare data for trend chart (last 10 entries in chronological order)
  const trendData = [...history]
    .slice(0, 10)
    .reverse()
    .flatMap((item, index) => [
      {
        category: "Positive",
        value: item.scores.positive * 100,
        entry: `Entry ${index + 1}`,
      },
      {
        category: "Neutral",
        value: item.scores.neutral * 100,
        entry: `Entry ${index + 1}`,
      },
      {
        category: "Negative",
        value: item.scores.negative * 100,
        entry: `Entry ${index + 1}`,
      },
    ])

  // Prepare data for distribution chart
  const sentimentCounts = history.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1
    return acc
  }, {})

  const distributionData = Object.entries(sentimentCounts).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
  }))

  // Line chart config
  const lineConfig = {
    data: trendData,
    xField: "entry",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        formatter: (v) => `${v}%`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    color: ["#52c41a", "#1890ff", "#f5222d"],
  }

  // Pie chart config
  const pieConfig = {
    data: distributionData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name}: {percentage}",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    color: ({ type }) => {
      if (type === "Positive") return "#52c41a"
      if (type === "Negative") return "#f5222d"
      if (type === "Neutral") return "#1890ff"
      return "#faad14" // Mixed
    },
  }

  const items = [
    {
      key: "1",
      label: "Trends",
      children:
        history.length > 1 ? (
          <div style={{ height: 300 }}>
            <Line {...lineConfig} />
          </div>
        ) : (
          <div style={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
            Need at least 2 entries to show trends
          </div>
        ),
    },
    {
      key: "2",
      label: "Distribution",
      children:
        history.length > 0 ? (
          <div style={{ height: 300 }}>
            <Pie {...pieConfig} />
          </div>
        ) : (
          <div style={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
            No data to display
          </div>
        ),
    },
  ]

  return (
    <Card title="Sentiment Insights">
      <Tabs items={items} />
    </Card>
  )
}
