"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Layout, Card, Input, Button, Tabs, Row, Col, Progress, Typography, Space, message } from "antd"
import {
  SendOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons"
import { motion, AnimatePresence } from "framer-motion"
import { analyzeSentiment } from "@/app/actions"
import { SentimentHistory } from "@/components/sentiment-history"
import { SentimentEmoji } from "@/components/sentiment-emoji"
import { LanguageSelector } from "@/components/language-selector"
import { TextSuggestions } from "@/components/text-suggestions"
import { ConfettiEffect } from "@/components/confetti-effect"
import { SentimentChart } from "@/components/sentiment-chart"
import { TextToSpeech } from "@/components/text-to-speech"

const { Header, Content } = Layout
const { Title, Text } = Typography
const { Search } = Input

export default function Home() {
  const [messageText, setMessageText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("1")
  const [language, setLanguage] = useState("en")
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [isClient, setIsClient] = useState(false)

  // Load history from localStorage on component mount
  useEffect(() => {
    setIsClient(true)
    const savedHistory = localStorage.getItem("sentimentHistory")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Error parsing saved history:", e)
      }
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("sentimentHistory", JSON.stringify(history))
    }
  }, [history, isClient])

  const handleSelectSuggestion = (text) => {
    setMessageText(text)
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  const handleSubmit = async () => {
    if (!messageText.trim()) return

    setIsAnalyzing(true)
    try {
      const sentimentResult = await analyzeSentiment(messageText, language)
      setResult(sentimentResult)

      // Add to history
      const newHistoryItem = {
        id: uuidv4(),
        text: messageText,
        sentiment: sentimentResult.sentiment,
        timestamp: new Date().toLocaleTimeString(),
        scores: sentimentResult.scores,
      }

      setHistory((prev) => [newHistoryItem, ...prev])

      // Show notification
      message.success(`Analysis complete: ${sentimentResult.sentiment}`)
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
      message.error("Failed to analyze sentiment. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleClearHistory = () => {
    setHistory([])
    message.info("History cleared")
  }

  const handleExportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `sentiment-history-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    message.success("History exported successfully")
  }

  const handleDeleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
    message.info("Entry deleted")
  }

  const tabItems = [
    {
      key: "1",
      label: "Analyze",
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Card title="Analyze Text Sentiment">
              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Search
                  placeholder="How are you feeling today?"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  enterButton={
                    <Button type="primary" icon={isAnalyzing ? <LoadingOutlined /> : <SendOutlined />}>
                      {isAnalyzing ? "Analyzing" : "Analyze"}
                    </Button>
                  }
                  onSearch={handleSubmit}
                  loading={isAnalyzing}
                />

                <TextSuggestions onSelectSuggestion={handleSelectSuggestion} language={language} />

                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 16,
                          marginBottom: 16,
                        }}
                      >
                        <SentimentEmoji sentiment={result.sentiment} size={80} />
                        <TextToSpeech text={messageText} sentiment={result.sentiment} />
                      </div>
                      <div style={{ textAlign: "center", marginBottom: 16 }}>
                        <Text
                          strong
                          style={{
                            fontSize: 20,
                            color:
                              result.sentiment === "positive"
                                ? "#52c41a"
                                : result.sentiment === "negative"
                                  ? "#f5222d"
                                  : result.sentiment === "mixed"
                                    ? "#faad14"
                                    : "#1890ff",
                          }}
                        >
                          {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                        </Text>
                      </div>

                      <div style={{ marginTop: 24 }}>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <Text>Positive</Text>
                            <Text>{Math.round(result.scores.positive * 100)}%</Text>
                          </div>
                          <Progress
                            percent={Math.round(result.scores.positive * 100)}
                            status="success"
                            showInfo={false}
                          />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <Text>Neutral</Text>
                            <Text>{Math.round(result.scores.neutral * 100)}%</Text>
                          </div>
                          <Progress
                            percent={Math.round(result.scores.neutral * 100)}
                            status="normal"
                            showInfo={false}
                          />
                        </div>

                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <Text>Negative</Text>
                            <Text>{Math.round(result.scores.negative * 100)}%</Text>
                          </div>
                          <Progress
                            percent={Math.round(result.scores.negative * 100)}
                            status="exception"
                            showInfo={false}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title="Recent History"
              extra={
                <Button
                  type="text"
                  icon={<InfoCircleOutlined />}
                  size="small"
                  title="History is stored locally in your browser"
                />
              }
            >
              <SentimentHistory
                history={history}
                onClearHistory={handleClearHistory}
                onExportHistory={handleExportHistory}
                onDeleteItem={handleDeleteHistoryItem}
              />
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Insights",
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <SentimentChart history={history} />
          </Col>
          <Col xs={24} md={12}>
            <Card title="Sentiment Summary">
              {history.length > 0 ? (
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card style={{ background: "#f0f7ff" }}>
                        <Text type="secondary">Total Analyses</Text>
                        <div style={{ fontSize: 28, fontWeight: "bold", color: "#1890ff" }}>{history.length}</div>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card style={{ background: "#f0f7ff" }}>
                        <Text type="secondary">Most Common</Text>
                        <div style={{ fontSize: 28, fontWeight: "bold", color: "#1890ff" }}>
                          {history.length > 0
                            ? (() => {
                              const sentiment = Object.entries(
                                history.reduce((acc, item) => {
                                  acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
                                  return acc;
                                }, {})
                              ).sort((a, b) => b[1] - a[1])[0][0];
                              return sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
                            })()
                            : "N/A"}
                        </div>
                      </Card>
                    </Col>
                  </Row>

                  <div>
                    <Text strong>Average Sentiment Scores</Text>
                    <div style={{ marginTop: 16 }}>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text>Positive</Text>
                          <Text>
                            {history.length > 0
                              ? Math.round(
                                (history.reduce((sum, item) => sum + item.scores.positive, 0) / history.length) * 100,
                              )
                              : 0}
                            %
                          </Text>
                        </div>
                        <Progress
                          percent={
                            history.length > 0
                              ? (history.reduce((sum, item) => sum + item.scores.positive, 0) / history.length) * 100
                              : 0
                          }
                          status="success"
                          showInfo={false}
                        />
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text>Neutral</Text>
                          <Text>
                            {history.length > 0
                              ? Math.round(
                                (history.reduce((sum, item) => sum + item.scores.neutral, 0) / history.length) * 100,
                              )
                              : 0}
                            %
                          </Text>
                        </div>
                        <Progress
                          percent={
                            history.length > 0
                              ? (history.reduce((sum, item) => sum + item.scores.neutral, 0) / history.length) * 100
                              : 0
                          }
                          status="normal"
                          showInfo={false}
                        />
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text>Negative</Text>
                          <Text>
                            {history.length > 0
                              ? Math.round(
                                (history.reduce((sum, item) => sum + item.scores.negative, 0) / history.length) * 100,
                              )
                              : 0}
                            %
                          </Text>
                        </div>
                        <Progress
                          percent={
                            history.length > 0
                              ? (history.reduce((sum, item) => sum + item.scores.negative, 0) / history.length) * 100
                              : 0
                          }
                          status="exception"
                          showInfo={false}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button type="primary" icon={<DownloadOutlined />} onClick={handleExportHistory} block>
                      Export as JSON
                    </Button>
                  </div>
                </Space>
              ) : (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <Text type="secondary">No sentiment analysis history yet.</Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      ),
    },
  ]

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ConfettiEffect sentiment={result?.sentiment || null} />
      <Header
        style={{
          background: "transparent",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        <LanguageSelector language={language} onLanguageChange={handleLanguageChange} />
      </Header>
      <Content style={{ padding: "0 24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          <Title level={1} style={{ color: "#1890ff" }}>
            🌟 FeelFusion: Sentiment Detector 🌟
          </Title>
        </motion.div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} centered size="large" />
      </Content>

      <footer
        style={{
          textAlign: "center",
          padding: "16px 0",
          background: "#f0f2f5",
          position: "relative",
          bottom: 0,
          width: "100%",
          marginTop: "15px",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        <Text type="secondary">
          Developed by{" "}
          <a href="https://fahimshariar.netlify.app" target="_blank" rel="noopener noreferrer">
            Fahim Shariar
          </a>
        </Text>
      </footer>
    </Layout>
  )
}
