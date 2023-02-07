const Console = require('./../../src/actions/Console') 

const sinon = require('sinon')
const { expect } = require('chai')
const { describe, it, beforeEach, afterEach } = require('mocha')

const mocks = {
    validQuestionOptions: require('./../mocks/valid-question-options.json')
}

describe('Console actions Tests', () => {

    let sandbox = {}

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should show a message and receive a text typed by user', async () => {
        sandbox.stub(
            Console,
            Console.read.name
        ).returns('enter')

        const response = await Console.read('Pressione enter para continuar')
        expect(response).to.be.a('string')
    })

    it('should receive params and returns a object to generate a prompt question', async () => {
        const response = await Console.generateSelectQuestion({ message: 'O prato que você gosta é massa?' })
        expect(response).to.deep.equal(mocks.validQuestionOptions)
    })

    it('should receive a options params and show a prompt of questions and return one selected option', async () => {
        sandbox.stub(
            Console,
            Console.question.name
        ).returns({choice: true})

        const response = await Console.question(mocks.validQuestionOptions)
        expect(response).to.deep.equal({ choice: true })
    })

    it('should receive a invalid options params and return an empty object', async () => {
        sandbox.stub(
            Console,
            Console.question.name
        ).returns({})

        const response = await Console.question(mocks.validQuestionOptions)
        console.log(response)
        expect(response).to.deep.equal({})
    })
})