import {FC, useEffect} from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Column from "@/components/Board/Column";
import TicketsComponent from "@/components/Board/TicketsComponent";
import { ITicketByStatus } from "@/declarations/tickets";
import Ticket from "@/entities/ticket";
import {id} from "postcss-selector-parser";
import {toast} from "@/components/ui/use-toast";
import {ApiClientError} from "@/lib/ApiClient";
import DetailsComponent from "@/components/Board/DetailsComponent";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {useTickets} from "@/context/TicketsContext";
const BoardComponent: FC = () => {
    const {allTickets, setIsDataUpdated, setAllTickets} = useTickets();

    useEffect(() => {
    setIsDataUpdated(false)
    }, []);
    const handleOnDragEnd = async (result: DropResult) => {
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

       try {
           const prevState= [...allTickets];
           allTickets[sourceColumnIndex].tickets
               .splice(allTickets[sourceColumnIndex].tickets
                   .findIndex(t =>t.id === movedTicket.id), 1)

           allTickets[destColumnIndex].tickets.push(movedTicket) // add moved ticket to destination column
           setAllTickets(allTickets) // update local state
        // updateStatus API /changeStatus

          const res = await Ticket.UpdateStatus(movedTicket.id, destColumn.status)
           if(res instanceof ApiClientError){
               toast({title:"Error in Server", variant: "destructive", description:"Operation not permited"})
               setIsDataUpdated(false)
           }
           else  toast({title:"Success!", description:"Status Updated"})


       } catch (e) {

           toast({title:"Server Error", description:String(JSON.stringify(e))})
           setIsDataUpdated(false)
       }

    };

    return (
        <main className='overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-4 bg-lightGrey dark:bg-veryDarkGrey flex'>
            <ResizablePanelGroup direction="horizontal">


                <ResizablePanel>
                    <ResizablePanelGroup direction={'horizontal'}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {allTickets.map((statusAndTicket, columnIndex) => (
                    <ResizablePanel key={statusAndTicket.status}>
                        <Droppable droppableId={statusAndTicket.status} >
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
                    </ResizablePanel>
                ))}
            </DragDropContext>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </main>
    );
};

export default BoardComponent;
