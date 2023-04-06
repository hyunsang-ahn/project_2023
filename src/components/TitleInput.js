import React from 'react'

// const TitleInput = ({
//     register,
// }) => {
//     return (
//         <input type='hidden' name={"title"} ref={register()} />

//     )
// }



const TitleInput = ({ register }) => {

    return (

        <>


            <input {...register("title")} type={'text'} />

        </>
    )
}


export default TitleInput
