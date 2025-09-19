<br/>
<div align="center">
  <a href="https://www.devasign.com" style="display: block; margin: 0 auto;">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./public/devasign-white.png">
      <source media="(prefers-color-scheme: light)" srcset="./public/devasign-black.png">
      <img alt="DevAsign Logo" src="./public/devasign-white.png" height="120" style="display: block; margin: 0 auto;">
    </picture>
  </a>
<br/>

<br/>

</div>

<br/>

**DevAsign Maintainer App** - The project maintainer application for managing open-source bounties, AI-powered pull request reviews, and contributor payments through the Stellar blockchain.

## 🚀 What This App Does

The DevAsign Maintainer App is the frontend interface for project maintainers to:

- **Create & Manage Bounties**: Set up bounties on GitHub issues
- **Monitor AI Reviews**: Oversee AI-powered pull request analysis and merge decisions
- **Track Contributors**: View contributor activity, reputation scores, and payment history
- **Manage Payments**: Process bounty payments through the Stellar blockchain network
- **Configure Workflows**: Set up project-specific rules and automated approval thresholds
- **Team Collaboration**: Manage team members and project settings

## ✨ Key Features

### 🎯 Bounty Management
- **Task Creation**: Create bounty tasks with timeline and reward amounts
- **Label Integration**: Automatically sync with GitHub issue labels for seamless workflow
- **Progress Tracking**: Monitor task status from creation to completion and payment

### 🤖 AI Review Dashboard
- **Pull Request Monitoring**: Real-time view of AI analysis on incoming pull requests
- **Quality Metrics**: Code quality scores, security assessments, and impact evaluations
- **Manual Override**: Ability to override AI decisions when needed
- **Review History**: Complete audit trail of all AI decisions and manual interventions

### 💰 Payment Management
- **Stellar Integration**: Direct blockchain payment processing with transparent transactions
- **Payment History**: Complete transaction records with blockchain verification
- **Automated Payouts**: Set up automatic payments upon pull request merge

### 👥 Team & Project Management
- **GitHub Integration**: Seamless connection with GitHub repositories and organizations
- **Team Permissions**: Role-based access control for team members
- **Project Settings**: Configure AI thresholds, payment rules, and workflow preferences
- **Analytics Dashboard**: Insights into project activity, contributor performance, and payment metrics

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **HTTP Client**: Axios
- **Forms**: Formik with Yup validation
- **UI Components**: Custom components with React Icons

## 📋 Prerequisites

### Required Software
- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
- **Git** (latest version)

### Required Accounts & Services
- **DevAsign API Server** - Backend server must be running (see [server setup](https://github.com/devasignhq/devasign-api/))
- **Firebase Project** - for authentication services

## 🛠️ Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/devasignhq/app.devasign.com.git
cd app.devasign.com
```

### Step 2: Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Environment Configuration
1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Configure your `.env.local` file with the following variables:
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="Q-SFQEFEEWEE"

# API Configuration
NEXT_PUBLIC_API_BASE_URL="api-url"

# App Configuration
NEXT_PUBLIC_NODE_ENV="development"
```

### Step 4: Start the Development Server
```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:3000
```

## 🚀 Running the Application

### Development Mode
```bash
# Start with Turbopack (faster builds)
npm run dev
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and choose GitHub as your preferred sign-in method
3. Get your Firebase configuration from Project Settings
4. Add the configuration values to your `.env.local` file

### API Server Connection
1. Ensure the DevAsign API server is running (see [server setup](https://github.com/devasignhq/devasign-api/))
2. Update `NEXT_PUBLIC_API_BASE_URL` in your `.env.local` to point to your API server
3. Verify the connection by checking the health endpoint at `/health`


<!-- ## 🚀 Deployment -->

<!-- ## 🤝 Contributing -->

## 📄 License

DevAsign is open-source software licensed under the Apache 2.0 License. See [LICENSE](https://github.com/devasignhq/app.devasign.com/blob/main/LICENSE) for more details.

## 🔗 Related Projects

- [DevAsign API Server](https://github.com/devasignhq/devasign-api) - Backend API and AI engine
- [DevAsign Contributor App](https://github.com/devasignhq/contributor.devasign.com) - Frontend for contributors
- [Soroban Task Escrow Contract](https://github.com/devasignhq/soroban-contract) - Task Escrow Management

<!-- ## 💬 Community -->
