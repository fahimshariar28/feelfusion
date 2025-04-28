"use client"

import { useState, useEffect } from "react"
import { List, Button, Empty, Space, Typography, Divider } from "antd"
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons"
import { motion, AnimatePresence } from "framer-motion"
import { SentimentEmoji } from "./sentiment-emoji"

const { Text } = Typography

export function SentimentHistory({ history, onClearHistory, onExportHistory, onDeleteItem }) {
  const [isClient, setIsClient] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  if (history.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No sentiment analysis history yet." />
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Text type="secondary">
          {history.length} {history.length === 1 ? "entry" : "entries"}
        </Text>
        <Space>
          <Button icon={<DownloadOutlined />} size="small" onClick={onExportHistory}>
            Export
          </Button>
          <Button icon={<DeleteOutlined />} size="small" danger onClick={onClearHistory}>
            Clear
          </Button>
        </Space>
      </div>

      <Divider style={{ margin: "12px 0" }} />

      <div style={{ maxHeight: 400, overflowY: "auto", paddingRight: 8 }}>
        <AnimatePresence>
          <List
            itemLayout="horizontal"
            dataSource={history}
            renderItem={(item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <List.Item
                  style={{
                    padding: "12px",
                    marginBottom: "8px",
                    background: "white",
                    borderRadius: "8px",
                    position: "relative",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <List.Item.Meta
                    avatar={<SentimentEmoji sentiment={item.sentiment} size={36} />}
                    title={<Text ellipsis>{item.text}</Text>}
                    description={
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text
                          type={
                            item.sentiment === "positive"
                              ? "success"
                              : item.sentiment === "negative"
                                ? "danger"
                                : item.sentiment === "mixed"
                                  ? "warning"
                                  : "secondary"
                          }
                        >
                          {item.sentiment}
                        </Text>
                        <Text type="secondary">{item.timestamp}</Text>
                      </div>
                    }
                  />

                  {hoveredItem === item.id && (
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => onDeleteItem(item.id)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        opacity: 0.7,
                      }}
                    />
                  )}
                </List.Item>
              </motion.div>
            )}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
