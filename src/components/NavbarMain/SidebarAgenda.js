import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from 'react-bootstrap'
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader'
import AccordionBody from 'react-bootstrap/esm/AccordionBody'
import { Link } from 'react-router-dom'
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'

import './SidebarAgenda.css'
const agendaContent = [
    {
        title: 'My Movies',
        path: '/Agenda/Movies',
        icon: <BiIcons.BiFilm />,
        cName: 'nav-text'
    },
    {
        title: 'My TV',
        path: '/Agenda/TV',
        icon: <BiIcons.BiTv />,
        cName: 'nav-text'
    },
    {
        title: 'My Games',
        path: '/Agenda/Games',
        icon: <BsIcons.BsController />,
        cName: 'nav-text'
    },
    {
        title: 'My Books',
        path: '/Agenda/Books',
        icon: <BiIcons.BiBook />,
        cName: 'nav-text'
    },
]


export default function SidebarAgenda () {

    return (
        <div className='accordion'>
            <Accordion>
                <AccordionHeader>
                        <Link to='/' className='nav-text'><BiIcons.BiBookContent /> Agenda</Link>
                </AccordionHeader>
                {agendaContent.map((item, idx) => {
                            return (
                                <AccordionBody key={idx} >
                                        <Link to={item.path} className={item.cName}>
                                            {item.icon}<span> {item.title}</span>
                                        </Link>
                                </AccordionBody>
                            )
                        })}
            </Accordion>
        </div>            
    )
}