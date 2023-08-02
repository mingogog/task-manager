import { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import './DropdownMenu.css'
import categories from "../categories";

interface DropdownMenu{
    categoryType: string
    setFilterType(data:string): any
}
const DropdownMenu: React.FC<DropdownMenu> = ({categoryType, setFilterType }:DropdownMenu) => {
    const [showingMenu, setShowingMenu] = useState(false)
    const handleOnClick = () => {
        setShowingMenu(prev=>!prev)
    }
    // const [filteredType, setFilterType] = useState('All')
    const categoryList = ['All', ...categories]
    return (
        <div className="ml-auto">
            <div className="cursor-pointe" onClick={handleOnClick}>
                {
                    categoryType==='All'
                    ?<FaChevronCircleDown className="hover:text-blue-600" />
                    :<button className="border border-blue-500 text-blue-500 px-2 rounded-full hover:bg-blue-500 hover:text-white">{categoryType}</button>
                }
                {
                    showingMenu&&
                    <div className="dropdown">
                        <ul>
                            {categoryList.map(c=>{
                                return (
                                    <li 
                                        onClick={()=>{
                                            setFilterType(c)
                                        }}
                                        className={c===categoryType?'bg-blue-500 text-white':''}
                                    >
                                        {c}
                                    </li>
                                )
                                }
                            )}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}
 
export default DropdownMenu;