# FeelFusion: Sentiment Analysis Application

FeelFusion is a modern web application built with Next.js and Ant Design that analyzes the sentiment of text using Azure Text Analytics API. The application provides real-time sentiment analysis, visualization, and history tracking.

## Features

- **Real-time Sentiment Analysis**: Analyze text sentiment with Azure Text Analytics API
- **Multi-language Support**: Support for English, Bangla, Hindi, Urdu, and Arabic
- **Sentiment Visualization**: View sentiment scores with progress bars and charts
- **History Tracking**: Keep track of previous analyses with local storage
- **Data Visualization**: View sentiment trends and distribution with interactive charts
- **Text-to-Speech**: Listen to your text with sentiment-adjusted voice
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices
- **Confetti Effect**: Celebration animation for positive sentiments

## Prerequisites

Before you begin, ensure you have:

1. Node.js 16.x or later installed
2. An Azure account with Text Analytics API set up
3. API Key and Endpoint URL from Azure Text Analytics

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/feelfusion.git
cd feelfusion
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
TEXT_API_KEY = your_azure_text_api_key
TEXT_ENDPOINT = your_azure_text_endpoint
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
feelfusion/
├── app/
│ ├── actions.js # Server actions for sentiment analysis
│ ├── env.js # Environment variable handling
│ ├── globals.css # Global styles
│ ├── layout.js # Root layout component
│ └── page.js # Main page component
├── components/
│ ├── confetti-effect.js # Confetti animation for positive sentiment
│ ├── language-selector.js # Language selection component
│ ├── sentiment-chart.js # Charts for sentiment visualization
│ ├── sentiment-emoji.js # Emoji display based on sentiment
│ ├── sentiment-history.js # History tracking component
│ ├── text-suggestions.js # Example text suggestions
│ ├── text-to-speech.js # Text-to-speech functionality
│ ├── theme-provider.js # Theme context provider
│ └── theme-toggle.js # Theme toggle button
├── public/
│ └── ... # Static assets
├── .env.local # Environment variables (not in repo)
├── next.config.js # Next.js configuration
├── package.json # Project dependencies
└── README.md # Project documentation
```

## How It Works

1. The user enters text in the input field and selects a language
2. The application sends the text to Azure Text Analytics API via a server action
3. The API returns sentiment scores (positive, neutral, negative) and an overall sentiment
4. The application displays the results with visual indicators and stores them in history
5. The user can view insights, export history, and use text-to-speech functionality

## Customization

### Adding More Languages

To add more languages, update the `languages` array in `components/language-selector.js` and add corresponding suggestions in `components/text-suggestions.js`.

### Changing Theme Colors

The application uses Ant Design's theme system. You can customize colors by modifying the theme provider in `components/theme-provider.js`.

## Deployment

### Deploy to Vercel

The easiest way to deploy the application is with Vercel:

```bash
npm install -g vercel
vercel
```

Don't forget to add your environment variables in the Vercel dashboard.

### Other Deployment Options

You can also deploy to other platforms like Netlify, AWS Amplify, or traditional hosting by building the application:

```bash
npm run build
npm start
```

## Troubleshooting

### API Connection Issues

If you encounter issues connecting to the Azure Text Analytics API:

1. Verify your API key and endpoint URL
2. Check if your Azure subscription is active
3. Ensure your IP is not blocked by Azure

### Browser Compatibility

The application works best in modern browsers. For text-to-speech functionality, Chrome or Edge is recommended.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Ant Design](https://ant.design/) - UI component library
- [Azure Text Analytics](https://azure.microsoft.com/services/cognitive-services/text-analytics/) - Sentiment analysis API
- [Framer Motion](https://www.framer.com/motion/) - Animation library
