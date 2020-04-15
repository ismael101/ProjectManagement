module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "devServer": {
    "proxy": `http://localhost:${process.env.PORT}`
  },
}