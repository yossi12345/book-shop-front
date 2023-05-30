import axios from "axios"
import { SORT_OPTIONS } from "../../global-constants"

export function changeSortFieldsInState({state,setState,selectedValue}){
    const newState={...state}
    function changeNewState(sort,asending){
        newState.sort=sort
        newState.asending=asending
    }
    switch(selectedValue){
        case SORT_OPTIONS[0]:
            changeNewState("name",true)
            break
        case SORT_OPTIONS[1]:
            changeNewState("name",false)
            break
        case SORT_OPTIONS[2]:
            changeNewState("author",true)
            break
        case SORT_OPTIONS[3]:
            changeNewState("author",false)
            break
        case SORT_OPTIONS[4]:
            changeNewState("genre",true)
            break
        case SORT_OPTIONS[5]:
            changeNewState("genre",false)
            break
    }
    setState(newState)
}

export async function handleShowBooks(params){
    const url=getUrl(params.state,params.isAdmin)
    console.log("fgfg",url,params.state)
    const headers={
        'Content-Type': 'application/json',
    } 
    if (params.isAdmin)
        headers['Authorization']="Bearer "+sessionStorage.getItem("token")
    try{
        const {data}=await axios.get(url,{headers})
        console.log("lklklklk",data)
        if (!params.isPossibleBooks){
            params.setIsThereMoreBooks(data.isThereMoreBooks)
            params.setBooksToShow(data.books)
        }
        else{
            const result=[]
            data.books.forEach((book)=>{
                result.push(book.name)
            })
            params.setBooksToShow(result)
        }
    }catch(err){
        params.setBooksToShow([])
        console.log(err)
        if (params.isPossibleBooks)
            return
        params.setIsThereMoreBooks(false)
        if (err?.response?.status===500)
            params.setFailFindBooksMessage("אנחנו מצטערים אין לנו קשר עם השרת כרגע ולכן אין לנו ספרים להציע")
        else if (err?.response?.status===404)
            params.setFailFindBooksMessage("אנחנו מצטערים אבל אין לנו ספרים שתואמים את החיפוש שלך")
    }
}
function getUrl(state,isAdmin){
//if you admin you need to get also the unavailble books therefore the url is /admin-search
//and for normal user it only /search
    let url=process.env.REACT_APP_BASIC_URL+(isAdmin?"admin-":"")
    url+="search?page="+state.page
    for (const param in state){
        const isParamNotNeeded=(param==="page")||
                        (param==="search"&&state[param]==="")||
                        (param==="genre"&&state[param]==="כל הז'אנרים")
        if (!isParamNotNeeded)
            url+="&"+param+"="+state[param]
    }
    return url
} 
