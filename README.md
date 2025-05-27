# 🏔️ Setrekk Adventures

A modern, responsive web application for adventure trekking experiences in India. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Adventure Booking Platform**: Browse and book exciting trekking expeditions
- **User Authentication**: Secure login/register system with NextAuth.js
- **Dynamic Content Management**: Rich text editor for blogs and trip descriptions
- **Responsive Design**: Mobile-first design with smooth animations
- **Modern UI/UX**: Beautiful interface with framer-motion animations
- **Admin Dashboard**: Manage trips, blogs, and user content
- **Image Gallery**: Showcase stunning trek photography
- **MongoDB Integration**: Robust data storage and retrieval

## 🚀 Tech Stack

- **Framework**: Next.js 15.1.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js v4
- **Animations**: Framer Motion
- **Rich Text Editor**: TipTap / React Quill
- **Icons**: React Icons
- **Deployment**: Vercel (optimized)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/setrekk-adventures.git
   cd setrekk-adventures
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── trips/             # Trip pages
│   ├── blog/              # Blog pages
│   └── ...
├── components/            # Reusable UI components
│   ├── NavBar/           # Navigation components
│   ├── Footer/           # Footer components
│   ├── Gallery/          # Image gallery
│   └── ...
├── lib/                  # Utility functions
├── models/               # MongoDB models
├── types/                # TypeScript type definitions
└── contexts/             # React contexts
```

## 🎨 Key Components

- **Hero Section**: Stunning parallax mountain background with call-to-action
- **Trip Cards**: Interactive cards showcasing trekking expeditions
- **Testimonials**: Customer reviews with ratings and verification
- **Rich Text Editor**: Full-featured editor for content creation
- **Image Gallery**: Responsive photo galleries with lightbox
- **Navigation**: Mobile-responsive navigation with theme toggle

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint rules

## 🌟 Features in Detail

### Authentication System
- Secure user registration and login
- Session management with NextAuth.js
- Protected routes and API endpoints

### Content Management
- Dynamic trip creation and editing
- Blog system with rich text formatting
- Image upload and gallery management

### User Experience
- Smooth page transitions
- Loading states and skeletons
- Toast notifications
- Progressive Web App features

### Performance
- Optimized images with Next.js Image component
- Static generation for better performance
- Code splitting and lazy loading

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy with zero configuration

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Setrekk Adventures**
- Website: [Your Website URL]
- Email: [Your Contact Email]
- Instagram: [@setrekk_adventures]

## 🙏 Acknowledgments

- Mountain photography from [Unsplash](https://unsplash.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI inspiration from modern adventure travel websites

---

**Built with ❤️ for adventure enthusiasts** 🏔️
