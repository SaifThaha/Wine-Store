import React from 'react'

// const StartupCard = ({post}: {post:StartupTypeCard}) => {
//   return (
//     <li className="startup-card group">

//     <div className="flex-between">
//       <p className='startup-card_date'>
//         {post.idDrink}
//       </p>

//     </div>

//     <div className="flex-between mt-5 gap-5">
//       <div className="flex-1">
//         <p className="text-16-medium line-clamp-1">{post.strDrink}</p>
//       </div>

//     </div>

//     <img src={post.strDrinkThumb} alt="placeholder" className="startup-card_img"/>

//     <button className="add-button">Add</button>

//     </li>
//   )
// }

type StartupCardProps = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  onAdd: (idDrink: string) => void; // Accept the addToFavorites function as a prop
};

const StartupCard: React.FC<StartupCardProps> = ({ idDrink, strDrink, strDrinkThumb, onAdd }) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className='startup-card_date'>
          {idDrink}
        </p>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <p className="text-16-medium line-clamp-1">{strDrink}</p>
        </div>
      </div>

      <img src={strDrinkThumb} alt="placeholder" className="startup-card_img"/>

      <button onClick={()=> onAdd(idDrink)} className="add-button">Add</button>

    </li>
  )
}

export default StartupCard
