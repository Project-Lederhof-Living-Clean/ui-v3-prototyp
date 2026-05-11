# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Or in CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

## Font Usage

- **Headings:** DM Sans (600–700 weight)
- **Body text:** DM Sans (400–500 weight)
- **Code / numeric tabular / technical:** IBM Plex Mono

## Tailwind Application

Set DM Sans as the default font on the root and use `font-mono` (mapped to IBM Plex Mono) for tabular numbers and code:

```html
<body class="font-[DM_Sans,sans-serif]">
  <!-- Body content uses DM Sans by default -->
  <pre class="font-[IBM_Plex_Mono,monospace]">…</pre>
</body>
```
