import useTicketsByStatus from "@/hooks/useTicketsByStatus";
import {DragDropContext} from "react-beautiful-dnd";
import Column from "@/components/Board/Column";
import TaskComponent from "@/components/Board/Task";

const BoardComponent = () => {
    const allTickets = useTicketsByStatus()
    const dragTask = (source: any, destination: any) => {
        // dropped outside a column
        if (!destination) {
            return;
        }
    }
        const AllTasks = allTickets.map((statusAndTicket, i) => (
        statusAndTicket.tickets.map((ticket, j) => {                    // TODO Check Condition
            const tasks = statusAndTicket.tickets[i].tasks.map(task => task);
            return tasks.map(t =><TaskComponent data={t} index={j} key={Math.random() * 100}/>)

        })
        ))
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
