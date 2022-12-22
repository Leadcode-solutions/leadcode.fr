import './unpoly'
import Alpine from 'alpinejs'
import '../css/app.css'

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
Alpine.start()
