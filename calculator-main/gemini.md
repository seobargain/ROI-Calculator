
# Gemini Slide Generation Style Guide

This document outlines the preferred style and format for generating presentation slides in HTML. All future slides should adhere to these guidelines to maintain a consistent and professional appearance.

## 1. Color Palette

- **Primary Background (`--primary-bg`):** `#f0f2f5` (A light, neutral grey)
- **Slide Background (`--slide-bg`):** `#ffffff` (Clean white)
- **Header & Strong Text (`--header-color`):** `#0d2a4d` (A deep, professional blue)
- **Main Text (`--text-color`):** `#333333` (Standard dark grey for readability)
- **Accent Color (`--accent-color`):** `#ff6700` (A vibrant orange for highlights, borders, and bullets)
- **Shadow (`--shadow-color`):** `rgba(0, 0, 0, 0.1)` (A subtle black for depth)

## 2. Typography

- **Font Family:** 'Lato', sans-serif (from Google Fonts).
- **Main Title (`<h1>`):** 2.8em, bold (700 weight), centered, with a bottom border.
- **Section Headers (`<h2>`):** 1.6em, preceded by a small square (■) in the accent color.
- **Body Text (`<p>`, `<li>`):** 1.1em, with a line height of 1.7 for excellent readability.
- **Lists (`<ul>`):** Use a custom accent-colored disc (•) for bullet points.

## 3. Layout & Structure

- **Container:** The main slide content should be in a single `<div>` with the class `slide`.
- **Dimensions:** The slide should be centered on the page, with a max-width of `1100px`.
- **Appearance:** The slide has a white background, `15px` rounded corners, and a subtle `box-shadow`.
- **Accent Border:** A prominent `8px` solid border in the accent color should appear at the top of the slide.
- **Animation:** A simple, elegant fade-in and move-up animation on page load.

## 4. Master HTML Template

Use the following self-contained HTML structure as the template for all new slides.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vantage Circle Overview</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

        :root {
            --primary-bg: #f0f2f5;
            --slide-bg: #ffffff;
            --header-color: #0d2a4d;
            --text-color: #333333;
            --accent-color: #ff6700;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: 'Lato', sans-serif;
            background-color: var(--primary-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            color: var(--text-color);
        }

        .slide {
            background-color: var(--slide-bg);
            width: 90%;
            max-width: 1100px;
            height: auto;
            padding: 50px 60px;
            border-radius: 15px;
            box-shadow: 0 10px 30px var(--shadow-color);
            border-top: 8px solid var(--accent-color);
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        h1 {
            font-size: 2.8em;
            font-weight: 700;
            color: var(--header-color);
            margin-top: 0;
            margin-bottom: 30px;
            text-align: center;
            border-bottom: 2px solid var(--primary-bg);
            padding-bottom: 20px;
        }

        h2 {
            font-size: 1.6em;
            color: var(--header-color);
            margin-top: 30px;
            margin-bottom: 15px;
        }
        
        h2::before {
            content: '■';
            color: var(--accent-color);
            margin-right: 10px;
            font-size: 0.8em;
        }

        ul {
            list-style: none;
            padding-left: 25px;
        }

        li {
            font-size: 1.1em;
            line-height: 1.7;
            margin-bottom: 12px;
        }
        
        li::before {
            content: '•';
            color: var(--accent-color);
            font-weight: bold;
            display: inline-block; 
            width: 1em;
            margin-left: -1em;
        }

        strong {
            font-weight: 700;
            color: var(--header-color);
        }
    </style>
</head>
<body>

    <div class="slide">
        <!-- Slide Content Goes Here -->
        <h1>Slide Title</h1>
        <h2>Section Header</h2>
        <p>This is a paragraph of text.</p>
        <ul>
            <li>List item one.</li>
            <li>List item two.</li>
        </ul>
    </div>

    <script>
        // Optional: for future interactivity
        window.addEventListener('DOMContentLoaded', (event) => {
            document.querySelector('.slide').style.opacity = '1';
        });
    </script>

</body>
</html>
```
