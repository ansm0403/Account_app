export interface Card {
    name: string
    corpName: string
    tags: string[],
    benefit: string[],
    promotion? : {
        title : string
        terms : string
    },
    payback? : string
}

export interface UserCard {
    cardName : string,
    cardNumber : string,
    email : string,
    validThru : string,
    name : string,
    phone : string,
    status : "READY" | "DONE",
    userId : string,
    cardId : string
}