# Murad Bayramov: Developer Portfolio 🚀

A personal portfolio website with a built-in admin panel, showcasing my projects and journey as an **AI-assisted full-stack product builder**.

> 🚧 **Work in progress.** The site is in Azerbaijani and is still being completed.

## 👨‍💻 About Me

I'm a product builder based in Azerbaijan. I design and ship end-to-end applications, from idea and UI/UX to deployment, using AI-assisted development to move fast. My focus is building practical products that solve real problems.

## ✨ Features

- 🗂️ Project showcase with tags, links, and display order
- 🛠️ Admin panel to manage site content, projects, and contact links without touching code
- 👁️ Show or hide projects with a status switch
- 🔐 Protected admin login (hashed passwords, signed sessions)
- 📱 Responsive design

## 🚀 Featured Projects

| Project | Description | Links |
|---------|-------------|-------|
| **BayWise** | AI-powered personal finance tracker (web). Mobile app in development. | [Live](https://bay-wise.netlify.app/) |
| **Robot Lab** | Educational web project built by a junior student under my mentorship. | [Live](https://robo-lab.netlify.app/) · [Code](https://github.com/muradbayramovdev/Robot_lab) |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15, React 19 |
| Language | TypeScript |
| Database | MySQL + Prisma ORM |
| Styling | Tailwind CSS 4 |
| Validation | Zod |
| Auth | bcryptjs + jose |

## 🧰 Getting Started

### Prerequisites

- Node.js 20+
- MySQL 8+

### Setup

**1. Clone and install:**

```bash
git clone https://github.com/muradbayramovdev/portfolio.git
cd portfolio
npm install
```

**2. Create the environment file:**

```bash
cp .env.example .env
```

Edit `.env` and set your own values:

```env
DATABASE_URL="mysql://user:password@127.0.0.1:3306/murad_portfolio"
ADMIN_SESSION_SECRET="replace-with-a-long-random-secret"
```

Create an empty database named `murad_portfolio` in MySQL first.

**3. Set up the database:**

```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

**4. Create an admin account:**

```bash
npm run admin:create
```

**5. Start the development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run prisma:migrate` | Run database migrations (development) |
| `npm run prisma:deploy` | Apply migrations (production) |
| `npm run db:seed` | Seed initial site content |
| `npm run admin:create` | Create an admin user |

## 🤖 Development Approach

This portfolio was conceived, designed, and directed by **Murad Bayramov**, including the content, structure, UI/UX decisions, testing, and review. The implementation was developed with AI-assisted tools under the author's direction.

## 📬 Contact

- 💼 LinkedIn: [muradbayramov251](https://www.linkedin.com/in/muradbayramov251/)
- ✉️ Email: [muradbayramov251@gmail.com](mailto:muradbayramov251@gmail.com)
- 🐙 GitHub: [muradbayramovdev](https://github.com/muradbayramovdev)

## 📄 License & Ownership

Copyright © 2026 Murad Bayramov. All rights reserved.

This source code is provided for viewing and portfolio evaluation purposes only. No permission is granted to copy, modify, distribute, or use it commercially or as a personal template without written permission from the author.

---

Built with ❤️ by **Murad Bayramov**