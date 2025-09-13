/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Professional Business Color Palette
                business: {
                    50: '#f8fafc',   // Very light gray-blue
                    100: '#f1f5f9',  // Light gray-blue
                    200: '#e2e8f0',  // Lighter gray
                    300: '#cbd5e1',  // Light gray
                    400: '#94a3b8',  // Medium gray
                    500: '#64748b',  // Base gray
                    600: '#475569',  // Dark gray
                    700: '#334155',  // Darker gray
                    800: '#1e293b',  // Very dark gray
                    900: '#0f172a',  // Almost black
                },
                corporate: {
                    50: '#eff6ff',   // Very light blue
                    100: '#dbeafe',  // Light blue
                    200: '#bfdbfe',  // Lighter blue
                    300: '#93c5fd',  // Light blue
                    400: '#60a5fa',  // Medium blue
                    500: '#3b82f6',  // Base blue (professional)
                    600: '#2563eb',  // Dark blue
                    700: '#1d4ed8',  // Darker blue
                    800: '#1e40af',  // Very dark blue
                    900: '#1e3a8a',  // Navy blue
                },
                success: {
                    50: '#f0fdf4',   // Very light green
                    100: '#dcfce7',  // Light green
                    200: '#bbf7d0',  // Lighter green
                    300: '#86efac',  // Light green
                    400: '#4ade80',  // Medium green
                    500: '#22c55e',  // Base green
                    600: '#16a34a',  // Dark green
                    700: '#15803d',  // Darker green
                    800: '#166534',  // Very dark green
                    900: '#14532d',  // Deep green
                },
                // shadcn/ui compatibility
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
