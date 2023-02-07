const prompts = require('prompts')
prompts.override(require('yargs').argv)

const readline = require('readline-promise')


class Console {
    static async read(message) {
        const rlp = readline.default.createInterface({ input: process.stdin, output: process.stdout, terminal: false })
        return await rlp.questionAsync(`${message}\n`)
    }

    static async question(options = []) {
        try {
            return await prompts(options)
        } catch (error) {
            console.log(error)
        }
    }

    static generateSelectQuestion({
        type = 'select',
        name = 'choice',
        message = '',
        choices = [{ title: 'Sim', value: true },
        { title: 'Não', value: false }]
    }) {
        return [{
            type,
            name,
            message,
            choices
        }]
    }
}

module.exports = Console