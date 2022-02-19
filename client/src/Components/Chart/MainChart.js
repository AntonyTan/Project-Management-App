import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";



function MainChart({ projectList }) {
    const [trackHeight, setTrackHeight] = useState(30);
    const options = {
        height: trackHeight * (projectList.length + 1) + 10,
        gantt: {
            trackHeight: trackHeight
        },
    };
    const columns = [
        { type: "string", label: "Task ID" }, //
        { type: "string", label: "Task Name" }, //
        //{ type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" }, //
        { type: "number", label: "Duration" }, //
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }, //
    ];


    const [processedList, setProcessedList] = useState([]);
    //2d Array
    const processProjectList = () => {
        let returnList = []
        projectList.forEach((project) => {
            let splitStartDate = project.project_create_date.split("-")
            let startDate = new Date(splitStartDate[0], splitStartDate[1] - 1, splitStartDate[2])
            let splitEndDate = project.project_deadline.split("-")
            let endDate = new Date(splitEndDate[0], splitEndDate[1] - 1, splitEndDate[2]);

            let percentage = 0;
            if (project.project_tickets) { //Bug, somehow project_tickets is null when starting up
                let projectLength = project.project_tickets.length;
                if (projectLength) {
                    let completeCount = 0;
                    project.project_tickets.forEach((ticket) => {
                        if (ticket.ticket_is_complete) {
                            completeCount += 1;
                        }
                    })
                    percentage = completeCount / projectLength * 100;
                }
            }

            let processedProject = [
                project.project_id,
                project.project_name,
                //'spring',
                startDate,
                endDate,
                null, //duration
                percentage, //percent complete
                null
            ]
            returnList.push(processedProject)
        })
        console.log(returnList);
        setProcessedList([...returnList])
    }
    useEffect(() => {
        processProjectList()
    }, [projectList]);
    useEffect(() => {

    })

    const showChart = () => {
        return (
            <div id="gannt-chart">
                <Chart
                    chartType="Gantt"
                    width="99%"
                    height="100%"
                    data={[columns, ...processedList]}
                    options={options}
                    legendToggle
                />
            </div>
        )
    }

    return (
        <div className='chart-display'>
            {showChart()}
        </div>

    )
}

export default MainChart