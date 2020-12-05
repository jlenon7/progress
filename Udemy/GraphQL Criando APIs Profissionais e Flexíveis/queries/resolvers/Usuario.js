const { perfis } = require('../database/mock')

module.exports = {
  salario(usuario) {
    return usuario.salario_real
  },
  perfil(usuario) {
      return perfis.find(p => p.id === usuario.perfil_id)
  }
}
