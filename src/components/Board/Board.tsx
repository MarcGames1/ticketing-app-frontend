import useTicketsByStatus from "@/hooks/useTicketsByStatus";
import {DragDropContext} from "react-beautiful-dnd";
import Column from "@/components/Board/Column";
import TaskComponent from "@/components/Board/Task";
import {useState} from "react";
import {ITicketByStatus} from "@/declarations/tickets";

const BoardComponent = () => {

    const [allTickets, setIsDataUpdated] = useTicketsByStatus()
    const dragTask = (source: any, destination: any) => {
        // dropped outside a column
        if (!destination) {
            return;
        }
    }

        function handleOnDragEnd(result: { source: any; destination: any; }) {
            const {source, destination} = result;
            dragTask(source, destination);
        }

        // if(!allTickets.length) return <NoBoardsFound />
        // if(!allTickets.columns.length) return <EmptyBoard />

        return (
            <main
                className='overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-4 bg-lightGrey dark:bg-veryDarkGrey flex'>
                <DragDropContext
                    onDragEnd={handleOnDragEnd}
                >
                    {
                        allTickets.map((statusAndTicket, i) => (
                            <Column data={statusAndTicket} key={i}>
                               <>
                               {statusAndTicket.tickets.map((t, i) =>   <TaskComponent key={i * Math.random() * 100} data={t} index={i * Math.random() * 100} />)}

                               </>
                            </Column>
                        ))
                    }
                </DragDropContext>
                {/*<NewColumn />*/}
            </main>
        )
}
export default BoardComponent
