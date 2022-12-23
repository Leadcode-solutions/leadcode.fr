import './unpoly'
import Alpine from 'alpinejs'
import '../css/app.css'
import teleport from 'alpine-teleport'
import intersect from '@alpinejs/intersect'
import collapse from '@alpinejs/collapse'

Alpine.data('navbar', () => ({
  profil: false,
  toggle() {
    if (this.profil) {
      return this.close()
    }
    this.$refs.button.focus()
    this.profil = true
  },
  close(focusAfter) {
    if (! this.profil) return
    this.profil = false
    focusAfter && focusAfter.focus()
  }
}))

Alpine.data('reveal', () => ({
  reveal: (element) => {
    console.log("test")
    element.classList.add('revealed')
  },
}))

Alpine.plugin(teleport)
Alpine.plugin(intersect)
Alpine.plugin(collapse)
Alpine.start()
