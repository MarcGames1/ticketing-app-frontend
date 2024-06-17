import { FC } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import useTicketsByStatus from "@/hooks/useTicketsByStatus";
import Column from "@/components/Board/Column";
import TicketsComponent from "@/components/Board/TicketsComponent";
import { ITicketByStatus } from "@/declarations/tickets";
import Ticket from "@/entities/ticket";
import {id} from "postcss-selector-parser";

const BoardComponent: FC = () => {
    const [allTickets, setIsDataUpdated] = useTicketsByStatus();

    const handleOnDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const sourceColumnIndex = allTickets.findIndex((col) => col.status === source.droppableId);
        const destColumnIndex = allTickets.findIndex((col) => col.status === destination.droppableId);

        const sourceColumn = allTickets[sourceColumnIndex];
        const destColumn = allTickets[destColumnIndex];


        const movedTicket = sourceColumn.tickets[source.index];
        console.log("Current Ticket:", movedTicket);
        Ticket.UpdateStatus(movedTicket.id, destColumn.status)
        setIsDataUpdated(false)
    };

    return (
        <main className='overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-4 bg-lightGrey dark:bg-veryDarkGrey flex'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {allTickets.map((statusAndTicket, columnIndex) => (
                    <Droppable droppableId={statusAndTicket.status} key={statusAndTicket.status}>
                        {(provided) => (
                            <Column ref={provided.innerRef} data={statusAndTicket} {...provided.droppableProps}>
                                {statusAndTicket.tickets.map((ticket, index) => (
                                    <Draggable key={ticket.id} draggableId={String(Number(ticket.id) +1)} index={index}>
                                        {(provided) => (
                                            <TicketsComponent
                                                index={index}
                                                ref={provided.innerRef}
                                                data={ticket}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Column>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </main>
    );
};

export default BoardComponent;
