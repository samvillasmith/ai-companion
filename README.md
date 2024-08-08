# AI Companion Platform

Welcome to the AI Companion Platform, a cutting-edge application that brings personalized AI interactions to life. This full-stack project showcases the seamless integration of modern web technologies with advanced AI capabilities.

## Project Overview

The AI Companion Platform is a React-based web application that offers users the ability to interact with 11 specialized chatbots and even create custom AI companions. Built with a focus on user engagement and personalization, this project demonstrates proficiency in full-stack development, AI integration, and creating captivating conversational experiences.

🔗 [Live Demo](https://ai-companion-one.vercel.app/)

## Features

- 11 pre-configured AI chatbots for diverse interactions
- Custom AI companion creation
- User authentication system
- Premium features with Stripe integration
- Responsive design for seamless use across devices

## Tech Stack

- **Frontend**: React, TypeScript, Next.js, Tailwind CSS
- **Backend**: Node.js, MySQL, Prisma ORM
- **AI Integration**: OpenAI
- **Authentication**: [Authentication method, e.g., JWT, Auth0]
- **Payment Processing**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MySQL database
- OpenAI API key
- Stripe account for payment processing

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ai-companion-platform.git
   cd ai-companion-platform
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   DATABASE_URL=your_mysql_connection_string
   OPENAI_API_KEY=your_openai_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

5. Start the development server:
   ```
   npm run dev
   ```

Visit `http://localhost:3000` to see the application running.

## Project Structure

```
ai-companion-platform/
├── components/
├── pages/
├── lib/
├── prisma/
├── public/
├── styles/
├── types/
├── utils/
├── .env.local
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## API Routes

- `/api/companions`: CRUD operations for AI companions
- `/api/chat`: Endpoint for AI chat interactions
- `/api/user`: User management and authentication
- `/api/stripe`: Stripe integration for premium features

## Contributing

We welcome contributions to the AI Companion Platform! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- OpenAI for providing the AI capabilities
- Vercel for hosting and deployment
- All contributors and supporters of this project
