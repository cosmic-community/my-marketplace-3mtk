# My Marketplace
![App Preview](https://imgix.cosmicjs.com/0681d1a0-a3e7-11f1-b4d2-f7e5ca41f626-autopilot-photo-1544005313-94ddf0286df2-1788034806699.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern vacation rental marketplace built with Next.js 16 and Cosmic. Browse categories, search listings, filter by amenities and price, view rich listing details with photo galleries and host profiles, and read guest reviews.

## Features

- 🏠 Hero search homepage with category browsing row and featured listings
- 🔍 Listings index with category, property type, price, and amenity filters
- 🖼️ Listing detail pages with gallery, description, amenities, and instant book badge
- 👤 Host directory and individual host profile pages
- ⭐ Guest reviews with star ratings
- 📱 Responsive, mobile-first, rounded-card design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a933e97aa0cf85dfc29f260&clone_repository=6a93413baa0cf85dfc29f31f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create content models for an online marketplace with product listings, seller profiles, categories, and customer reviews.
>
> User instructions: Clone airbnb.com
>
> The user is rebuilding an existing website and provided these design notes: Clone airbnb.com. Factor these preferences into the content structure.

### Code Generation Prompt

> Build a Next.js application for an online business called "My Marketplace". The content is managed in Cosmic CMS with the following object types: categories, hosts, listings, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A vacation rental marketplace website called "My Marketplace". Homepage with a hero search area, category browsing row (from Categories), and a featured grid of Listings showing cover image, title, location, property type, and price per night. A listings index page with filtering by category, property type, price, and amenities. A listing detail page showing the image gallery, rich-text description, bedrooms/bathrooms/max guests, amenities list, instant book badge, the host profile card (avatar, bio, location, superhost badge, response rate, joined date), and guest reviews with star ratings. A hosts page and individual host profile pages listing their properties. Clean, modern, airy design with rounded cards, generous whitespace, and responsive mobile-first layout.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — App Router, Server Components
- [Cosmic](https://www.cosmicjs.com) — headless CMS for content
- TypeScript — strict typing throughout
- Tailwind CSS — utility-first styling

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with a bucket containing `categories`, `hosts`, `listings`, and `reviews` object types

### Installation

```bash
bun install
```

Set your environment variables (see Cosmic CMS Integration below), then run:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all listings with nested host and categories
const { objects: listings } = await cosmic.objects
  .find({ type: 'listings' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch reviews for a specific listing
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.listing': listingId })
  .depth(1)
```

## Cosmic CMS Integration

This app connects to your Cosmic bucket using the `categories`, `hosts`, `listings`, and `reviews` object types exactly as defined in your content model. Object metafields (host, categories, listing relationships) are resolved via the `depth` parameter so nested data is available without extra queries. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel
1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the environment variables below
4. Deploy

### Netlify
1. Push this repository to GitHub
2. Import the project in [Netlify](https://www.netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the environment variables below
5. Deploy

### Environment Variables

Set these in your hosting platform's dashboard:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```
<!-- README_END -->