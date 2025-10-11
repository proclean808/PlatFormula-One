# PlatFormula.One

**B2B SaaS AI Startup Accelerator Program** - Everything you Need to Succeed

A comprehensive accelerator platform designed for AI SaaS founders, providing mentorship, resources, and tools to scale from concept to enterprise.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v20.19.5 or later (LTS recommended)
- **npm**: v10.0.0 or later
- **Supabase Account**: [Sign up here](https://supabase.com)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/proclean808/PlatFormula-One.git
cd PlatFormula-One
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file and update with your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

To get these values:
- Go to [Supabase Dashboard](https://supabase.com/dashboard)
- Select your project
- Navigate to Settings → API
- Copy the Project URL and anon/public key

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Clean build artifacts and node_modules

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Database**: [Supabase](https://supabase.com/)
- **Authentication**: Supabase Auth
- **Analytics**: Vercel Analytics
- **Fonts**: [Geist](https://vercel.com/font)

## 📁 Project Structure

```
PlatFormula-One/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   └── application/      # Application-specific components
├── lib/                   # Utility functions and configurations
│   ├── supabase/         # Supabase client and server utilities
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── styles/               # Global styles
└── hooks/                # Custom React hooks
```

## 🔧 Configuration

### Node.js Version

This project uses Node.js v20.19.5. The version is specified in `.nvmrc` file.

If you use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use
```

### Environment Variables

Required environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | ✅ Yes |

### TypeScript

TypeScript is configured with strict mode enabled. Configuration is in `tsconfig.json`.

### ESLint

ESLint is configured with Next.js recommended rules. Configuration is in `.eslintrc.json`.

## 🐛 Troubleshooting

### Build Errors

**Issue**: Build fails with TypeScript errors

```bash
npm run type-check
```

This will show all TypeScript errors without creating a build.

**Issue**: Build fails with ESLint errors

```bash
npm run lint
```

Fix linting issues or add exceptions if necessary.

### Development Server Issues

**Issue**: Port 3000 is already in use

```bash
# Use a different port
PORT=3001 npm run dev
```

**Issue**: Module not found errors

```bash
# Clean install
npm run clean
npm install
```

### Supabase Connection Issues

**Issue**: Cannot connect to Supabase

1. Verify your `.env.local` file has correct values
2. Check that your Supabase project is active
3. Ensure you're using the correct API keys (anon key, not service role key for client)

**Issue**: Authentication not working

1. Enable Email authentication in Supabase Dashboard → Authentication → Providers
2. Configure email templates
3. Set up redirect URLs in Supabase settings

### Memory Issues

**Issue**: Build runs out of memory

```bash
# Increase Node.js memory limit
NODE_OPTIONS='--max-old-space-size=4096' npm run build
```

## 🧪 Testing

The project is configured for TypeScript type checking:

```bash
npm run type-check
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
