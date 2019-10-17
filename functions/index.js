const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

exports.sum = functions.database.ref('/movimentacoes/{day}')
    .onWrite(async(change, context) => {
        const monthRef = admin.database().ref('/meses/'+context.params.day)
        const movsRef = change.after.ref
        const movsSS = await movsRef.once('value')
        const movs = movsSS.val()

        let entrada = 0
        let saida = 0

        Object.keys(movs).forEach( m => {
            if(movs[m].valor > 0) {
                entrada += movs[m].valor
            } else {
                saida += movs[m].valor
            }
        })

        return monthRef.transaction(current => {
            if (current === null){
                return {
                    entrada,
                    saida,
                    previsao_entrada: 0,
                    previsao_saida:0
                }
            }
            return {
                ...current,
                entrada,
                saida
            }
        })


    })
