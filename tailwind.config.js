/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      margin:{
       'left-100':'46rem'
      },
      width: {
        'custom-width': '43%',
        'width': '59vw',
        'inputWidth': '58vw',
        'InputWidth': '64vw',
        'progress':'17rem',
        'f-width': '28%',
        'o-width':'60%',
        't-width':'50%',
        'l-width': '120vw',
        'm-width': '140vw',
        'P-width': '60%',
        'w-34r':'30rem',
        'c-width': '95%',
        'd-width':' 58vw',
        'm-width':'33vw',
        'w-m':'35vw',
        'w-e':'32vw',
        'w-w-width':'30vw',
        'l-InputWidth':'43vw',
        'md-InputWidth':'22vw',
        'md-w-inputWidth':'20vw',
        'md-width':'11vw',
        'md-r-width':'16vw',
        'md-R-width':'18vw',
        's-w-width': '47vw',
        'w-w-34r ': '22.5rem'
        
      },
      height:{
        'height': '50%',
        'h':'94.2%'
        
      }
    },
  },
  plugins: [],
}
