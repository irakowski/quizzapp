export type Answer = {
    id: number;
    text: string;
    is_correct: boolean
}


export type Question  = {
    id: number;
    text: string;
    answers: Answer[]
}


export const fetchQuestions = async (category: string) => {

    const endpoint=`http://127.0.0.1:8000/category/${category}/`;
    const data = await (await fetch(endpoint)).json()

    return data
}