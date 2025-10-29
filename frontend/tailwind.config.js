/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Prescripto exact color palette
        'primary': '#0F172A', // Prescripto's dark blue
        'accent': '#3B82F6', // Prescripto's blue
        'accent-hover': '#2563EB', // Darker blue for hover
        'accent-light': '#60A5FA', // Light blue
        'success': '#10B981', // Green
        'warning': '#F59E0B', // Amber
        'error': '#EF4444', // Red
        'dark-text': '#1E293B', // Slate 800
        'text-muted': '#64748B', // Slate 500
        'soft-bg': '#F8FAFC', // Slate 50
        'card-bg': '#FFFFFF', // White
        'border-light': '#E2E8F0', // Slate 200
        'border-medium': '#CBD5E1', // Slate 300
        'shadow': 'rgba(0,0,0,0.08)', // Prescripto-style shadow
        'diary-bg': '#F0F9FF', // Blue 50
        'diary-border': '#BFDBFE', // Blue 200
        // Legacy colors for compatibility
        darkviolet: '#4a0e8d',
        yellow: '#f1c40f',
        lightcoral: '#f08080',
        orange: '#f57c00',
        blue: '#3498db',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'], // Prescripto-style serif
        'sans': ['Inter', 'system-ui', 'sans-serif'], // Prescripto-style sans
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        'gutter': '32px', // Prescripto gutters
        'section': '64px', // Prescripto section margins
        'card-padding': '24px', // Prescripto card padding
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'fab': '0 6px 16px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        'card': '12px', // Prescripto card radius
        'button': '8px', // Prescripto button radius
      },
      maxWidth: {
        'container': '1200px', // Prescripto container width
      },
    },
  },
  plugins: [],
}


