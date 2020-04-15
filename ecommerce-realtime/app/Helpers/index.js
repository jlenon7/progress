'use script'

const crypto = use('crypto')
const Helpers = use('Helpers')

/**
 * Gerar strings randomicas
 *
 * @param {int} length - O tamanho da string a ser gerada
 * @return {string} - string randomica do tamanho do lenght
 */

const str_random = async (length = 40) => {
  let string = ''
  let len = string.length

  if (len < length) {
    let size = length - len
    let bytes = await crypto.randomBytes(size)
    let buffer = Buffer.from(bytes)
    string += buffer
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substr(0, size)
  }

  return string
}

/**
 * Gerenciar upload de um único arquivo
 *
 * @param {FileJar} file - Arquivo
 * @param {string} path - o caminho para onde o arquivo deve ser movido
 * @return {object<FileJar>}
 */

const manage_single_upload = async (file, path = null) => {
  path = path ? path : Helpers.publicPath('uploads')
  // Gera nome aleatório
  const random_name = await str_random(10)
  let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

  // Renomear arquivo e mover ele para o path
  await file.move(path, {
    name: filename,
  })

  return file
}

module.exports = {
  str_random,
  manage_single_upload,
}
