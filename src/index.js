'use strict';

const Console = require('./actions/Console')

const dishes = {
    pasta: [
        { name: 'Lasanha', adjective: '' },
    ],
    others: [
        { name: 'Bolo de Chocolate', adjective: '' }
    ]
}

    ; (async () => {
        console.log('Jogo Gourmet!')

        let correctResponse = false

        while (!correctResponse) {
            let count = 0
            console.log('Pense um prato que gosta. ')
            await Console.read('Pressione enter para continuar')

            console.clear()

            const mainRsponse = await Console.question(Console.generateSelectQuestion({ message: `O prato que você pensou é Massa?\nDigite aqui:` }))
            console.clear()

            const data = mainRsponse.choice ? 'pasta' : 'others'

            const itemsDishes = dishes[data]

            for (let dish of itemsDishes.reverse()) {
                count++
                if (correctResponse) break

                const response = await Console.question(Console.generateSelectQuestion({ message: `O prato que você pensou é ${dish.adjective || dish.name}?` }))
                console.clear()

                if (!dish.adjective && response.choice) { // se ele colocou sim e a primeira opção, dá como certo e dá um break na execução
                    correctResponse = true
                    break
                }

                //se não tem nenhum item além dos originais, ele faz a pergunta e dá um break
                if (dishes[data].length === 1) {
                    const dishResponse = await Console.read('Em qual prato você pensou?\nDigite aqui:')
                    const adjectiveResponse = await Console.read(`${dishResponse} é ________ mas ${dish.name} não.\nDigite aqui:`)
                    dishes[data].push({ name: dishResponse, adjective: adjectiveResponse })
                    console.clear()
                    break
                }

                if (response.choice) { //só vai chegar na segunda rodada
                    const filteredDoshes = itemsDishes.filter(e => e.adjective === dish.adjective)

                    for (const item of filteredDoshes) { //verifica os que tem adjetivos iguais
                        const filterdResponse = await Console.question(Console.generateSelectQuestion({ message: `O prato que você pensou é ${item.name}?` }))
                        console.clear()
                        if (filterdResponse.choice) {
                            correctResponse = true
                            break
                        }
                    }
                }

                if (!response.choice && count === itemsDishes.length) {
                    const dishResponse = await Console.read('Em qual prato você pensou?')
                    const adjectiveResponse = await Console.read(`${dishResponse} é ________ mas ${dish.name} não.`)
                    dishes[data].push({ name: dishResponse, adjective: adjectiveResponse })
                    console.clear()
                    break
                }
            }

            if (correctResponse) {
                correctResponse = false
                console.clear
                console.log('Acertei de novo!')
                await Console.read('Pressione enter para continuar')
                console.clear()
            }
        }
    })()