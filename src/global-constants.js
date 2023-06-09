
export const ROLE_TYPES={
    admin:"admin",
    user:"user",
    guest:"guest"
}
export const GENRES=[
    "פרוזה מקור","מתח ופעולה","רומן רומנטי",
    "רומן אירוטי","מדריכים ועצות","היסטוריה ופוליטיקה","עיון"
]
export const GUEST_NAME="אורח"
export const SORT_OPTIONS=[
    "שם הספר א-ת","שם הספר ת-א",
    "סופר א-ת","סופר ת-א",
    "ז'אנר א-ת","ז'אנר ת-א"
]
// export const GENERIC_MODAL_FUNC_TYPES={
//     deleteUser:"delete-user",
//     updateBook:"update-book",
//     createDiscount:"create-discount"
// }
export const ADMIN_PASSWORD_REGEX=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/