/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        principal: '#0B8185',
        trocaBotao: '#36544F',
        trocabotao2: '#403831',
        input: '#F0EDED',
        letra: '#403831',
        borda: '#1F5F61',
        'aqua-dark': '#00796b',  
        'click': '#117073',      
      },
      fontFamily: {
        fontDestaque: ['Michroma', 'sans-serif'],
        font: ['Kanit', 'sans-serif']
      },
      listStyleImage:{
        checkmark: 'url("/img/bg.png")',

    },
    },
  },
  plugins: [],
}
