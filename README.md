# SIAMosque - React Scroll Animation

A React application featuring an immersive scroll animation experience built with GSAP and Lenis smooth scrolling.

## Features

- **Smooth Scrolling**: Powered by Lenis for buttery smooth scroll experience
- **GSAP Animations**: Complex scroll-triggered animations using GSAP ScrollTrigger
- **Responsive Design**: Fully responsive layout that works on desktop and mobile
- **Icon Animations**: Dynamic icon animations that scale and move based on scroll progress
- **Text Reveals**: Staggered text animation reveals during scroll

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **GSAP** - Professional-grade animation library
- **Lenis** - Smooth scrolling library
- **CSS3** - Modern CSS with animations and responsive design

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory:
   ```bash
   cd SIAMosque
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

To build the project for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
SIAMosque/
├── public/
│   ├── icon_1.png       # Replace with actual icon images
│   ├── icon_2.png
│   ├── icon_3.png
│   ├── icon_4.png
│   └── icon_5.png
├── src/
│   ├── App.jsx          # Main application component with scroll animations
│   ├── App.css          # Styles for the scroll animation
│   ├── index.css        # Global styles
│   └── main.jsx         # React application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Customization

### Replace Placeholder Images

The project includes placeholder files for the icons. Replace these files in the `public/` directory with your actual images:

- `icon_1.png` through `icon_5.png`

### Customize Content

Edit the content in `src/App.jsx`:

- Change the hero header text
- Modify the animated text segments
- Update the outro section

### Styling

Modify the styles in `src/App.css` to customize:

- Colors and background
- Typography
- Spacing and layout
- Animation timings

## Animation Details

The scroll animation consists of several phases:

1. **Initial Phase (0-30%)**: Icons move up from the bottom while header fades out
2. **Scaling Phase (30-60%)**: Icons scale down and move to center, background color changes
3. **Movement Phase (60-75%)**: Icons move to text placeholder positions
4. **Text Reveal Phase (75-100%)**: Text segments appear in random order

## Browser Support

This project uses modern web technologies and requires:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Original animation concept and implementation inspiration
- GSAP team for the amazing animation library
- Lenis for smooth scrolling capabilities 