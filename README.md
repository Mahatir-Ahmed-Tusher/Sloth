# 🦥 Sloth

**Sloth** is a no-code/low-code AI-powered platform that lets you build, edit, and deploy full-stack web applications just by describing your idea. With Sloth, you can turn your concepts into production-ready web apps in minutes—no coding required!

---

## 🚀 What is Sloth?

Sloth is an AI-driven web application builder. You simply describe your app idea, and Sloth generates the code, UI, and backend for you. It leverages state-of-the-art AI models to understand your requirements and create fully functional web applications, complete with authentication, database integration, and deployment options.

---

## ✨ Features

- **AI-Powered App Generation**: Describe your app idea in natural language, and Sloth generates the code and UI.
- **Ready-to-Use Templates**: Instantly create clones of popular apps (Netflix, YouTube, Kanban boards, etc.) with one click.
- **Live Chatbot**: Interact with an AI assistant to refine your app, ask questions, or get help.
- **Code Editing**: View and edit the generated code directly in the browser.
- **Workspace Management**: Organize your projects in workspaces, revisit, and continue editing anytime.
- **Authentication**: Secure login with Google OAuth.
- **User Profiles**: Manage your account and see your recent projects.
- **Subscription Plans**: Flexible pricing for hobbyists, professionals, and unlimited users.
- **Export & Download**: Download your generated code as a ZIP file.
- **FAQ, Help, and Terms Pages**: Built-in support and documentation.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router, React 18), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Backend**: [Convex](https://convex.dev/) (serverless database and functions)
- **AI Integration**: [Google Generative AI](https://ai.google.dev/), [Mistral AI](https://mistral.ai/), [OpenAI](https://openai.com/) (optional, for code/chat)
- **Authentication**: [Google OAuth](https://developers.google.com/identity)
- **State Management**: React Context API
- **Other Libraries**: Axios, Sandpack (for code previews), JSZip (for downloads)

---

## 🗄️ Database

- **Convex** is used as the primary database and backend function platform.
- All user data, workspaces, messages, and files are stored and managed via Convex.

---

## 🔌 APIs Used

- **Google Generative AI API**: For natural language understanding and code generation.
- **Mistral AI API**: For chat and code generation (optional, can be enabled via `.env`).
- **Convex API**: For database operations and serverless functions.
- **Google OAuth API**: For user authentication.

---

## 🔒 Authentication

- **Google OAuth 2.0** is used for secure user login.
- User details (name, email, profile picture) are fetched and stored in Convex.

---

## 📦 Cloning & Running Locally

### 1. **Clone the Repository**

```bash
git clone https://github.com/Mahatir-Ahmed-Tusher/Sloth.git
cd Sloth
```

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Set Up Environment Variables**

Create a `.env.local` file in the root directory. Here are the required variables and how to obtain them:

#### **Required Environment Variables**

| Variable Name                  | Description                                      | How to Get It                                                                 |
|--------------------------------|--------------------------------------------------|-------------------------------------------------------------------------------|
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID                           | [Google Cloud Console](https://console.cloud.google.com/apis/credentials)     |
| `CONVEX_DEPLOYMENT`            | Convex deployment URL                            | [Convex Console](https://dashboard.convex.dev/)                               |
| `CONVEX_API_KEY`               | Convex API key                                   | [Convex Console](https://dashboard.convex.dev/)                               |
| `GOOGLE_GENAI_API_KEY`         | Google Generative AI API Key                     | [Google AI Studio](https://makersuite.google.com/)                            |
| `MISTRAL_API_KEY`              | Mistral AI API Key (optional, for Mistral chat)  | [Mistral AI](https://console.mistral.ai/)                                     |
| `OPENAI_API_KEY`               | OpenAI API Key (optional, for OpenAI integration)| [OpenAI Platform](https://platform.openai.com/account/api-keys)               |

#### **Example `.env.local`**

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
CONVEX_DEPLOYMENT=your-convex-deployment-url
CONVEX_API_KEY=your-convex-api-key
GOOGLE_GENAI_API_KEY=your-google-genai-api-key
MISTRAL_API_KEY=your-mistral-api-key
OPENAI_API_KEY=your-openai-api-key
```

> **Note:** You only need to provide the API keys for the services you want to use. For basic functionality, Google OAuth, Convex, and Google GenAI are required.

### 4. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see Sloth in action.

---

## 🧑‍💻 Project Structure

```
Sloth/
├── convex/                # Convex backend functions and schema
├── public/                # Static assets (images, icons)
├── src/
│   ├── app/               # Next.js app directory (pages, API routes, components)
│   ├── components/        # UI components (Button, Dialog, etc.)
│   ├── data/              # Contexts, lookup tables, prompts
│   ├── lib/               # Utility functions
│   ├── configs/           # App configuration files
├── .env.local             # Your environment variables (not committed)
├── package.json           # Project dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
└── README.md              # This file
```

---

## 📝 How It Works

1. **User logs in** with Google.
2. **Describe your app idea** in the prompt box (e.g., "Build a Netflix clone").
3. **Sloth sends your prompt** to the AI model (Google GenAI, Mistral, or OpenAI).
4. **AI generates code** and UI, which is displayed in the browser.
5. **You can edit, chat, and refine** your app with the AI assistant.
6. **Download your code** or continue working in your workspace.

---

## 🧩 Subscription & Plans

- **Free**: Limited usage, ideal for trying out Sloth.
- **Pro**: More tokens, for professionals using Sloth regularly.
- **Unlimited**: Lifetime access, unlimited tokens.

---

## 📄 Pages & Navigation

- `/` - Home & Hero section
- `/workspace/[id]` - Your app workspace (chat + code)
- `/settings` - Choose AI model, manage preferences
- `/faq` - Frequently Asked Questions
- `/help` - Help & Getting Started
- `/services` - Subscription plans
- `/terms` - Terms of Service, Privacy Policy

---

## 🛡️ Security & Privacy

- All authentication is handled via Google OAuth.
- User data is stored securely in Convex.
- No passwords are stored or managed by Sloth.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🧑‍🔬 Troubleshooting

- **First code request may take a while** (backend cold start).
- Make sure all required API keys are set in `.env.local`.
- If you have issues with authentication, check your Google OAuth setup.

---

## 📢 Credits

- Built by [Mahatir Ahmed Tusher](https://github.com/Mahatir-Ahmed-Tusher)
- Powered by Next.js, Convex, Google GenAI, and Mistral AI

---

## 📜 License

This project is for educational and demonstration purposes.

---

**Clone, prompt, and build your next big idea with Sloth!**

---

**[GitHub Repository](https://github.com/Mahatir-Ahmed-Tusher/Sloth.git)**
