import useTicketsByStatus from "@/hooks/useTicketsByStatus";
import {DragDropContext} from "react-beautiful-dnd";
import Column from "@/components/Board/Column";

const Board = () => {
    const allTickets = useTicketsByStatus()
    const dragTask = (source: any, destination: any) => {
        // dropped outside a column
        if (!destination) {
            return;
        }


        function handleOnDragEnd(result: { source: any; destination: any; }) {
        const {source, destination} = result;
        dragTask(source, destination);
    }

    // if(!allTickets.length) return <NoBoardsFound />
    // if(!allTickets.columns.length) return <EmptyBoard />

    return (
        <main className='overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-4 bg-lightGrey dark:bg-veryDarkGrey flex'>
            <DragDropContext
                onDragEnd={handleOnDragEnd}
            >
                {
                    allTickets.map((statusAndTicket, i) => (
                        <Column data={statusAndTicket} key={i}>
                            {
                                statusAndTicket.tickets.map((ticket, j) => {                    // TODO Check Condition
                                    const task = statusAndTicket.tickets[i].tasks.filter(task => task === ticket.id)[0];
                                    return <Task data={task} index={j} key={ticket.id} />
                                })
                            }
                        </Column>
                    ))
                }
            </DragDropContext>
            <NewColumn />
        </main>
    )
}
export default Board
