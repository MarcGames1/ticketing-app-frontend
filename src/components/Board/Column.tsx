import { Droppable } from "react-beautiful-dnd";
import {forwardRef, useEffect, useState} from 'react';
import {ITicketByStatus} from "@/declarations/tickets";

interface ColumnProps {
    data:ITicketByStatus,
    children:React.ReactNode
}
// eslint-disable-next-line react/display-name
const Column = forwardRef<HTMLDivElement, ColumnProps>(({data, children, ...props}, ref ) => {
    const [winReady, setWinReady] = useState(false);
    useEffect(() => {
        setWinReady(true);
    }, [])

    return (
        <div ref={ref} {...props} className="column w-[280px] shrink-0">
            <h3 className="heading-sm uppercase mb-6">
                <span className="task-status inline-block h-3 w-3 rounded-full mr-3"></span>
                {data.status} ({data.tickets.length})
            </h3>
            {
                winReady ? (
                    <Droppable droppableId={String(data.status)}>
                        {(provided) => (
                            <ul className="scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-full pb-12 flex flex-col gap-5" {...provided.droppableProps}
                                ref={provided.innerRef}>
                                {children}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                ) : (null)}
        </div>
    )
})
export default Column