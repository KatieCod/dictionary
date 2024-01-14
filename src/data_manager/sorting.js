import database from "../database/database"

export const getAllOptionsForSorting = (array, key) => {
    database.forEach(word => array.includes(word[key]) ? null : array.push(word[key]))
}