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
        transparencia: "#fff2"
      },
      fontFamily: {
        fontDestaque: ['Michroma', 'sans-serif'],
        font: ['Kanit', 'sans-serif']
      },
      backgroundImage: {
        fundo: "url('../img/fundo.svg')"   
      }
    },
  },
  plugins: [],
}
